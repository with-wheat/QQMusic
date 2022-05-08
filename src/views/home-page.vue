<template>
  <div class="home">
    <div class="menu">
      <pageMenu />
    </div>
    <div class="center">
      <header>
        <PageHeader />
      </header>
      <div class="content">
        <router-view></router-view>
      </div>
      <footer></footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import pageMenu from "@/components/layout/menu/index";
import PageHeader from "@/components/layout/header/index";
</script>

<style scoped lang="less">
.home {
  display: flex;
  height: 100%;
  .menu {
    overflow: auto;
    height: 100%;
    width: 15vw;
    background-color: #f9fafb;
  }
  .center {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
