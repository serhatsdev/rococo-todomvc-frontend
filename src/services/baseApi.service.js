import axios from "config/axios"
import { Notify } from "quasar"

export default class BaseApiService {
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
