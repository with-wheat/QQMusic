<template>
  <div>
    <el-dialog
      :model-value="getCenterDialogVisible"
      title="扫码登录"
      width="30%"
      destroy-on-close
      center
      @close="LoginClose"
    >
      <div>
        <qr-code />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import qrCode from "../login/qr-code.vue";
import { loginStore } from "@/store/login";
import { storeToRefs } from "pinia";
const { getCenterDialogVisible } = storeToRefs(loginStore());
const loginStores = loginStore();
const LoginClose = () => {
  loginStores.setGetCenterDialogVisible(false);
};
</script>

<style scoped lang="less"></style>
