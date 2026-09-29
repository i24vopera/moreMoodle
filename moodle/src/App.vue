<template>
  <div class="flex min-h-screen flex-col">
    <header class="bg-bg w-full h-16 border-b-2 border-b-surface flex flex-row flex-wrap justify-between items-center gap-6 p-4 text-xl font-condensed font-semibold">
      <p class="justify-self-start float-left text-2xl">MoreMoodle</p>
      <div class="flex flex-row flex-wrap justify-end items-center gap-6">
        <router-link to="courses/" class="hover:underline underline-offset-4">Moje Kurzy</router-link>
        <router-link to="/" class="hover:underline underline-offset-4">Profil</router-link>
      </div>
    </header>
    <main class="grow transition-all duration-300">
      <RouterView />
      <div class="" v-html="output"></div>
    </main>
    <footer class="w-full h-8 bg-bg border-t-2 border-t-surface flex flex-row flex-wrap justify-center items-center">
      <p class="font-roboto">Website created by RV&MZ with 💙</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { RouterView } from 'vue-router';

import { onMounted, ref } from 'vue';

let output = ref();

onMounted(async () => {
  try {
    const res = await fetch ('api/login.php?id=5');
    const data = await res.json();
    output.value = `OK: ${data.ok}<br>ID: ${data.id}<br>Message: ${data.message}`;
  } catch (error) {
    output.value = error;
  }
  
})
</script>