<script setup lang="ts">
const router = useRouter();
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
import { toast } from "vue3-toastify";
const username = ref<string>("");
const password = ref<string>("");
const isLoading = ref<boolean>(false);

const handleLogin = async () => {
  try {
    isLoading.value = true;
    if (!username.value || !password.value) {
      return toast.error("Please enter username and password");
    }
    const res = await authenticateUser({
      username: username.value,
      password: password.value,
    });

    if (res.data.value) {
      router.push("/");
      toast.success("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    toast.error("Invalid Login Credentials");
  } finally {
    isLoading.value = false;
  }

  if (authenticated) {
    router.push("/");
  }
};
</script>

<template>
  <div
    class="md:h-[calc(100vh-140px)] max-w-screen-md flex md:flex-row flex-col gap-8 md:items-center md:justify-center w-full"
  >
    <div class="flex-1">
      <img src="/public/hero-pic.png" alt="Hero_Pic" class="w-full h-full" />
      <div class="max-w-sm mx-auto mt-10 bg-gray-100 rounded-lg shadow-md p-8">
        <h2 class="text-lg font-bold mb-4">Credentials</h2>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Username:</span>
            <span class="text-gray-900 font-medium">emilys</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Password:</span>
            <span class="text-gray-900 font-medium">emilyspass</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 w-full h-full">
      <div
        class="flex flex-col gap-8 h-full items-center justify-center w-full"
      >
        <div class="">
          <h1 class="text-3xl text-black">Welcome to</h1>
          <h1 class="text-4xl text-[#6358DC] font-semibold">Design School</h1>
        </div>
        <form class="flex flex-col gap-4 w-full">
          <TextInput
            id="username"
            name="username"
            type="string"
            label="Username"
            :modelValue="username"
            @update:modelValue="(value) => (username = value)"
            placeholder="your@example.com"
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            label="Password"
            :modelValue="password"
            @update:modelValue="(value) => (password = value)"
            placeholder="Your password"
          />
        </form>
        <Button
          @click="() => handleLogin()"
          :disabled="isLoading"
          class="bg-[#6358DC] text-white p-5 w-full"
          >Login</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
