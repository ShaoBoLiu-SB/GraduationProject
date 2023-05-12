import { defineStore } from 'pinia'

export const loginStore = defineStore('login', {
  state: () => {
    return {
      account: null,
      password: null,
      isLogin: false, // 判断登录状态,默认未登录
    }
  },
  actions: {
    // 注册新账号
    saveAccount(account: any, password: any) {
      this.account = account
      this.password = password
    },

  }
})