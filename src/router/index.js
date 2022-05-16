import {createRouter,createWebHashHistory,} from 'vue-router'
import routes from './routes.js'
export default new createRouter({
    history: createWebHashHistory(),
    routes,
	scrollBehavior (to, from, savedPosition) {
		// x->left y->top新版路由
		return {top:0}
	}
})

// const routes = [
// 	{
// 		path:'/home',
// 		component:Home
// 	},
// 	{
// 		path:'/Search',
// 		component:Search
// 	},
// 	{
// 		path:'/login',
// 		component:Login
// 	},
// 	{
// 		path:'/register',
// 		component:Register
// 	},
// 	{
// 		// 路由重定向，访问首页
// 		path:'/',
// 		redirect:'/home'
// 	}
// ]

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes
// })
