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

    </div>
</template>

<script lang="ts" setup>
import LoginPage from '@/components/LoginPage.vue';
import { onMounted, ref } from 'vue';
import { useUser } from '@/composables/useUser';

const { user } = useUser()

let loggedIn = ref(false)
let registerPage = ref(true)

if (user.value !== null) {
    loggedIn.value = true
}

const loginRegisterSwitch = () => {
    registerPage.value = !registerPage.value
}
</script>