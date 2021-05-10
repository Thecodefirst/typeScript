export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}
//views => personalManagement => personalList
export interface IPersonalListData {
  num: number
  company_id: number
  company_name: string
  file_num: string
  name: string
  department: number
  department_name: string
  jobs: number
  jobs_name: string
  grades: string
  gender: number
  gender_name: string
  nation: string
  date_birth: string
  idcard: string
  tel: string
  marital: number
  marital_name: string
  education: number
  education_name: string
  graduate_institutions: string
  major: string
  hiredate: string
  probation: string
  positive: string
  politics_status: string
  working_state: number
  working_state_name: string
  departure_date: string
  account_type: number
  account_type_name: string
  take_job_date: string
  present_address: string
  contract_over_date: string
  bank_deposit: string
  card_no: string
  payment_information: string
  create_date: string
  update_date: string
  create_userid: number
}

//views => personalManagement => personalList
export interface ICompanyListData {
  id: number
  name: string
  create_date: string
  create_userid: number
}

//views => departmentManagement => departmentList
export interface IDepartmentListData {
  id: number
  name: string
  create_date: string
  create_userid: number
}

//views => jobsManagement => jobsList
export interface IJobsListData {
  id: number
  name: string
  create_date: string
  create_userid: number
}

//views => jobsManagement => jobsList
export interface IAttendanceListData {
  id: number,
  department_id: number,
  dd_userid: number,
  dd_username: string,
  dept_id: number,
  dept_name: string,
  should_attendance_days: number,
  attendance_days: number,
  leave_sick: number,
  leave_personal: number,
  late_times: number,
  earlyAndLate: number,
  leave_in_lieu: number,
  leave_funeral: number,
  leave_annual: number,
  business_trip_time: number
}