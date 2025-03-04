import { defineStore } from "pinia";

interface AuthStateProps {
  username: string;
  password: string;
}

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }: AuthStateProps) {
      // useFetch from nuxt 3
      try {
        const { data, pending, error }: any = await useFetch(
          "https://dummyjson.com/auth/login",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: {
              username: username,
              password,
            },
          }
        );
        this.loading = pending;

        if (error.value) {
          throw error.value;
        }

        if (data.value) {
          const token = useCookie("token");
          token.value = data?.value?.accessToken;
          this.authenticated = true;
        } else {
          throw new Error("Failed to authenticate");
        }
        return { data, pending };
      } catch (error) {
        throw error;
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
