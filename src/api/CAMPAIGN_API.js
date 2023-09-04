import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/admin/v1/campaign/search',
    method: 'get',
    params: query
  })
}

export function register(data) {
  return request({
    url: '/admin/v1/campaign/register',
    method: 'POST',
    data
  })
}
