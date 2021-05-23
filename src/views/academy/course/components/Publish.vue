<template>
  <div class="app-container">
    课程发布
    <div style="text-align:center">
      <el-button
        type="primary"
        @click="prev()"
      >上一步</el-button>
      <el-button
        :disabled="publishBtnDisabled"
        type="primary"
        @click="publish()"
      >课程发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 按钮是否禁用
      publishBtnDisabled: false
    }
  },
  methods: {
    prev() {
      this.$parent.active = 1
    },
    // 发布课程
    publish() {
      this.publishBtnDisabled = true
      // 访问父组件Form成员 用$parent关键字
      this.$parent.active = 3
    }
  }
}
</script>
