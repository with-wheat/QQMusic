<template>
  <div class="header">
    <div class="header-left">
      <Back />
      <PageSearch />
    </div>
    <div class="header-right">
      <menu-but></menu-but>
    </div>
  </div>
  <PageLogin />
</template>

<script setup lang="ts">
import PageSearch from "./search.vue";
import Back from "./back.vue";
import MenuBut from "./menu-button.vue";
import PageLogin from "@/views/login/index";
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    display: flex;
    align-items: center;
  }
}
</style>
