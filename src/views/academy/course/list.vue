<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="请输入关键词进行过滤" />
    <el-tree
      ref="tree"
      :data="coursecategoryList"
      :props="defaultProps"
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script>

import coursecategory from '@/api/academy/coursecategory'

export default {

  data() {
    return {
      filterText: '', // 过滤文本
      coursecategoryList: [], // 数据列表
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.fetchNodeList()
  },
  methods: {
    fetchNodeList() {
      coursecategory.getNestedList()
        .then(response => {
          this.coursecategoryList = response.data.items
        })
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
