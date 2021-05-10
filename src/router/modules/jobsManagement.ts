import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/jobsManagement',
  component: Layout,
  redirect: '/jobsManagement/jobs-List',
  name: 'JobsManagement',
  meta: {
    title: 'jobsManagement',
    icon: 'table'
  },
  children: [
    {
      path: 'jobs-List',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/jobsManagement/jobsList.vue'),
      name: 'JobsList',
      meta: { title: 'jobsList' }
    }
  ]
}

export default tableRoutes
