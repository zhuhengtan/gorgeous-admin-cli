import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Login } from '@/store'
import { LoginForm } from '@/store/typings'

const useLogin = () => {
  const dispatch = useDispatch()
  const login = useCallback(
    async (loginForm: LoginForm) => {
      await dispatch(Login(loginForm))
    },
    [dispatch]
  )

  return { login }
}

export default useLogin
