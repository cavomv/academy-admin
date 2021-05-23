<template>
  <div class="app-container">
    <h2 style="text-align: center;">
      发布新课程
    </h2>
    <el-steps :active="active" finish-status="success" simple="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <!--步骤内容-->
    <!--填写课程基本信息-->
    <info v-if="active === 0" />
    <!--创建课程大纲-->
    <chapter v-if="active === 1" />
    <!--发布课程-->
    <publish v-if="active == 2 || active == 3" />

  </div>
</template>
<script>
// 引入子组件
import Info from '@/views/academy/course/components/Info'
import Chapter from '@/views/academy/course/components/Chapter/Index'
import Publish from '@/views/academy/course/components/Publish'

export default {

  // 注册子组件
  components: { Info, Chapter, Publish },
  data() {
    return {
      active: 0,
      courseId: null
    }
  }
}
</script>

