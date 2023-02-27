import { defineStore } from 'pinia';

import homeIcon from '@/assets/temp/aside/home.png'
import historyIcon from '@/assets/temp/aside/history.png'
import moneyIcon from '@/assets/temp/aside/money.png'

export const asideStore = defineStore('aside', {
  state: () => {
    return {
      homeIcon, historyIcon, moneyIcon,
      confirmIndex: 0,
      followDotFlag: false,
      asideHover: false,
    }
  },

  actions: {
    changeIndex(index: number) {
      this.confirmIndex = index;
    },
    hoverDot(flag: boolean) {
      this.followDotFlag = flag;
    },
    hoverAside(flag: boolean) {
      this.asideHover = flag;
    }
  }
})