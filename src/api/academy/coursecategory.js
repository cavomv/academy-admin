// 引入axios的初始化模块
import request from '@/utils/request'
const teacher_api = '/teacher'

// 导出默认模块
export default {
  // 修改讲师
  getNestedList() {
    return request({
      url: `${teacher_api}/nestedlist`,
      method: 'get'
    })
  }
}
