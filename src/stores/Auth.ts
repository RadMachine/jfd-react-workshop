import { makeAutoObservable, runInAction } from 'mobx'
import { ILoginData } from '../models/login'
import { ISimpleState } from '../models/state'
import { AuthService } from '../services/Auth'

export const AuthStore = makeAutoObservable({
  isAuth: !!localStorage.getItem('access_token'),
  state: 'success' as ISimpleState,

  async login(data: ILoginData) {
    this.state = 'loading'
    const res = await AuthService.login(data)
    runInAction(() => {
      if (res.error) {
        this.isAuth = false
        this.state = 'error'
      } else {
        localStorage.setItem('access_token', res.data.accessToken)
        this.isAuth = true
        this.state = 'success'
      }
    })
    return res
  },

  logout() {
    localStorage.removeItem('access_token')
    this.isAuth = false
    this.state = 'success'
  }
})
