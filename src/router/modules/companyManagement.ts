import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/companyManagement',
  component: Layout,
  redirect: '/companyManagement/company-List',
  name: 'CompanyManagement',
  meta: {
    title: 'companyManagement',
    icon: 'table'
  },
  children: [
    {
      path: 'company-List',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/companyManagement/companyList.vue'),
      name: 'CompanyList',
      meta: { title: 'companyList' }
    }
  ]
}

export default tableRoutes
