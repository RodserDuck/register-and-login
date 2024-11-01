import axios from '../utils/request'

// import { useUserStore } from '../store/user'

// 获取所有文章列表数据
export const getAllArticleListAPI = function (data) {
  // const userStore = useUserStore()
  return axios({
    method: 'GET',
    url: '/my/article/list',
    // headers: { Authorization: userStore.getToken() },
    // get请求方式的参数传递使用params
    params: data,
  })
}