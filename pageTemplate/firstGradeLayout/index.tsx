import React, { FC } from 'react'
import { renderRoutes, RouteConfig } from 'react-router-config'

const Replace: FC = (props: RouteConfig) => {
  const { route } = props
  return <div>{renderRoutes(route.routes)}</div>
}
export default Replace
