<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="grow transition-all duration-300">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>