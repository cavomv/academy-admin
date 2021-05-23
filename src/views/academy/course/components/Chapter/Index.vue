<template>
  <div class="app-container">
    课程大纲
    <div style="text-align:center">
      <el-button
        type="primary"
        @click="prev()"
      > 上一步</el-button>
      <el-button
        type="primary"
        @click="next()"
      > 下一步</el-button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
    // 按钮是否禁用
      saveBtnDisabled: false
    }
  },
  methods: {
    // 上一步
    prev() {
      this.$parent.active = 0
    },
    // 下一步
    next() {
      this.$parent.active = 2
    }
  }
}
</script>

