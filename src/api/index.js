import http from '../utils/http'

export default {
  addTodo (data) {
    return http({
      url: '/home/add',
      method: 'POST',
      data
    })
  },
  delTodo (id) {
    return http({
      url: '/home/del',
      method: 'POST',
      data: {
        id
      }
    })
  },
  updateTodo (data) {
    return http({
      url: '/home/update',
      method: 'POST',
      data
    })
  },
  getList (params) {
    return http({
      url: `/home/list`,
      params
    })
  },
  getAll (url) {
    // 动态跨域请求
    return http({
      url: '/home/all',
      method: 'POST',
      data: {
        url
      }
    })
  }
}