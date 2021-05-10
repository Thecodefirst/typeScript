import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/personalManagement',
  component: Layout,
  redirect: '/personalManagement/personal-List',
  name: 'PersonalManagement',
  meta: {
    title: 'personalManagement',
    icon: 'table'
  },
  children: [
    {
      path: 'personal-List',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/personalManagement/personalList.vue'),
      name: 'PersonalList',
      meta: { title: 'personalList' }
    }
  ]
}

export default tableRoutes
