<template>
  <main class="border rounded mx-auto my-5 p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Chat with AI Assistant</h1>
    </div>
    <p>Type command for buying stocks</p>
    <div id="conversation" class="px-2"></div>
    <div class="d-flex justify-content-center mb-3">
      <div :class="spinnerClass"></div>
    </div>
    <form @submit.prevent="sendPrompt">
      <input v-model="prompt" id="prompt-input" name="prompt" class="form-control" />
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mt-2">Send</button>
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" @click="placeOrder" class="btn btn-primary mt-2">Order</button>
      </div>
    </form>
    <div v-if="errorMessage" class="text-danger">
      {{ errorMessage }}
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      prompt: "",
      spinnerActive: false,
      errorMessage: null,
    };
  },
  computed: {
    spinnerClass() {
      return {
        "opacity-0": !this.spinnerActive,
        "opacity-1 active": this.spinnerActive,
        "transition-opacity": true,
        "rounded-circle": true,
        "border": true,
        "border-bottom-color-transparent": true,
        "width-30": true,
        "height-30": true,
      };
    },
  },
  methods: {
    async sendPrompt() {
      this.spinnerActive = true;
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.post(
          "/chat",
          { prompt: this.prompt },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Prompt response:", response.data);
        this.errorMessage = null;
      } catch (error) {
        console.error("Error sending prompt:", error);
        this.errorMessage = "Failed to send the prompt. Try again.";
      } finally {
        this.spinnerActive = false;
      }
    },
    async placeOrder() {
      const data = {
        symbol: "BOO", // Replace with actual symbol data
        quantity: 10,   // Replace with actual quantity data
      };
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.post(
          "/order",
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Order response:", response.data);
        this.errorMessage = null;
      } catch (error) {
        console.error("Error placing order:", error);
        this.errorMessage = "Failed to place the order. Try again.";
      }
    },
    logout() {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    },
    async checkAuthStatus() {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        window.location.href = "/login";
      }
    },
    extractTokenFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        localStorage.setItem("auth_token", token);
      }
    },
  },
  mounted() {
    this.extractTokenFromUrl();
    this.checkAuthStatus();
  },
};
</script>