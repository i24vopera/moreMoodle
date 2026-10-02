export type UserObject = {
    id: number
    email: string
    role?: string
    name: string
    last_name: string
    created_at: string
} | null

export type Course = {
    id: number
    title: string
    description: string | null
    teacher_id: number
    created_at: string
    enrolled?: boolean
}

export type Lesson = {
    id: number
    course_id: number
    title: string
    content: string | null
    position: number
}