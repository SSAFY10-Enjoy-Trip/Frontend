import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './assets/css/font.css'
import './assets/css/position.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
