import request from '@/utils/request'
// import { IPersonalListData } from './types'

export const defaultPersonalListData: any = {
  num: null,
  company_id: '',
  file_num: '',
  name: '',
  department: '',
  jobs: '',
  grades: '',
  gender: '',
  nation: '',
  date_birth: '',
  idcard: '',
  tel: '',
  marital: '',
  education: '',
  graduate_institutions: '',
  major: '',
  hiredate: '',
  probation: '',
  positive: '',
  politics_status: '',
  working_state: '',
  departure_date: '',
  account_type: '',
  take_job_date: '',
  present_address: '',
  contract_over_date: '',
  bank_deposit: '',
  card_no: '',
  payment_information: '',
  create_date: '',
  update_date: '',
  create_userid: '',
  dd_userid: '',
  del: ''
}

export const defaultPersonalListDataAssign: any = {
  company_name: '',
  department_name: '',
  jobs_name: '',
  gender_name: '',
  marital_name: '',
  education_name: '',
  working_state_name: '',
  account_type_name: ''
}

export const getPersonalList = (options: any) =>
  request({
    url: '/personalManagement/personalList',
    method: 'POST',
    data: options
  })

export const getPersonalSelectArr = () =>
  request({
    url: '/personalManagement/getPersonalSelectArr',
    method: 'POST'
  })

export const addPersonal = (options: any) =>
  request({
    url: '/personalManagement/addPersonal',
    method: 'POST',
    data: options
  })

export const updatePersonal = (options: any) =>
  request({
    url: '/personalManagement/updatePersonal',
    method: 'POST',
    data: options
  })

export const deletePersonal = (options: any) =>
  request({
    url: '/personalManagement/deletePersonal',
    method: 'POST',
    data: options
  })
