<template>
  <div class="qr-code">
    <el-image style="width: 150px; height: 150px" :src="codeImg?.qrimg" fit="cover" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { getCodeKey, getCodeImg, getCheckInfo } from "@/server/login/index";
import type { loginCode, CodeImgType } from "@/server/login/types";
import { ElMessage } from "element-plus";
import { loginStore } from "@/store/login";
import locaoCache from "@/utils/cache";
// 获取登录二维码的key
const codeKey = ref<loginCode | undefined>();
const codeImg = ref<CodeImgType | undefined>();
onMounted(async () => {
  codeKey.value = await getCodeKey();
  codeImg.value = await getCodeImg(codeKey.value?.unikey);
  check();
});
onUnmounted(() => {
  clearInterval(timer);
});
// 定义定时器的类型
let timer: NodeJS.Timer;
/**
 * 轮询获取扫码信息
 */
const check = () => {
  timer = setInterval(async () => {
    const data = await getCheckInfo(codeKey.value?.unikey as string);
    if (data.code == 803) {
      ElMessage({
        message: "登录成功",
        type: "success"
      });
      clearInterval(timer);
      // 保存cookie
      locaoCache.setToken(data.cookie);
      // 获取登录状态
      userStatus(data.cookie);
    } else if (data.code == 800) {
      ElMessage({
        message: "二维码已失效，请刷新！",
        type: "warning"
      });
      clearInterval(timer);
    } else if (data.code == 802) {
      ElMessage({
        message: "扫描成功！",
        type: "success"
      });
      clearInterval(timer);
    }
  }, 3000);
};

const loginStores = loginStore();
const userStatus = (cookie: string) => {
  loginStores.setUserInfo(cookie);
};
</script>

<style scoped lang="less">
.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
