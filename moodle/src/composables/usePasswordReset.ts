import { ref, readonly } from "vue"

const passResPopup = ref<boolean>(false)
const passResError = ref<string>("")

const API = import.meta.env.VITE_API_URL

export function usePasswordReset() {
    const switchPassResPopup = () => {
        passResPopup.value = !passResPopup.value
    }

    const setPassResError = (newError: string) => {
        passResError.value = newError
    }

    const resetPassword = async (oldPassword: string, newPassword: string) => {
        try {
            const res = await fetch(`${API}/resetPassword`, {
                method: "UPDATE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword
                })
            })
            const data = await res.json()
            if (!data.error) {
                setPassResError(data.output)
            } else {
                setPassResError(data.error)
            }
        } catch (err: any) {
            setPassResError(err)
        }
    }

    return {
        switchPassResPopup,
        setPassResError,
        passResError,
        passResPopup: readonly(passResPopup),
        resetPassword
    }
}