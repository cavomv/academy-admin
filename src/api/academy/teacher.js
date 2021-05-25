// 引入axios的初始化模块
import request from '@/utils/request'
const teacher_api = '/teacher'

// 导出默认模块
export default {

  all() {
    return request({
      url: `${teacher_api}/all`,
      method: 'get'
    })
  },

  // 讲师列表(条件查询分页)
  // current 当前页 size 每页记录数 academyTeacherQuery 条件对象
  getPageList(current, size, academyTeacherQuery) {
    // 调用axios的初始化模块 发送远程请求
    return request({
      url: `${teacher_api}/${current}/${size}`,
      methods: 'get',
      // params 传递键值对
      params: academyTeacherQuery
    })
  },
  removeById(id) {
    return request({
      url: `${teacher_api}/remove/${id}`,
      method: 'delete'
    })
  },
  save(teacher) {
    return request({
      url: `${teacher_api}/save`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id查询讲师
  selectById(id) {
    return request({
      url: `${teacher_api}/${id}`,
      method: 'get'
    })
  },
  // 修改讲师
  updateById(teacher) {
    return request({
      url: `${teacher_api}/update`,
      method: 'post',
      data: teacher
    })
  }
}
