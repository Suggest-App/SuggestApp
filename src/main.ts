import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from "@/i18n";
import App from './App.vue'
import router from './router'
import VueLazyload from "vue-lazyload";
import lazyLoadLoadingImage from "@/assets/images/MediaImagePlaceholder.jpg";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.use(VueLazyload, {
    observer: true,
    error: lazyLoadLoadingImage,
    loading: lazyLoadLoadingImage,
})

app.mount('#app')
