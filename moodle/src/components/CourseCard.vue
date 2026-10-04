<template>
    <div class="bg-bg rounded-md w-80 h-100 border-2 border-surface">
        <RouterLink v-if="clickable" :to="`/courses/${course.id}`" class="flex flex-col items-start gap-3 w-full h-full p-3">
            <p class="text-2xl font-semibold font-condensed text-center mx-auto">{{ course.title }}</p>
            <div class="h-1 w-70 rounded-full bg-accent mx-auto"></div>
            <p class="font-roboto">{{ course.description }}</p>
            <p class="" v-if="teacher.error">Nepovedlo se zjistit autora kurzu</p>
            <p class="" v-else>Autor: {{ teacher.name }} {{ teacher.last_name }}</p>
        </RouterLink>

        <div v-else class="flex flex-col items-start gap-3 w-full h-full p-3 relative">
            <p class="text-2xl font-semibold font-condensed text-center mx-auto">{{ course.title }}</p>
            <div class="h-1 w-70 rounded-full bg-accent mx-auto"></div>
            <p class="font-roboto">{{ course.description }}</p>
            <p class="" v-if="teacher.error">Nepovedlo se zjistit autora kurzu</p>
            <p class="" v-else>Autor: {{ teacher.name }} {{ teacher.last_name }}</p>
            <button v-if="enrollable && !course.enrolled" @click="$emit('enroll', course.id)" class="px-4 py-2 rounded-sm border-2 border-accent bg-accent text-white hover:bg-white hover:text-accent transition-all duration-200 uppercase font-condensed font-semibold cursor-pointer absolute bottom-2 left-1/2 -translate-x-1/2 w-11/12">
                Zapsat se
            </button>
            <span v-else-if="enrollable">Zapsán</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import type { Course } from '@/types';
    import { onMounted } from 'vue';
    import { ref } from 'vue';

    const API = import.meta.env.VITE_API_URL

    type Teacher = {
        name: string
        last_name: string
        error?: string
    }

    const teacher = ref<Teacher>({
        name: "",
        last_name: "",
        error: ""
    })

    const props = defineProps<{
        course: Course
        clickable?: boolean
        enrollable?: boolean
    }>()

    defineEmits<{
        enroll: [id: number]
    }>()

    onMounted(async () => {
        console.log(props.course.teacher_id)
        
        try {
            const res = await fetch(`${API}/getTeacher?id=${props.course.teacher_id}`)
            const data = await res.json()
            teacher.value = data
        } catch(err: any) {
            teacher.value.error = err
        }
    })
</script>