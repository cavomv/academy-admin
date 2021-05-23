<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-upload
        ref="upload"
        class="upload-demo"
        name="file"
        accept=".xlsx"
        :action="BASE_API+'teacher/addsubject'"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
        :auto-upload="false"
        :limit="1"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过500kb</div>
      </el-upload>
    </el-form>
  </div>
</template>

<script>

export default {

  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
      importBtnDisabled: false,
      loading: false
    }
  },
  created() {
  },
  methods: {
    // 点击上传按钮将文件上传到接口中
    submitUpload() {
      this.importBtnDisabled = true
      this.loading = true
      // 表单提交
      this.$refs.upload.submit()
    },
    // 上传成功
    fileUploadSuccess() {
      // 提示信息
      this.loading = false
      this.$message({
        type: 'success',
        message: '课程分类添加成功'
      })
      // 跳转课程分类列表
    },
    // 上传失败
    fileUploadError() {
      this.loading = false
      this.$message({
        type: 'error',
        message: '课程分类添加失败'
      })
    }
  }
}
</script>
