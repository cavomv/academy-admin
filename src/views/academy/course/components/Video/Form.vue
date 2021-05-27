<template>
  <div class="app-container">
    <!--添加和修改课时-->
    <el-dialog :visible="dialogVisible" title="添加课时" @close="close()">
      <el-form :model="video" label-width="128px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="saveOrUpdate()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import video from '@/api/academy/video'

export default {
  data() {
    return {
      dialogVisible: false,
      video: {
        sort: 0,
        free: false
      }
    }
  },

  methods: {
    open(chapterId, videoId) {
      this.dialogVisible = true
      this.video.chapterId = chapterId
      if (videoId) {
        video.getById(videoId).then(response => {
          this.video = response.data.items
        })
      }
    },
    close() {
      this.dialogVisible = false
      // 重置表单
      this.resetForm()
    },
    resetForm() {
      this.video = {
        sort: 0,
        free: false
      }
    },
    saveOrUpdate() {
      if (!this.video.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      this.video.courseId = this.$parent.$parent.courseId
      video.save(this.video).then(response => {
        this.$message.success(response.message)
        // 关闭组件
        this.close()
        // 刷新列表
        this.$parent.fetchNodeList()
      })
    },
    update() {
      video.updateById(this.video).then(response => {
        this.$message.success(response.message)
        this.close()
        this.$parent.fetchNodeList()
      })
    }
  }
}
</script>
