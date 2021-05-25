<template>
  <div class="app-container">

    <!-- 查询表单 -->
    <el-form :inline="true" size="mini" class="demo-form-inline">

      <!--标题-->
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程标题" />
      </el-form-item>
      <!--讲师-->
      <el-form-item>
        <el-select v-model="courseQuery.teacherId" placeholder="请选择讲师">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程分类">
        <!--一级分类-->
        <el-select
          v-model="courseQuery.courseTypeParentId"
          placeholder="请选择"
          @change="courseTypeChanged"
        >
          <el-option
            v-for="courseTypeParent in courseTypeParentList"
            :key="courseTypeParent.id"
            :value="courseTypeParent.id"
            :label="courseTypeParent.title"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select
          v-model="courseQuery.courseTypeId"
          placeholder="请选择"
        >
          <el-option
            v-for="courseType in courseTypeList"
            :key="courseType.id"
            :value="courseType.id"
            :label="courseType.title"
          />
        </el-select>
      </el-form-item>

      <el-button size="mini" type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--课程列表-->
    <el-table :data="courseList" border stripe row-class-name="courseList">
      <el-table-column label="ID" width="50">
        <template slot-scope="scope">
          {{ (current-1)*size+scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="封面" width="200" align="center">
        <template slot-sope="scope">
          <img :src="cover" alt="封面" width="100%">
        </template>
      </el-table-column>

      <el-table-column label="课程信息">
        <template slot-scope="scope">
          <a href="">{{ scope.row.title }}</a>
          <p>
            分类：{{ scope.row.courseTypeParentTitle }}>{{ scope.row.courseTypeTitle }}
          </p>
          <p>
            课时：{{ scope.row.lessonNum }}
            浏览：{{ scope.row.viewCount }}
            付费学员：{{ scope.row.buyCount }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="讲师" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.teacherName }}</template>
      </el-table-column>

      <el-table-column label="价格(元)" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="Number(scope.row.price) === 0" type="success">
            免费
          </el-tag>
          <el-tag v-else>{{ Number(scope.row.price).toFixed(2) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="课程状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==='Draft'?'warning':'success'">
            {{ scope.row.status === 'Draft'?'未发布':'已发布' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime.substr(0,10) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id" style="margin-right: 5px">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="current"
      :page-size="size"
      :page-sizes="[5,10,15]"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>

<script>
import course from '@/api/academy/course'
import teacher from '@/api/academy/teacher'
import coursecategory from '@/api/academy/coursecategory'

export default {
  data() {
    return {
      // 课程列表
      courseList: [],
      // 总记录数
      total: 0,
      // 当前页数
      current: 1,
      // 每页记录数
      size: 5,
      // 课程查询条件
      courseQuery: {
        title: '',
        teacherId: '',
        courseTypeParentId: '',
        courseTypeId: ''
      },
      // 课程讲师列表
      teacherList: [],
      // 一级分类
      courseTypeParentList: [],
      // 二级分类
      courseTypeList: [],
      coverURL: 'https://emaolv.oss-cn-beijing.aliyuncs.com/cover/2021/05/24/04a01b05-575d-4854-b73b-0c8ff99bfa66.jpg'
    }
  },
  created() {
    // 显示课程列表
    this.fetchData()
    // 初始化分类列表
    this.initCourseTypeList()
    //  获取讲师列表
    this.initTeacherList()
  },
  methods: {
    // 每页记录数改变 size回调参数 表示当前选中的"每页条数"
    changePageSize(size) {
      this.size = size
      this.fetchData()
    },
    // 改变页面 page 回调参数 表示当前选中的页码
    changeCurrentPage(current) {
      this.current = current
      this.fetchData()
    },
    fetchData() {
      course.getCourseInfoPageList(this.current, this.size, this.courseQuery)
        .then(response => {
          this.courseList = response.data.rows
          this.total = response.data.total
        })
    },
    // 获取讲师列表
    initTeacherList() {
      teacher.all().then(response => {
        this.teacherList = response.data.items
      })
    },
    // 获取课程分类列表
    initCourseTypeList() {
      coursecategory.getNestedList().then(
        respose => {
          this.courseTypeParentList = respose.data.items
          console.log('获取课程分类列表' + this.courseTypeParentList.id)
        }
      )
    },
    // 切换一级分类下拉列表
    courseTypeChanged(value) {
      // 根据一级分类的ID 遍历出所有二级分类
      this.courseTypeParentList.forEach(
        courseTypeParent => {
          // 清空当前选中的值
          // 判断当前选中的一级分类是否和当前遍历的一级分类ID相同
          if (courseTypeParent.id === value) {
            this.courseTypeList = courseTypeParent.children
          }
        }
      )
    },
    // 清空查询数据
    resetData() {
      this.courseQuery = {
        title: '',
        teacherId: '',
        courseTypeParentId: '',
        courseTypeId: ''
      }
      this.courseTypeList = []
      this.fetchData()
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
