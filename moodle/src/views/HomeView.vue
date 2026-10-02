<template>
    <div>
        <LoginPage :registerPage="registerPage"/>
        <div v-if="!user">
            <div class="text-center" v-if="registerPage">
                Již máte účet?
                <button @click="loginRegisterSwitch" class="hover:underline cursor-pointer">Přihlašte se</button>.
            </div>
            <div class="text-center" v-else>
                Ještě nemáte účet?
                <button @click="loginRegisterSwitch" class="hover:underline cursor-pointer">Zaregistrujte se</button>.
            </div>
        </div>
        <div class="" v-if="user">
            Jste přihlášeni jako {{ user.name }} {{ user.last_name }}, {{ user.role }}
            <br>
            <button class="hover:underline cursor-pointer underline-offset-2" @click="logout">Odhlásit se</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LoginPage from '@/components/LoginPage.vue';
import { onMounted, ref } from 'vue';
import { useUser } from '@/composables/useUser';

const { user, logout } = useUser()

let loggedIn = ref(false)
let registerPage = ref(true)

if (user.value !== null) {
    loggedIn.value = true
}


let loginRegisterText = ref("Již máte účet? <button @click='loginRegisterSwitch()'>Přihlašte se</button>.")

const loginRegisterSwitch = () => {
    registerPage.value = !registerPage.value
}
</script>