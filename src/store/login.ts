import { defineStore } from "pinia";
import { getUserState } from "@/server/login/index";
import type { account, profile } from "@/server/login/types";

export const loginStore = defineStore("loginStore", {
  state: () => {
    return {
      // 登录弹窗显示隐藏
      centerDialogVisible: false,
      // 用户信息
      account: null as account | null,
      // 用户表面数据
      profile: null as profile | null
    };
  },
  getters: {
    getCenterDialogVisible: (state) => {
      return state.centerDialogVisible;
    }
  },
  actions: {
    async setGetCenterDialogVisible(temp: boolean) {
      this.centerDialogVisible = temp;
    },
    async setUserInfo(token: string) {
      const data = await getUserState(token);
      this.account = data.account;
      this.profile = data.profile;
    }
  }
});
