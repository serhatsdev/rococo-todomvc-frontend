import axios from "config/axios"
import { Notify } from "quasar"
import { useAuthStore } from "src/stores/auth";

export const authService = {
  async signup(payload) {
    return this.sendRequest('post', '/auth/signup', payload);
  },
  async login(payload) {
    const responseData = await this.sendRequest('post', '/auth/login', payload);
    console
    if (responseData?.success) {
      const authStore = useAuthStore()
      const { person, access_token, expiry } = responseData;
      authStore.setUser(person);
      authStore.setAccessToken(access_token, expiry);
      authStore.router.push('/dashboard')
    }
  },
  async logout() {
    const authStore = useAuthStore()
    authStore.setUser(null)
    authStore.setAccessToken(null, null)
    authStore.router.push('/login')
  },
  async resetPassword(payload) {
    return await this.sendRequest('post', '/auth/forgot_password', payload)
  },
  async setPassword(token, uidb64, payload) {
    const authStore = useAuthStore()
    const url = `/auth/reset_password/${token}/${uidb64}`
    const responseData = await this.sendRequest('post', url, payload);
    if (responseData?.success) {
      authStore.router.push('/login')
    }
  },
  async getUserProfile() {
    return await this.sendRequest('get', '/person/me')
  },
  async updateUserProfile(payload) {
    const responseData = await this.sendRequest('patch', '/person/me', payload);
    if (responseData?.success) {
      const authStore = useAuthStore()
      const { person } = responseData;
      authStore.setUser(person);
    }
  },
  async sendRequest(method, url, payload) {
    const response = await axios[method](url, payload)
      .catch((error) => {
        console.error("Error in API request:", error);
        Notify.create({
          message: "An unknown error occurred",
          color: "negative"
        });
      });

      if (response.data?.message) {
        Notify.create({
          message: response.data?.message,
          color: response.data?.success ? "positive" : "negative"
        });
      }

      return response.data
  }
}

export default authService
