import axios from 'axios'
const instance = axios.create({
	baseURL: 'https://big-event-vue-api-t.itheima.net',
	timeout: 1000,
})

export default instance