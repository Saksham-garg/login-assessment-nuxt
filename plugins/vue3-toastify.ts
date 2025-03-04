import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp:any) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 1000
  })
})
