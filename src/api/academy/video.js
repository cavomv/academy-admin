import request from '@/utils/request'
const video_api = '/teacher/chapter'

export default {

  save(video) {
    return request({
      url: '${video_api}/save',
      method: 'post',
      data: video
    })
  },

  getById(id) {
    return request({
      url: `${video_api}/get/${id}`,
      method: 'get'
    })
  },

  updateById(video) {
    return request({
      url: '${video_api}/update',
      method: 'put',
      data: video
    })
  },

  removeById(id) {
    return request({
      url: `${video_api}/remove/${id}`,
      method: 'delete'
    })
  }
}
