import React from 'react'
import { Redirect } from 'react-router-dom'
import { DashboardOutlined } from '@ant-design/icons'
import Layout from '@/components/Layout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import { RouteConfig } from 'react-router-config'

const routes: RouteConfig[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/',
        hidden: true,
        exact: true,
        render: (): JSX.Element => <Redirect to="/dashboard" />,
      },
      {
        path: '/dashboard',
        name: '工作台',
        component: Dashboard,
        icon: <DashboardOutlined />,
        // hidden: true,
      },
    ],
  },
]

export default routes
