import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/departmentManagement',
  component: Layout,
  redirect: '/departmentManagement/department-List',
  name: 'DepartmentManagement',
  meta: {
    title: 'departmentManagement',
    icon: 'table'
  },
  children: [
    {
      path: 'department-List',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/departmentManagement/departmentList.vue'),
      name: 'DepartmentList',
      meta: { title: 'departmentList' }
    }
  ]
}

export default tableRoutes
