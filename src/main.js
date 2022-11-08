import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// import VueQuillEditor from "vue-quill-editor";
// import "quill-paste-smart";
// import "quill/dist/quill.snow.css";


createApp(App).use(router).mount('#app')
