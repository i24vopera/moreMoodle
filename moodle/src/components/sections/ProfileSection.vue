<template>

    <div class="flex flex-col justify-center items-start mx-auto w-6xl mt-16" v-if="user">
        <p class="text-2xl font-condensed font-semibold uppercase mb-4">Váš profil:</p>
        <div class="text-xl ml-8">
            <p class="my-3 font-semibold font-condensed">Jméno: <span class="font-roboto font-normal">{{ user.name }}</span></p>
            <p class="my-3 font-semibold font-condensed">Příjmení: <span class="font-roboto font-normal">{{ user.last_name }}</span></p>
            <p class="my-3 font-semibold font-condensed">Role: <span class="font-roboto font-normal">{{ user.role }}</span></p>
            <p class="my-3 font-semibold font-condensed">E-mail: <span class="font-roboto font-normal">{{ user.email }}</span></p>
            <p class="my-3 font-semibold font-condensed">Účet vytvořen: <span class="font-roboto font-normal">{{ user.created_at.substring(8, 10) }}. {{ user.created_at.substring(5, 7) }}. {{ user.created_at.substring(0, 4) }} {{ user.created_at.substring(11, 16) }}</span></p>
        </div>
    </div>

    <div class="w-6xl mx-auto mt-16" v-if="user && user.role !== 'teacher'">
        <button class="bg-red-500 text-white font-condensed font-semibold text-xl uppercase px-6 py-3 rounded-md cursor-pointer hover:bg-white hover:text-red-500 border-2 border-red-500 transition-all duration-200" @click="switchDeletePopup">Smazat účet</button>
        <p class="text-center text-xl font-semibold" v-if="deleteAccError">{{ deleteAccError }}</p>
    </div>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser';
import { deletePopup } from '@/composables/useDeletePopup';
import { ref } from 'vue';

const { user } = useUser()
const { switchDeletePopup, deleteAccError } = deletePopup()

const popup = ref(false)
</script>