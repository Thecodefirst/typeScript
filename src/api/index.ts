import request from '@/utils/request'

export const getInfo = () =>
  request({
    url: '/index/info',
    method: 'POST'
  })
