<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form :inline="true" size="mini" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="academyTeacherQuery.name" placeholder="讲师名称" />
        {{ academyTeacherQuery.name }}
      </el-form-item>
      <el-form-item>
        <el-select v-model="academyTeacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      {{ academyTeacherQuery.level }}

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="academyTeacherQuery.createTime"
          type="datatime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      {{ academyTeacherQuery.createTime }}
      <el-form-item>
        <el-date-picker
          v-model="academyTeacherQuery.updateTime"
          type="datatime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      {{ academyTeacherQuery.updateTime }}

      <el-button size="mini" type="primary" icon="el-icon-search" @click="getPageList()">查询</el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--讲师列表-->
    <el-table
      :data="teacherList"
      border
      stripe
    >
      <el-table-column
        prop="id"
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (current-1)*size+scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="createTime" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <!--@click="removeById(scope.row.id)":获取这行的id 传入js-->
        <template slot-scope="scope">
          <!--修改开始-->
          <router-link
            :to="'/teacher/edit/'+scope.row.id"
            style="margin-right: 5px"
          >
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <!--修改结束-->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page.sync="current"
      :page-size="size"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getPageList"
    />
  </div>
</template>
<script>
// 引入API模块 调用teacher.js文件
import teacher from '@/api/academy/teacher'

export default {
  // data定义变量和初始值
  data() {
    return {
      // 数据列表
      teacherList: null,
      // 总记录数
      total: 0,
      // 当前页
      current: 1,
      // 每页记录数
      size: 5,
      // 条件封装对象
      academyTeacherQuery: {}
    }
  },
  // 在页面渲染之前执行，调用methods中的方法
  created() {
    // 调用当前页面方法
    this.getPageList()
  },
  // 创建具体方法，调用teacher.js中定义的方法
  methods: {
    getPageList() {
      // 发送请求从后台获取数
      teacher.getPageList(this.current, this.size, this.academyTeacherQuery)
        // 请求成功
        .then(response => {
          // response表示得到接口返回的数据
          this.total = response.data.total
          this.teacherList = response.data.rows
        })
        // 请求失败
        .catch(error => {
          console.log(error)
        })
    },
    // 清空查询数据
    resetData() {
      this.academyTeacherQuery = {}
      this.pageList()
    },
    removeDataById(id) {
      // 提示：是否删除
      this.$confirm('此操作将永久删除该记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return teacher.removeById(id)
      })
        .then(() => {
        // 已经向后台发送请求了并且是成功的
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPageList()
        }).catch((response) => {
        // 失败
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
    }
  }
}
</script>

