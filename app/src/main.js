import { createApp } from 'vue'
import App from './components/App.vue'
import router from "./router"
import './assets/css/main.css'

createApp(App)
  .use(router)
  .mount('#app')