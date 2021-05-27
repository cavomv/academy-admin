import request from '@/utils/request'
const chapter_api = '/teacher/chapter'

export default {
  save(chapter) {
    return request({
      url: `${chapter_api}/save`,
      method: 'post',
      data: chapter
    }
    )
  },
  updateById(chapter) {
    return request({
      url: `${chapter_api}/update`,
      method: 'put',
      data: chapter
    })
  },
  getNestedList(courseId) {
    return request({
      url: `${chapter_api}/nestedList/${courseId}`,
      method: 'get'
    })
  },
  getById(chapterId) {
    return request({
      url: `${chapter_api}/getById/${chapterId}`,
      method: 'get'
    })
  }
}
