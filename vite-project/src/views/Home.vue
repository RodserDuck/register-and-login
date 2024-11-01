<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="img">
          <img src="../assets/logo.png" alt="" />
        </div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          :unique-opened="true"
          :router="true"
          :default-active="route.path"
        >
          <el-menu-item index="/article/channel">
            <el-icon><Histogram /></el-icon>
            <span>文章分类</span>
          </el-menu-item>

          <el-menu-item index="/article/manager">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>

          <el-sub-menu index="1">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Operation /></el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><Edit /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            程序员：<strong>{{ userStore.getUserInfo().username }}</strong>
          </div>
          <el-dropdown placement="bottom-end">
            <!-- 展示给用户，默认看到的 -->
            <span class="el-dropdown__box">
              <el-avatar :src="circleUrl" />
              <el-icon><CaretBottom /></el-icon>
            </span>

            <!-- 折叠的下拉部分 -->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User"
                  >基本资料</el-dropdown-item
                >
                <el-dropdown-item command="avatar" :icon="Crop"
                  >更换头像</el-dropdown-item
                >
                <el-dropdown-item command="password" :icon="EditPen"
                  >重置密码</el-dropdown-item
                >
                <el-dropdown-item command="logout" :icon="SwitchButton"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import circleUrl from '../assets/avatar.jpg'
// 导入你想使用的图标
import {
  Crop,
  EditPen,
  SwitchButton,
  Histogram,
  Promotion,
  UserFilled,
  Operation,
  User,
  Edit,
  CaretBottom,
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useUserStore } from '../store/user'
const userStore = useUserStore()
</script>
<style lang="less" scoped>
.el-aside {
  background: #545c64;
  height: 100vh;
  .img {
    padding: 10px 0;
    text-align: center;
  }
}

.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  .el-dropdown__box {
    display: flex;
    align-items: center;
    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
}

.el-main {
  background-color: #eee;
}
</style>