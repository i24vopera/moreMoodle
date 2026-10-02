<template>
    <RouterLink v-if="clickable" :to="`/courses/${course.id}`">
        <h3>{{ course.title }}</h3>
        <h3>{{ course.description }}</h3>
    </RouterLink>

    <div v-else>
        {{ course.title }}
        {{ course.description }}
    </div>

    <button v-if="enrollable && !course.enrolled" @click="$emit('enroll', course.id)">
        Zapsat se
    </button>
    <span v-else-if="enrollable">Zapsán</span>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import type { Course } from '@/types';

    defineProps<{
        course: Course
        clickable?: boolean
        enrollable?: boolean
    }>()

    defineEmits<{
        enroll: [id: number]
    }>()
</script>