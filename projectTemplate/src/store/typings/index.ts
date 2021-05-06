export interface LoginForm {
  email: string
  password: string
  is_inner: number
}

export interface UserInfo {
  avatar: string
  email: string
  is_inner: 1 | 2
  token: string
  username: string
}

export interface StoreState {
  token: string
  userInfo: UserInfo
}

export interface LoginAction {
  type: string
  data: any
}

export type ActionTypes = LoginAction
