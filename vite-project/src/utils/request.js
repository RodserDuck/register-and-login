import axios from 'axios'
import { useUserStore } from '../store/user'
const instance = axios.create({
	baseURL: 'https://big-event-vue-api-t.itheima.net',
	timeout: 1000,
})

// 添加请求拦截器
instance.interceptors.request.use(
	function (config) {
	  const userStore = useUserStore()
	  // 在发送请求之前做些什么：通过请求头的方式传递token
	  // config:请求报文
	  config.headers.Authorization = userStore.getToken()
	  return config
	},
	function (error) {
	  // 对请求错误做些什么
	  return Promise.reject(error)
	}
  )

export default instance