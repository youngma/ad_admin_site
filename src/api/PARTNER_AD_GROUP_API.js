import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/admin/v1/partners/ad_groups/search',
    method: 'get',
    params: query
  })
}


export function searchMappingAds(query) {
  return request({
    url: '/admin/v1/partners/ad_groups/mapping/ads',
    method: 'get',
    params: query
  })
}
