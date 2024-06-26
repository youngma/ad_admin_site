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

export function modify(data) {
  return request({
    url: '/admin/v1/campaign/modify',
    method: 'PUT',
    data
  })
}


export function campaignApproval(data) {
  return request({
    url: '/admin/v1/campaign/approval',
    method: 'PUT',
    data
  })
}

export function campaignHold(data) {
  return request({
    url: '/admin/v1/campaign/hold',
    method: 'PUT',
    data
  })
}

export function campaignReject(data) {
  return request({
    url: '/admin/v1/campaign/reject',
    method: 'PUT',
    data
  })
}


export function campaignExposure(data) {
  return request({
    url: '/admin/v1/campaign/exposure',
    method: 'PUT',
    data
  })
}

export function campaignNonExposure(data) {
  return request({
    url: '/admin/v1/campaign/non-exposure',
    method: 'PUT',
    data
  })
}
export function already_registeredByMobi(query) {
  return request({
    url: '/admin/v1/campaign/mobi/already_registered',
    method: 'Get',
    params: query
  })
}
