import request from '@/utils/request'
// import { IPersonalListData } from './types'

export const defaultJobsListData: any = {
  name: '',
  create_date: '',
  create_userid: ''
}

export const getJobsList = (options: any) =>
  request({
    url: '/jobsManagement/jobsList',
    method: 'POST',
    data: options
  })

export const addJobs = (options: any) =>
  request({
    url: '/jobsManagement/addJobs',
    method: 'POST',
    data: options
  })

export const updateJobs = (options: any) =>
  request({
    url: '/jobsManagement/updateJobs',
    method: 'POST',
    data: options
  })

export const deleteJobs = (options: any) =>
  request({
    url: '/jobsManagement/deleteJobs',
    method: 'POST',
    data: options
  })
