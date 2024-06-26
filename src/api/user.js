import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/v1/users/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/v1/auth/logout',
    method: 'post'
  })
}
