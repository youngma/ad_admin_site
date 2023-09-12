import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/admin/v1/partners/ad_groups/search',
    method: 'get',
    params: query
  })
}

