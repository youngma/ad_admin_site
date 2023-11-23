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
export function searchByAdvertiserSummary(query) {
  return request({
    url: '/admin/v1/report/quiz/advertiser/daily/summary',
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

export function searchByPartnerSummary(query) {
  return request({
    url: '/admin/v1/report/quiz/partner/daily/summary',
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

export function searchByAdminSummary(query) {
  return request({
    url: '/admin/v1/report/quiz/admin/daily/summary',
    method: 'get',
    params: query
  })
}

export function searchByUser(query) {
  return request({
    url: '/admin/v1/report/quiz/user/raw',
    method: 'get',
    params: query
  })
}
export function searchByUserSummary(query) {
  return request({
    url: '/admin/v1/report/quiz/user/raw/summary',
    method: 'get',
    params: query
  })
}
