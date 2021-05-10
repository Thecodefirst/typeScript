import request from '@/utils/request'

export const getAttendanceList = (options: any) =>
  request({
    url: '/attendanceManagement/attendanceList',
    method: 'POST',
    data: options
  })
