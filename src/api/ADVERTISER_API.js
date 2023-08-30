import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/admin/v1/advertiser/search',
    method: 'get',
    params: query
  })
}
export function businessNumberCheck(query) {
  return request({
    url: '/admin/v1/advertiser/businessNumber/check',
    method: 'get',
    params: query
  })
}

export function register(data) {
  return request({
    url: '/admin/v1/advertiser/register',
    method: 'POST',
    data
  })
}

export function modify(data) {
  return request({
    url: '/admin/v1/advertiser/modify',
    method: 'PUT',
    data
  })
}
