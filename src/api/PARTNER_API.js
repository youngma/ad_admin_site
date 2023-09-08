import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/admin/v1/partner/search',
    method: 'get',
    params: query
  })
}

export function businessNumberCheck(query) {
  return request({
    url: '/admin/v1/partner/businessNumber/check',
    method: 'get',
    params: query
  })
}

export function register(data) {
  return request({
    url: '/admin/v1/partner/register',
    method: 'POST',
    data
  })
}

export function modify(data) {
  return request({
    url: '/admin/v1/partner/modify',
    method: 'PUT',
    data
  })
}

export function searchByUser(query) {
  return request({
    url: '/admin/v1/partner/users',
    method: 'get',
    params: query
  })
}

export function userIdCheck(query) {
  return request({
    url: '/admin/v1/partner/users/check',
    method: 'get',
    params: query
  })
}

export function userRegister(data) {
  return request({
    url: '/admin/v1/partner/user/register',
    method: 'POST',
    data
  })
}

export function userModify(data) {
  return request({
    url: '/admin/v1/partner/user/modify',
    method: 'PUT',
    data
  })
}

export function userEnable(data) {
  return request({
    url: '/admin/v1/partner/user/enable',
    method: 'PUT',
    data
  })
}

export function userDisable(data) {
  return request({
    url: '/admin/v1/partner/user/disable',
    method: 'PUT',
    data
  })
}

export function searchByAccount(query) {
  return request({
    url: '/admin/v1/partner/accounts',
    method: 'get',
    params: query
  })
}

export function accountNumberCheck(query) {
  return request({
    url: '/admin/v1/partner/account/check',
    method: 'get',
    params: query
  })
}

export function accountUnused(data) {
  return request({
    url: '/admin/v1/partner/account/unused',
    method: 'PUT',
    data
  })
}

export function accountUsed(data) {
  return request({
    url: '/admin/v1/partner/account/used',
    method: 'PUT',
    data
  })
}

export function accountRegister(data) {
  return request({
    url: '/admin/v1/partner/account/register',
    method: 'POST',
    data
  })
}
export function accountDelete(data) {
  return request({
    url: '/admin/v1/partner/account/delete',
    method: 'DELETE',
    data
  })
}
