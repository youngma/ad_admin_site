import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/admin/v1/users/search',
    method: 'get',
    params: query
  })
}

export function userIdCheck(query) {
  return request({
    url: '/admin/v1/users/check',
    method: 'get',
    params: query
  })
}

export function userDisabled(data) {
  return request({
    url: '/admin/v1/users/disabled',
    method: 'put',
    data
  })
}

export function userEnabled(data) {
  return request({
    url: '/admin/v1/users/enabled',
    method: 'put',
    data
  })
}

export function register(data) {
  return request({
    url: '/admin/v1/users/register',
    method: 'POST',
    data
  })
}

export function modify(data) {
  return request({
    url: '/admin/v1/users/info',
    method: 'PUT',
    data
  })
}

export function changePassword(data) {
  return request({
    url: '/admin/v1/users/password',
    method: 'put',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/v1/user/info',
//     method: 'get',
//     // params: { token }
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/v1/auth/logout',
//     method: 'post'
//   })
// }
