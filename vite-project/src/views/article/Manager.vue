<template>
    <div class="articleManager">
    <el-card style="max-width: 100%">
    <template #header>
        <div class="card-header">
            <span>文章管理</span>
        <el-button type="primary">发布文章</el-button>
     </div>
        </template>
        <!-- 搜索区域 -->
        文章分类：<el-select
          v-model="value"
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span>文章状态:</span>
        <el-select v-model="value" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" style="margin-left: 20px">搜索</el-button>
        <el-button>重置</el-button>
        <!-- 表格 -->
        <el-table :data="articleList" style="width: 100%; margin-top: 20px">
        <el-table-column prop="title" label="文章标题" width="380" />
        <el-table-column prop="cate_name" label="分类" width="80" />
        <el-table-column label="发表时间">
          <template #default="scope">
            <span>{{ moment(scope.row.pub_date).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" :icon="Edit" circle plain />
              <el-button
                type="danger"
                :icon="Delete"
                circle
                plain
                @click="del(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
          <el-pagination
          v-model:current-page="data.pagenum"
          v-model:page-size="data.pagesize"
          :page-sizes="[1, 2, 3, 4]"
          :size="data.pagesize"
            :disabled="disabled"
            :background="background"
            layout="jumper,total, sizes, prev, pager, next "
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="float: right; margin-bottom: 10px"
          />
        </template>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import moment from 'moment'
  import { Edit, Delete } from '@element-plus/icons-vue'
  const options = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ]
  const data = ref({
  pagenum: 1,
  pagesize: 1,
})
const total = ref(0)
import { getAllArticleListAPI } from '../../apis/article.js'
// 获取文章列表数据
const articleList = ref([])
const render = function () {
  getAllArticleListAPI(data.value).then(function (result) {
    console.log(result)
    articleList.value = result.data.data
    total.value = result.data.total
  })
}
render()
  
  // 分页功能
  const handleSizeChange = (val) => {
    data.value.pagesize = val
    render()
  }
  const handleCurrentChange = (val) => {
    data.value.pagenum = val
    render()
  }
  // 删除
  const del = function (row) {
    console.log(row)
  
    // axios({
    //   method:'DELETE',
    //   url:'/my/cate/del',
    //   params:{id:?}
    // })
  }
  </script>
  <style lang="less" scoped>
  .articleManager {
    width: 100%;
    height: 100%;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .el-select {
    margin: 0 10px;
  }
  </style>