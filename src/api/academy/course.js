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
  }
}
