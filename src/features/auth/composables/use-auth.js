import { ref } from 'vue';
import { jwtDecode } from "jwt-decode";

import baseApi from '@/shared/api';

export function useAuth() {  
  const isAuthorized = ref(false);
  const userEmail = ref('');

  function decodeToken(token) {
    let decoded = null;

    if (!token) {
      return null;
    }

    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.warn('Invalid token');
    }

    return decoded;
  }

  function updateState() {
    const authToken = localStorage.getItem('auth_token');
    const authTokenDecoded = decodeToken(authToken);

    isAuthorized.value = Boolean(authToken);
    userEmail.value = authTokenDecoded?.sub;
  }

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

  function logOut() {
    localStorage.removeItem('auth_token');
    window.location.reload();
  }

  updateState();

  return {
    isAuthorized,
    userEmail,
    loginWithGoogle,
    logOut,
    updateState,
  };
}
