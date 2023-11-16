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

export function businessNumberModify(data) {
  return request({
    url: '/admin/v1/advertiser/businessNumber',
    method: 'put',
    data
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

export function searchByUser(query) {
  return request({
    url: '/admin/v1/advertiser/users',
    method: 'get',
    params: query
  })
}

export function userIdCheck(query) {
  return request({
    url: '/admin/v1/advertiser/users/check',
    method: 'get',
    params: query
  })
}

export function userRegister(data) {
  return request({
    url: '/admin/v1/advertiser/user/register',
    method: 'POST',
    data
  })
}

export function userModify(data) {
  return request({
    url: '/admin/v1/advertiser/user/modify',
    method: 'PUT',
    data
  })
}

export function userEnable(data) {
  return request({
    url: '/admin/v1/advertiser/user/enable',
    method: 'PUT',
    data
  })
}

export function userDisable(data) {
  return request({
    url: '/admin/v1/advertiser/user/disable',
    method: 'PUT',
    data
  })
}

export function searchByAccount(query) {
  return request({
    url: '/admin/v1/advertiser/accounts',
    method: 'get',
    params: query
  })
}

export function accountNumberCheck(query) {
  return request({
    url: '/admin/v1/advertiser/account/check',
    method: 'get',
    params: query
  })
}

export function accountUnused(data) {
  return request({
    url: '/admin/v1/advertiser/account/unused',
    method: 'PUT',
    data
  })
}

export function accountUsed(data) {
  return request({
    url: '/admin/v1/advertiser/account/used',
    method: 'PUT',
    data
  })
}

export function accountRegister(data) {
  return request({
    url: '/admin/v1/advertiser/account/register',
    method: 'POST',
    data
  })
}
export function accountDelete(data) {
  return request({
    url: '/admin/v1/advertiser/account/delete',
    method: 'DELETE',
    data
  })
}
