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
      <el-form-item label="课程分类">
        <!--一级分类-->
        <el-select
          v-model="courseInfo.courseTypeParentId"
          placeholder="请选择"
          @change="courseTypeChanged"
        >
          <el-option
            v-for="courseCategoryFirst in courseCategoryFirstList"
            :key="courseCategoryFirst.id"
            :value="courseCategoryFirst.id"
            :label="courseCategoryFirst.title"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select
          v-model="courseInfo.courseTypeId"
          placeholder="请选择"
        >
          <el-option
            v-for="courseCategorySecond in courseCategorySecondList"
            :key="courseCategorySecond.id"
            :value="courseCategorySecond.id"
            :label="courseCategorySecond.title"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          v-model="courseInfo.lessonNum"
          :min="0"
          controls-position="right"
          placeholder="请填写总课时"
        />
      </el-form-item>

      <!-- 课程简介 -->
      <el-form-item label="课程简介">
        <tinymce v-model="courseInfo.description" :height="200" />
      </el-form-item>
      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          :limit="1"
          list-type="picture"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload"
          :on-error="handleCoverError"
          class="cover-uploader"
          action="http://localhost:8111/oss/avatar/upload?module=cover"
        >
          <img v-if="courseInfo.cover" :src="courseInfo.cover">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

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
import courseCategory from '@/api/academy/coursecategory'
import Tinymce from '@/components/Tinymce'

export default {

  // 注册富文本编辑器组件
  components: { Tinymce },

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
      teacherList: [],
      // 一级分类
      courseCategoryFirstList: [],
      // 二级分类
      courseCategorySecondList: []
    }
  },
  created() {
    // 数据回显
    if (this.$parent.courseId) {
      this.fetchCourseById(this.$parent.courseId)
    }
    this.initTeacherList()
    this.initCourseCategoryList()
  },
  methods: {
    // 根据id 查询课程基本信息
    fetchCourseById(id) {
      course.getCourseInfoById(id)
        .then(response => {
          this.courseInfo = response.data.item
        })
    },
    // 切换一级分类下拉列表
    courseTypeChanged(value) {
      console.log('value', value)
      // 根据一级分类的ID 遍历出所有二级分类
      this.courseCategoryFirstList.forEach(
        courseCategoryFirst => {
          // 清空当前选中的值
          this.courseInfo.courseTypeId = ''
          // 判断当前选中的一级分类是否和当前遍历的一级分类ID相同
          if (courseCategoryFirst.id === value) {
            this.courseCategorySecondList = courseCategoryFirst.children
            console.log(this.courseCategorySecondList)
          }
        }
      )
    },

    // 获取课程一级分类列表
    initCourseCategoryList() {
      courseCategory.getNestedList().then(response => {
        this.courseCategoryFirstList = response.data.items
      }
      )
    },
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
    // 更新课程信息
    updateData() {
      course.updateCourseInfoById(this.courseInfo).then(response => {
        this.$message.success(response.message)
        this.$parent.active = 1
      })
    },

    // 上传成功回调
    handleCoverSuccess(response, file) {
      console.log('response', response)
      if (response.code === 20000) {
        console.log('response.success', response.success)
        this.courseInfo.cover = response.data.url
        console.log('response.data.url', response.data.url)
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        console.log('response', response)
        this.$message.error('上传失败1（非20000）')
      }
    },

    // 上传校验
    beforeCoverUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 错误处理
    handleCoverError() {
      console.log('error')
      this.$message.error('上传失败（http错误）')
    }
  }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
.cover-uploader .el-upload {
  border: 1px dashed #ce1111;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409EFF;
}
.cover-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 480px;
  height: 320px;
  line-height: 320px;
  text-align: center;
}
.cover-uploader {
  width: 480px;
  height: 320px;
  display: block;
}

</style>
