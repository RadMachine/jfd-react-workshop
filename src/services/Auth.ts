import { $api } from '../http'
import { ILoginData, ILoginResponse } from '../models/login'

export const AuthService = {
  async login(data: ILoginData) {
    try {
      const res = await $api.post<ILoginResponse>('/auth/login', data)
      return { data: res.data }
    } catch (err) {
      return { error: err as object }
    }
  }
}
