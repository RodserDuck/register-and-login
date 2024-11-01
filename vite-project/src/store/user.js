import { defineStore } from 'pinia'
import { ref } from 'vue'
// 通过defineStore创建一个仓库
// userStore:仓库名称
// function(){}:仓库的配置-成员
export const useUserStore = defineStore(
  'userStore',
  function () {
    // 仓库的成员如果提供外部的访问，则需要返回

    // 定义成员:存储token
    const token = ref('')

    // 存储token
    const saveToken = function (usertoken) {
      token.value = usertoken
    }

    // 获取token
    const getToken = function () {
      return token.value
    }

    // 移除token
    const removeToken = function () {
      token.value = ''
    }

    // 用户信息
    const userInfo = ref({})
    const setUserInfo = function (info) {
      userInfo.value = info
    }
    const getUserInfo = function () {
      return userInfo.value
    }

    // 需要将token返回
    return { 
      token, 
      saveToken, 
      getToken, 
      removeToken,
      userInfo,
      setUserInfo,
      getUserInfo,
    }
  },
  {
    // 如果persist以对象的形式进行配置，那么它会默认开始true持久存储
    persist: {
      key: 'myusertoken',
    },
  }
)
