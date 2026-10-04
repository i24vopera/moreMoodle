<template>

</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { useUser } from '@/composables/useUser';
    import { onMounted } from 'vue';

    const { user } = useUser()
    const router = useRouter()

    onMounted(() => {
        if (!user.value) {
            router.push("/")
        }
    })
</script>