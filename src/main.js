import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
// import {reqCategoryList} from '@/api'
import store from './store'

import '@/mock/mockServe.js'
import 'swiper/css/swiper.min.css'
// import {reqGetSearchInfo} from '@/api'
// console.log(reqGetSearchInfo({}))
// reqCategoryList()
const app = createApp(App)
app.use(router)
// 使用store需要挂载到app身上
app.use(store)
// 注册全局组件
app.component('TypeNav',TypeNav)
app.component('Carousel',Carousel)
app.component('Pagination',Pagination)
app.mount('#app')