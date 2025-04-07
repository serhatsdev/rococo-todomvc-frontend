import { defineStore, acceptHMRUpdate } from 'pinia'
import localStorageService from 'services/localStorage.service';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorageService.getItem('user') || null, // Initialize from localStorage
    accessToken: localStorageService.getItem('accessToken') || null, // Initialize from localStorage
    accessTokenExpiry: localStorageService.getItem('accessTokenExpiry') || null, // Initialize from localStorage
  }),

  getters: {
    // Computed property for isAuthenticated
    isAuthenticated: (state) => {
      if (!state.accessToken || !state.accessTokenExpiry) {
        return false; // No token or expiry date
      }

      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds (UNIX timestamp)
      return currentTime < state.accessTokenExpiry; // Check if token is still valid
    },
  },

  actions: {
    setUser(user) {
      this.user = user;
      localStorageService.setItem('user', user);
    },
    setAccessToken(token, tokenExpiry) {
      this.accessToken = token;
      this.accessTokenExpiry = tokenExpiry;
      localStorageService.setItem('accessToken', token);
      localStorageService.setItem('accessTokenExpiry', tokenExpiry);
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
