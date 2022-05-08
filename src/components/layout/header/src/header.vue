<template>
  <div class="header">
    <div class="header-left">
      <Back />
      <PageSearch />
    </div>
    <div class="header-right">1111</div>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "./search.vue";
import Back from "./back.vue";
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
