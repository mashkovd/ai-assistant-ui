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
      <input v-model="prompt" id="prompt-input" name="prompt" class="form-control"/>
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
        const response = await axios.post("/chat", { prompt: this.prompt });

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
        const response = await axios.post("/order", data);
        console.log("Order response:", response.data);
        this.errorMessage = null;
      } catch (error) {
        console.error("Error placing order:", error);
        this.errorMessage = "Failed to place the order. Try again.";
      }
    },
    async logout() {
      try {
        await axios.post("/logout");
        window.location.href = "/login"; // Redirect after logout
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Failed to log out. Please try again.");
      }
    },
    async checkAuthStatus() {
      try {
        const response = await axios.get("/auth/status");
        if (!response.data.authenticated) {
          window.location.href = "/login"; // Redirect if not authenticated
        }
      } catch (error) {
        console.error("Failed to check authentication status:", error);
        window.location.href = "/login"; // Redirect on error
      }
    },
  },
  mounted() {
    this.checkAuthStatus(); // Ensure the user is authenticated
  },
};
</script>