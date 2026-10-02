import { readonly, ref } from "vue"

const popupActive = ref<boolean>(false)
const deleteAccError = ref<string>("")

export function deletePopup() {
    const switchDeletePopup = () => {
        popupActive.value = !popupActive.value
    }

    const setDeleteError = (newError: string) => {
        deleteAccError.value = newError
    }

    return {
        switchDeletePopup,
        popupActive: readonly(popupActive),
        deleteAccError,
        setDeleteError
    }
}