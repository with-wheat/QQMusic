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
        <ElScrollbar>
          <router-view></router-view>
        </ElScrollbar>
      </div>
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
</script>

<style scoped lang="less">
.home {
  display: flex;
  height: 100%;
  overflow: hidden;
  .menu {
    overflow: auto;
    height: 100%;
    width: 200px;
    min-width: 200px;
    background-color: #f9fafb;
  }
  .center {
    display: flex;
    flex-direction: column;
    flex: 1;
    .content {
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
