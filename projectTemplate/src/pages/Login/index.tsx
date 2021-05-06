import React, { useCallback, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import store from '@/store'
import { LoginForm } from '@/store/typings'
import useLogin from './hooks/useLogin'
import './style.scoped.scss'

const Login = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { login } = useLogin()

  const onFinish = useCallback(
    async (values: LoginForm) => {
      values.is_inner = 1
      setLoading(true)
      await login(values)
      setLoading(false)
      if (store.getState().common.token) {
        history.push('/')
      }
    },
    [login, history]
  )

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login-container">
      <Form
        className="login-form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1>游戏客户端实时性能分析平台</h1>
        <div className="input-area">
          <Form.Item
            label={<UserOutlined style={{ color: 'white' }} />}
            name="email"
            rules={[
              { required: true, type: 'email', message: '请输入正确的邮箱' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<UnlockOutlined style={{ color: 'white' }} />}
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={<UnlockOutlined style={{ color: 'white' }} />}
            name="is_inner"
            hidden
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default React.memo(Login)
