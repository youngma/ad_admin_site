import request from '@/utils/request'

export function searchDashboard(query) {
  return request({
    url: '/admin/v1/report/dashboard',
    method: 'get',
    params: query
  })
}

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

export function searchByAdmin(query) {
  return request({
    url: '/admin/v1/report/quiz/admin/daily',
    method: 'get',
    params: query
  })
}
