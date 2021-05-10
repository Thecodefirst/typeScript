import request from '@/utils/request'
// import { IPersonalListData } from './types'

export const defaultCompanyListData: any = {
  name: '',
  create_date: '',
  create_userid: ''
}

export const getCompanyList = (options: any) =>
  request({
    url: '/companyManagement/companyList',
    method: 'POST',
    data: options
  })

export const addCompany = (options: any) =>
  request({
    url: '/companyManagement/addCompany',
    method: 'POST',
    data: options
  })

export const updateCompany = (options: any) =>
  request({
    url: '/companyManagement/updateCompany',
    method: 'POST',
    data: options
  })

export const deleteCompany = (options: any) =>
  request({
    url: '/companyManagement/deleteCompany',
    method: 'POST',
    data: options
  })
