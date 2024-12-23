import baseApi from '@/shared/api';

export function useAuth() {
  async function loginWithGoogle() {
    try {
      const response = await baseApi.get("/auth/google");

      if (response.data.redirect_url) {
        window.location.href = response.data.redirect_url;
      } else {
        console.error("Login failed: No redirect URL provided");
      }
    } catch (error) {
      console.error("Failed to initiate Google login:", error);
    }
  }

  async function handleGoogleCallback() {
    try {
      const response = await baseApi.get("https://ai-assistant.mctl.ru/auth/google/callback");
      const { token, redirect_url } = response.data;

      // Store the token
      localStorage.setItem("auth_token", token);

      // Redirect to the chat page
      window.location.href = redirect_url;
    } catch (error) {
      console.error("Failed to handle Google callback:", error);
    }
  }

  return {
    loginWithGoogle,
    handleGoogleCallback,
  };
}
