import request from '@/utils/request'

export function upload(target, fileName) {
  return request({
    url: `/admin/v1/upload/${target}/register`,
    method: 'get',
    params: {
      fileName
    }
  })
}

