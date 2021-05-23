<template>
  <div class="app-container">
    <!-- 课程信息表单 -->
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder="Java学习：从零开始"
        />
      </el-form-item>

      <!--课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <!--所属分类 TODO -->
      <el-form-item label="总课时">
        <el-input-number
          v-model="courseInfo.lessonNum"
          :min="0"
          controls-position="right"
          placeholder="请填写总课时"
        />
      </el-form-item>
      <!-- 课程简介 TODO -->
      <!-- 课程封面 TODO -->
      <el-form-item label="课程价格">
        <el-input-number
          v-model="courseInfo.price"
          :min="0"
          controls-position="right"
          placeholder="免费课程设置为0元"
        />
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="saveAndNext()"
      >保存并下一步</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/academy/course'
import teacher from '@/api/academy/teacher'

export default {
  data() {
    return {
      // 按钮是否禁用
      saveBtnDisabled: false,
      // 课程基本信息
      courseInfo: {
        price: 0,
        lessonNum: 0,
        teacherId: '',
        courseTypeId: '',
        courseTypeParentId: '',
        cover: '',
        description: ''
      },
      // 讲师列表
      teacherList: []
    }
  },
  created() {
    this.initTeacherList()
  },
  methods: {

    // 新增讲师
    initTeacherList() {
      teacher.all().then(response => {
        this.teacherList = response.data.items
      })
    },
    // 保存并下一步
    saveAndNext() {
      this.saveBtnDisabled = true
      this.saveData()
    },
    // 新增课程信息
    saveData() {
      course.saveCourseInfo(this.courseInfo).then(response => {
        this.$message.success(response.message)
        // 获取courseId
        this.$parent.course = response.data.courseId
        // 访问父组件Form成员 用$parent关键字
        this.$parent.active = 1
      })
    },
    updateData() {

    }
  }

}
</script>
