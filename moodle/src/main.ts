import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/main.css"
import { useUser } from "@/composables/useUser.ts"

const { loadUser } = useUser()
const app = createApp(App)

app.use(router)

await loadUser()

app.mount('#app')
