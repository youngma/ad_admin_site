import request from '@/utils/request'

export function searchByAdvertiser(query) {
  return request({
    url: '/admin/v1/report/quiz/advertiser/daily',
    method: 'get',
    params: query
  })
}

export function searchByPartner(query) {
  return request({
    url: '/admin/v1/report/quiz/partner/daily',
    method: 'get',
    params: query
  })
}
