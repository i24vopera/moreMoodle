<template>
    <div class="" v-if="!user">
        <div class="flex flex-col justify-center items-center gap-4 my-16" v-if="registerPage">
            <p class="text-2xl font-condensed font-semibold uppercase text-text">Registrace</p>
            <input type="email" v-model="email" placeholder="E-mail" class="w-120 h-8 bg-bg p-2 rounded-sm border-2 border-surface" />
            <input type="password" v-model="password" placeholder="Heslo" class="w-120 h-8 bg-bg p-2 rounded-sm border-2 border-surface" />
            <button @click="register" class="px-4 py-2 bg-accent text-white font-condensed uppercase font-semibold rounded-sm hover:bg-bg border-2 border-white hover:border-accent transition-all cursor-pointer duration-300 hover:text-accent">Registrovat</button>
            <p class="" v-if="error">{{ error }}</p>
        </div>
        <div class="flex flex-col justify-center items-center gap-4 my-16" v-else>
            <p class="text-2xl font-condensed font-semibold uppercase text-text">Přihlášení</p>
            <input type="email" v-model="email" placeholder="E-mail" class="w-120 h-8 bg-bg p-2 rounded-sm border-2 border-surface" />
            <input type="password" v-model="password" placeholder="Heslo" class="w-120 h-8 bg-bg p-2 rounded-sm border-2 border-surface" />
            <button @click="login" class="px-4 py-2 bg-accent text-white font-condensed uppercase font-semibold rounded-sm hover:bg-bg border-2 border-white hover:border-accent transition-all cursor-pointer duration-300 hover:text-accent">Přihlásit se</button>
            <p class="" v-if="error">{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '@/composables/useUser';

const { setUser, user } = useUser()

const API = import.meta.env.VITE_API_URL

const props = defineProps({
    registerPage: Boolean
})

const email = ref("")
const password = ref("")
const error = ref("")

const send = async (path: string) => {
    error.value = ""
    const res = await fetch(`${API}/auth/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value, password: password.value }),
    })
    const data = await res.json()

    if (!res.ok) {
        error.value = data.error
        return null
    }
    return data
}

const register = async () => {
    const data = await send("register")
    if (data) await login()
}

const login = async () => {
    const data = await send("login")
    if (data) user.value = data
}
</script>