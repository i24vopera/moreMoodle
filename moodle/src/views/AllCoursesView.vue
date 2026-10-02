<template>
    <!-- Moje kurzy -->
    <CourseCard v-for="c in courses" :key="c.id" :course="c" clickable />

    <!-- Všechny kurzy -->
    <CourseCard v-for="c in courses" :key="c.id" :course="c" enrollable @enroll="enroll" />
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { Course } from '@/types';
    import CourseCard from '@/components/CourseCard.vue';

    const courses = ref<Course[]>([
        { id: 1, title: "HTML a CSS", description: "Základy webu", teacher_id: 1, created_at: "2026-09-01T10:00:00Z" },
        { id: 2, title: "JavaScript", description: null, teacher_id: 1, created_at: "2026-09-02T10:00:00Z" },
    ])

    const enroll = () => {
        console.log("Enrolled")
    }
</script>