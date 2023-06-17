import { createApp } from 'vue';
import App from './App.vue';
// import './assets/CSS/login.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router";
import $ from 'jquery';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import slick from 'slick-carousel';
//import '@/assets/js/slick.min.js';
createApp(App).use(ElementPlus).use(router).use(bootstrap).use($).use(slick).mount('#app')







