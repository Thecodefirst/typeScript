import request from '@/utils/request'

export const whetherAiReport = () =>
  request({
    url: '/report/whetherAiReport',
    method: 'POST'
  })

export const getAttcolumns = () =>
  request({
    url: '/report/getAttcolumns',
    method: 'POST'
  })
