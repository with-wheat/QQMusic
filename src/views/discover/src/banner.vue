<template>
  <el-carousel :initial-index="0" :interval="4000" type="card" height="12vw">
    <el-carousel-item v-for="item in hotList" :key="item.adid">
      <el-image :src="item.imageUrl" @click="bannerClick(item)" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { banner } from "@/server/recommend/index";
import type { banners } from "@/server/recommend/type";
import { playMusicControl } from "@/store/playMusicControl";

const playStore = playMusicControl();
onMounted(() => {
  getHotList();
});
const hotList = ref<banners[]>();
// 获取banner信息
const getHotList = async () => {
  hotList.value = await banner(0);
};
// banner点击事件
const bannerClick = (data: banners) => {
  playStore.setSongInfo(data.targetId);
};
</script>

<style scoped lang="less">
.el-carousel-item {
  width: 90%;
  margin: 0 auto;
}
.el-image {
  border-radius: 10px;
  height: 12vw;
  width: 100%;
}
/deep/.is-active .el-carousel__button {
  background-color: @color;
}
</style>
