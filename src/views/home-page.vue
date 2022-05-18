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
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <keep-alive include="discover,music">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
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
    margin-bottom: 80px;
    .content {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(32px);
  opacity: 0.5;
}
</style>
