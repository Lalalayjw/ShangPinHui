// axios二次封装
import axios from 'axios'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const requests = axios.create({
	baseURL:'http://gmall-h5-api.atguigu.cn/',
	timeout:15000,
})
// 请求拦截器
requests.interceptors.request.use((config)=>{
	
	nprogress.start()
	return config
})
requests.interceptors.response.use((res)=>{
	nprogress.done()
	return res.data
},(error)=>{
	return Promise.reject(new Error("failure"))
})

export default requests