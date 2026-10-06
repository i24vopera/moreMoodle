<template>
  <div class="fixed z-10 w-full h-full bg-black/50" v-if="popupActive">
    <div class="fixed top-1/2 left-1/2 -translate-1/2 w-2xl bg-white p-4 rounded-xl">
      <p class="text-2xl font-semibold font-roboto">Opravdu chcete smazat účet?</p>
      <p class="font-roboto">Smazáním účtu smažete také všechny úkoly, co jste s tímto účtem splnili. Tuto akci si prosím promyslete.</p>
      <div class="flex flex-row flex-wrap justify-center items-center mt-8 gap-8">
        <button class="bg-accent text-white font-condensed font-semibold text-xl uppercase px-6 py-3 rounded-md cursor-pointer hover:bg-white hover:text-accent border-2 border-accent transition-all duration-200" @click="switchDeletePopup">Zpět</button>
        <button class="bg-red-500 text-white font-condensed font-semibold text-xl uppercase px-6 py-3 rounded-md cursor-pointer hover:bg-white hover:text-red-500 border-2 border-red-500 transition-all duration-200" @click="deleteAccount">Smazat účet</button>
      </div>
    </div>
  </div>
  <div class="fixed z-10 w-full h-full bg-black/50" v-if="passResPopup">
    <div class="fixed top-1/2 left-1/2 -translate-1/2 w-2xl bg-white p-4 rounded-xl">
      <p class="text-2xl font-semibold font-roboto">Reset hesla</p>
      <input type="text" v-model="old_password" placeholder="Aktuální heslo">
      <input type="text" v-model="new_password" placeholder="Nové heslo">
      <div class="flex flex-row flex-wrap justify-center items-center mt-8 gap-8">
        <button class="bg-accent text-white font-condensed font-semibold text-xl uppercase px-6 py-3 rounded-md cursor-pointer hover:bg-white hover:text-accent border-2 border-accent transition-all duration-200" @click="switchDeletePopup">Zpět</button>
        <button class="bg-red-500 text-white font-condensed font-semibold text-xl uppercase px-6 py-3 rounded-md cursor-pointer hover:bg-white hover:text-red-500 border-2 border-red-500 transition-all duration-200" @click="deleteAccount">Smazat účet</button>
      </div>
    </div>
  </div>
  <div class="flex min-h-screen flex-col">
    <header class="bg-bg w-full h-16 border-b-2 border-b-surface flex flex-row flex-wrap justify-between items-center gap-6 p-4 text-xl font-condensed font-semibold">
      <p class="justify-self-start float-left text-2xl hidden md:block">MoreMůdl</p>
      <div class="justify-self-center font-normal hidden md:block">
        <div class="text-sm" v-if="user">
            Jste přihlášeni jako {{ user.name }} {{ user.last_name }}, <span class="font-semibold">{{ user.role?.toUpperCase() }}</span>
            <button class="ml-4 hover:underline cursor-pointer underline-offset-2" @click="logout">Odhlásit se</button>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end items-center gap-6">
        <router-link to="/courses/" class="hover:underline underline-offset-4">Moje Kurzy</router-link>
        <router-link to="/courses/all" class="hover:underline underline-offset-4">Všechny Kurzy</router-link>
        <router-link to="/" class="hover:underline underline-offset-4">Profil</router-link>
      </div>
    </header>
    <main class="grow transition-all duration-300">
      <RouterView />
    </main>
    <footer class="w-full h-8 bg-bg border-t-2 border-t-surface flex flex-row flex-wrap justify-center items-center">
      <p class="font-roboto">Website created by RV&MZ with 💙</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import { useUser } from './composables/useUser';
import { deletePopup } from './composables/useDeletePopup';
import { usePasswordReset } from './composables/usePasswordReset';

const API = import.meta.env.VITE_API_URL
const { user, logout } = useUser()
const { popupActive, switchDeletePopup, setDeleteError } = deletePopup()
const { passResPopup, resetPassword } = usePasswordReset()

const old_password = ref("")
const new_password = ref("")

const deleteAccount = async () => {
  if (!user.value) return

  const res = await fetch(`${API}/deleteAcc`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: user.value.id }),
  })

  if (!res.ok) {
    setDeleteError("Účet se nepodařilo smazat.")
    return
  }
  switchDeletePopup()
  logout()
}
</script>