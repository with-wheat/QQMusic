<template>
  <div class="home">
    <div class="menu">
      <pageMenu />
    </div>
    <div class="center">
      <header>
        <PageHeader />
      </header>
      <el-scrollbar>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-scrollbar>
      <footer>
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import pageMenu from "@/components/layout/menu/index";
import PageHeader from "@/components/layout/header/index";
import Footer from "@/components/layout/footer";
import { userPlayerInit } from "@/store/playMusicControl";

userPlayerInit();
</script>

<style scoped lang="less">
.home {
  display: flex;
  height: 100%;
  .menu {
    height: 100%;
    width: 200px;
    min-width: 200px;
    background-color: #f9fafb;
  }
  .center {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 60px;
    .content {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
