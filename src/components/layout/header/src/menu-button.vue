<template>
  <div class="menuBut">
    <ul>
      <li v-if="loginOk">
        <el-avatar size="small" :src="profile?.avatarUrl" />
        <span>{{ profile?.nickname }}</span>
      </li>
      <li v-if="!loginOk">
        <span @click="codeLogin">点击登录</span>
      </li>
      <li>
        <IconPart :icon="Mail" theme="outline" size="16" />
      </li>
      <li>
        <IconPart :icon="Platte" theme="outline" size="16" />
      </li>
      <li>
        <IconPart :icon="HamburgerButton" theme="outline" size="16" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Mail, Platte, HamburgerButton } from "@icon-park/vue-next";
import IconPart from "@/components/icon/index";
import { loginStore } from "@/store/login";
import { storeToRefs } from "pinia";
import locaoCache from "@/utils/cache";
const loginOk = ref<boolean>(false);

const { account, profile } = storeToRefs(loginStore());

const { setGetCenterDialogVisible, setUserInfo } = loginStore();
const userState = async () => {
  if (locaoCache.getToken()) {
    await setUserInfo(locaoCache.getToken() as string);
    loginOk.value = true;
  } else {
    loginOk.value = false;
  }
};
userState();
const codeLogin = () => {
  setGetCenterDialogVisible(true);
};
</script>

<style scoped lang="less">
.menuBut {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      display: flex;
      align-items: center;
      color: #334155;
      margin-left: 16px;
      text-align: center;
      cursor: pointer;
      span {
        display: flex;
        align-items: center;
        margin-left: 3px;
      }
      span:hover {
        color: @color;
      }
    }
  }
}
</style>
