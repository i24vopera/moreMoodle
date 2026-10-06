<template>
    <div class="">
        <button class="text-xl font-condensed uppercase font-semibold bg-accent border-2 border-accent hover:text-accent text-white hover:bg-white transition-all duration-200 px-6 py-3 rounded-md cursor-pointer" @click="switchPassResPopup">Resetovat heslo</button>
    </div>
</template>

<script setup lang="ts">
import { usePasswordReset } from '@/composables/usePasswordReset';

const { resetPassword, switchPassResPopup } = usePasswordReset()
</script>