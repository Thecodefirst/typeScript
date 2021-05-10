import request from '@/utils/request'
// import { IPersonalListData } from './types'

export const defaultDepartmentListData: any = {
  name: '',
  create_date: '',
  create_userid: ''
}

export const getDepartmentList = (options: any) =>
  request({
    url: '/departmentManagement/departmentList',
    method: 'POST',
    data: options
  })

export const addDepartment = (options: any) =>
  request({
    url: '/departmentManagement/addDepartment',
    method: 'POST',
    data: options
  })

export const updateDepartment = (options: any) =>
  request({
    url: '/departmentManagement/updateDepartment',
    method: 'POST',
    data: options
  })

export const deleteDepartment = (options: any) =>
  request({
    url: '/departmentManagement/deleteDepartment',
    method: 'POST',
    data: options
  })
