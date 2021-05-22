// 引入axios的初始化模块
import request from '@/utils/request'
const teacher_api = '/teacher'

// 导出默认模块
export default {

  // 讲师列表(条件查询分页)
  // current 当前页 size 每页记录数 academyTeacherQuery 条件对象
  getPageList(current, size, academyTeacherQuery) {
    // 调用axios的初始化模块 发送远程请求
    return request({
      url: `${teacher_api}/${current}/${size}`,
      methods: 'post',
      // academyTeacherQuery 条件对象 后端使用requestbody获取数据
      // data 表示将对象转换为json进行传递到接口里面
      data: academyTeacherQuery
    })
  },
  removeById(id) {
    return request({
      url: `${teacher_api}/${id}`,
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
