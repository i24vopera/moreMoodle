import { ref, readonly } from "vue"

type UserObject = {
    id: number
    email: string
    role: string
    name: string
    last_name: string
} | null

const user = ref<UserObject>(null)

export function useUser () {
    const setUser = (newUser: UserObject) => {
        user.value = newUser
    }

    return {
        setUser,
        user: readonly(user)
    }
}