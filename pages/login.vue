<script setup lang="ts">
const router = useRouter();
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const username = ref<string>("");
const password = ref<string>("");

const handleLogin = async () => {
  await authenticateUser({
    username: username.value,
    password: password.value,
  });

  if (authenticated) {
    router.push("/");
  }
};
</script>

<template>
  <div
    class="h-[calc(100vh-140px)] max-w-screen-md flex items-center justify-center"
  >
    <div class="flex-1">
      <img src="/public/hero-pic.png" alt="Hero_Pic" class="w-full" />
    </div>
    <div class="flex-1 w-full h-full flex  justify-center">
      <div class="flex flex-col gap-4 h-full ">
        <div class="">
          <h1 class="text-3xl text-black">Welcome to</h1>
          <h1 class="text-4xl text-[#6358DC] font-semibold">Design School</h1>
        </div>
        <form class="flex flex-col gap-4">
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
        <Button @click="() => handleLogin()" class="bg-[#6358DC] text-white p-5"
          >Login</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
