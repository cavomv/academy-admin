import request from '@/utils/request'
const course_api = '/teacher/course'

export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `${course_api}/save`,
      method: 'post',
      data: courseInfo
    }
    )
  },
  getCourseInfoById(id) {
    return request({
      url: `${course_api}/${id}`,
      method: 'get'
    })
  },
  updateCourseInfoById(courseInfo) {
    return request({
      url: `${course_api}/update/`,
      method: 'put',
      data: courseInfo
    })
  },
  getCourseInfoPageList(current, size, courseQuery) {
    return request({
      url: `${course_api}/${current}/${size}`,
      method: 'get',
      params: courseQuery
    })
  }
}
