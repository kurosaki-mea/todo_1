import { createApp } from 'vue'
import './style.css'

// 看纯前端版时，取消注释这行：
// import App from './App.vue'

// 看 Nodejs 接口版时，取消注释这行：
import App from './AppApi.vue'

createApp(App).mount('#app')
