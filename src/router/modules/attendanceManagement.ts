import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/attendanceManagement',
  component: Layout,
  redirect: '/attendanceManagement/attendance-List',
  name: 'AttendanceManagement',
  meta: {
    title: 'attendanceManagement',
    icon: 'table'
  },
  children: [
    {
      path: 'attendance-List',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/attendanceManagement/attendanceList.vue'),
      name: 'AttendanceList',
      meta: { title: 'attendanceList' }
    }
  ]
}

export default tableRoutes
