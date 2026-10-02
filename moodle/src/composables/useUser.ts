import { ref, readonly } from "vue"

type UserObject = {
    id: number
    email: string
    role: string
    name: string
    last_name: string
} | null

const user = ref<UserObject>(null)
const token = ref<string | null>(localStorage.getItem("token"))

export function useUser() {
    const API = import.meta.env.VITE_API_URL

    const setSession = (newUser: UserObject, newToken: string | null) => {
        user.value = newUser
        token.value = newToken
        if (newToken) localStorage.setItem("token", newToken)
        else localStorage.removeItem("token")
    }

    const logout = () => setSession(null, null)

    // zavolá se při startu aplikace
    const loadUser = async () => {
        if (!token.value) return
        try {
            const res = await fetch(`${API}/me`, {
                headers: { Authorization: `Bearer ${token.value}` },
            })
            if (!res.ok) {
                logout()
                return
            }
            user.value = await res.json()
        } catch {
            // server nedostupný, token necháme být
        }
    }

    return {
        user: readonly(user),
        token: readonly(token),
        setSession,
        logout,
        loadUser,
    }
}