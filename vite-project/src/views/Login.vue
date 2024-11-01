<template>
    <el-row class="login-page">
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="6" :offset="3" class="form">
        <!-- 注册相关表单 -->
        <el-form 
        ref="registerForm" 
        size="large" 
        autocomplete="off" 
        v-if="isLogin" 
        :model="regForm" 
        :rules="rules">
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input 
            :prefix-icon="User" 
            placeholder="请输入用户名"
            v-model="regForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="regForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
              v-model="regForm.repassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
            class="button" 
            type="primary" 
            auto-insert-space  
            @click="userRegister()"
            >
              注册
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isLogin=false"> ← 返回 </el-link>
          </el-form-item>
        </el-form>
  
        <!-- 登录相关表单 -->
        <el-form 
        ref="loginForm" 
        size="large" 
        autocomplete="off" 
        v-else
        :model="logForm" 
        :rules="rules"
        ><el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input 
            :prefix-icon="User" 
            placeholder="请输入用户名"
            v-model="logForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="logForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button 
            class="button" 
            type="primary" 
            auto-insert-space
            @click="userLogin"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isLogin = true"> 注册 → </el-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
  import { ref } from "vue";


  import {userRegisterAPI,userLoginAPI} from '../apis/user';
  import { ElMessage } from "element-plus";
  import { useRouter } from "vue-router";
  const router = useRouter();
  const isLogin = ref(false);
  const regForm = ref({
    username: "",
    password: "",
    repassword: "",
  });
  
  const rules = ref({
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 1, max: 10, message: '请输入1-10位大小写字母和数字', trigger: "blur" },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 15, message: '请输入6-15位非空格字符'}
    ],
    repassword:[
      {
        required:true,
        validator:function(rule,value,callback){
          if (value === '') {
          callback(new Error('请输入二次密码'))
        } else if (value != regForm.value.password) {
          callback(new Error('二次密码输入不正确'))
        } else {
          callback()
        }
        }
      }
    ]
  })
  
  const registerForm = ref()
  const userRegister = function (formEl) {
  registerForm.value.validate((valid) => {
    if(valid){
      userRegisterAPI(regForm.value).then(function(result){
        isLogin.value = false
        if (result.data.code == 0){
          ElMessage.success(result.data.message)
        }else if(result.data.code == 1){
          ElMessage.error(result.data.message)
        }else{
          ElMessage.error('注册失败')
        }
      })
    }else{
      ElMessage.error('校验失败，请按要求输入数据')
    }
  })
}
const logForm = ref({
    username: "",
    password: "",
  });
const loginForm = ref()
import { useUserStore } from '../store/user'
const userStore = useUserStore()

const userLogin = function (){
  loginForm.value.validate((valid) => {
    if(valid){
      userLoginAPI(logForm.value).then(function(res){
        if (res.data.code == 0){
          ElMessage.success('登陆成功.')
          userStore.saveToken(res.data.token)
          router.push('/index')
        }else if(res.data.code == 1){
          ElMessage.error('登陆失败，请重试.')
        }
      })
    }else{
      ElMessage.error('校验失败，请按要求输入数据')
    }
  })
}

</script>
  
  <style lang="less" scoped>
  .login-page {
    height: 100vh;
    background-color: #fff;
    .bg {
      background: url('../assets//login_bg.jpg') no-repeat 60% center / 240px auto,
        url('../assets/login_bg.jpg') no-repeat center / cover;
      border-radius: 0 20px 20px 0;
    }
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      user-select: none;
      .title {
        margin: 0 auto;
      }
      .button {
        width: 100%;
      }
      .flex {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  </style>