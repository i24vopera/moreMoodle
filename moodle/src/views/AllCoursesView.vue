<template>
    <div class="flex flex-row flex-wrap justify-center items-center gap-12 mt-32">
        <!-- Všechny kurzy -->
        <CourseCard v-for="c in courses" :key="c.id" :course="c" enrollable @enroll="enroll" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { Course } from '@/types';
    import CourseCard from '@/components/CourseCard.vue';
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

    const courses = ref<Course[]>([
        { id: 1, title: "HTML a CSS", description: "Základy webu", teacher_id: 1, created_at: "2026-09-01T10:00:00Z" },
        { id: 2, title: "JavaScript", description: null, teacher_id: 1, created_at: "2026-09-02T10:00:00Z" },
    ])

    const enroll = () => {
        console.log("Enrolled")
    }
</script>