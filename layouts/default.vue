<script setup lang="ts">
const router = useRouter();
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <nav class="bg-white border-b border-gray-200 shadow-sm">
        <div class="container mx-auto flex items-center justify-between p-4">
          <div class="text-2xl font-bold text-gray-800">
            <!-- <img src="/logo.png" alt="Logo" class="h-12 w-12" /> -->
          </div>
          <h1 class="text-xl font-semibold">handleLogin</h1>
          <div class="flex items-center space-x-6">
            <MyNavLink
              to="/"
              class="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </MyNavLink>
            <MyNavLink
              to="/about"
              class="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              About
            </MyNavLink>
            <Button v-if="!authenticated" @click="() => router.push('/login')">
              Login
            </Button>
            <Button v-if="authenticated" @click="logout"> Logout </Button>
          </div>
        </div>
      </nav>
    </header>
    <main class="flex-grow">
      <slot></slot>
    </main>
    <footer class="bg-gray-100 py-4 text-center">
      <p class="text-gray-600">Footer</p>
    </footer>
  </div>
</template>
