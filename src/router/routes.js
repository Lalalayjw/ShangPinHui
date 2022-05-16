import Home from '@/pages/Home'
import Search from '@/pages/Search/'
import Login from '@/pages/Login/'
import Register from '@/pages/Register/'
import Detail from '@/pages/Detail'
export default [
	{
		name: 'home',
		path: '/home',
		component: Home,
		meta: {
			show: true
		}
	},
	{
		name: 'search',
		path: '/search',
		component: Search,
		meta: {
			show: true
		}
	},
	{
		name: 'login',
		path: '/login',
		component: Login,
		meta: {
			show: false
		}
	},
	{
		name: 'register',
		path: '/register',
		component: Register,
		meta: {
			show: false
		}
	},
	{
		// 路由重定向，访问首页
		name: 'name',
		path: '/',
		redirect: '/home'
	},
	{
		name: 'detail',
		path: '/detail/:skuid',
		component: Detail,
		meta: {
			show: true
		}
	},
]
