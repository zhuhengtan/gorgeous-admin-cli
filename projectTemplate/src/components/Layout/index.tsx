import React, { useCallback, useEffect, useState } from 'react'
import { RouteConfig, renderRoutes } from 'react-router-config'
import { Layout, Menu, Breadcrumb } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Link, Route, useHistory } from 'react-router-dom'
import { matchPath } from 'react-router'
import store from '@/store'
import { Footer } from 'antd/lib/layout/layout'
import { MenuInfo } from '../../../node_modules/rc-menu/lib/interface'
import './style.scoped.scss'

interface BreadcrumbItem {
  path: string
  name: string
  key: string
}

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const CustomLayout = (props: RouteConfig) => {
  const { route, location } = props
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false)

  // 处理进来时展开的菜单
  const locationStr = location?.pathname.toString() || ''
  let defaultSelectedKeys
  let defaultOpenKeys
  // 处理面包屑导航
  const breadcrumbList: Array<BreadcrumbItem> = []
  route.routes.forEach((firstGrade: RouteConfig) => {
    if (firstGrade.routes && firstGrade.routes.length) {
      firstGrade.routes.forEach((secondGrade: RouteConfig) => {
        const match = matchPath(locationStr, {
          path: secondGrade.path,
          exact: true,
          strict: false,
        })
        if (match) {
          const currentFirstPath = firstGrade.path
            ? firstGrade.path.toLocaleString()
            : ''
          const currentSecondPath = secondGrade.path
            ? secondGrade.path.toLocaleString()
            : ''
          defaultSelectedKeys = [
            locationStr === '/dashboard' ? '' : currentSecondPath,
          ]
          defaultOpenKeys = [
            locationStr === '/dashboard' ? '' : currentFirstPath,
          ]
          breadcrumbList.push({
            path: '',
            name: firstGrade.name,
            key: firstGrade.path?.toLocaleString || firstGrade.name,
          })
          breadcrumbList.push({
            path: currentSecondPath,
            name: secondGrade.name,
            key: currentSecondPath,
          })
        }
      })
    } else {
      const match = matchPath(locationStr, {
        path: firstGrade.path,
        exact: true,
        strict: false,
      })
      if (match) {
        const currentFirstPath = firstGrade.path
          ? firstGrade.path.toLocaleString()
          : ''
        defaultSelectedKeys = [currentFirstPath]
        defaultOpenKeys = [currentFirstPath]
        breadcrumbList.push({
          path: '',
          name: firstGrade.name,
          key: firstGrade.path?.toLocaleString || firstGrade.name,
        })
      }
    }
  })

  // 折叠展开方法
  const toggleCollapse = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  const goToPage = useCallback(
    (menu: MenuInfo) => {
      const key = menu.key.toLocaleString()
      history.push(key)
    },
    [history]
  )

  // 监听登录状态，退出登录或登录过期，只用清空cookie中和localStorage中的token即可
  useEffect(() => {
    if (!store.getState().common.token && !localStorage.getItem('token')) {
      history.push('/login')
    }
    store.subscribe(() => {
      if (!store.getState().common.token && !localStorage.getItem('token')) {
        history.push('/login')
      }
    })
  }, [history])

  return (
    <Layout className="layout-container">
      <Sider
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="side-bar"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
        >
          {route.routes &&
            route.routes.length > 0 &&
            route.routes.map((item: RouteConfig) => {
              if (item.routes && item.routes.length > 0 && !item.hidden) {
                return (
                  <SubMenu
                    key={item.path?.toLocaleString()}
                    icon={item.icon}
                    title={item.name}
                  >
                    {item.routes &&
                      item.routes.length > 0 &&
                      item.routes.map((subItem: RouteConfig) => {
                        return (
                          !subItem.hidden && (
                            <Menu.Item
                              key={subItem.path?.toLocaleString()}
                              onClick={goToPage}
                            >
                              {subItem.name}
                            </Menu.Item>
                          )
                        )
                      })}
                  </SubMenu>
                )
              }
              if (!item.hidden && (!item.routes || item.routes.length === 0)) {
                return (
                  <Menu.Item
                    key={item.path?.toLocaleString()}
                    onClick={goToPage}
                    icon={item.icon}
                  >
                    {item.name}
                  </Menu.Item>
                )
              }
              return <div key={JSON.stringify(item)}></div>
            })}
        </Menu>
      </Sider>
      <Layout className="right-container">
        <Header className="header">
          <div className="left">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                onClick: toggleCollapse,
              }
            )}
            <Breadcrumb className="breadcrumb">
              {breadcrumbList.map((item: BreadcrumbItem) => {
                if (typeof item === 'object') {
                  return (
                    <Breadcrumb.Item key={item.key}>
                      {item.path ? (
                        <Link to={item.path}>{item.name}</Link>
                      ) : (
                        item.name
                      )}
                    </Breadcrumb.Item>
                  )
                }
                return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
              })}
            </Breadcrumb>
          </div>
        </Header>
        <Content className="content">{renderRoutes(route.routes)}</Content>
        <Footer className="footer">
          <div>游戏客户端实时性能分析平台@技术中心</div>
        </Footer>
      </Layout>
    </Layout>
  )
}
export default React.memo(CustomLayout)
