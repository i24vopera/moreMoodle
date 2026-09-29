import { ref } from "vue"

type UserObject = {
    id: string
    email: string
    role: string
} | null

const user = ref<UserObject>(null)

export function useUser () {
    const setUser = (newUser: UserObject) => {
        user.value = newUser
    }

    return {
        setUser,
        user
    }
}