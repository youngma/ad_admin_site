import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/admin/v1/inquiry/search',
    method: 'get',
    params: query
  })
}

export function answer(data) {
  return request({
    url: '/admin/v1/inquiry/answer',
    method: 'post',
    data
  })
}
