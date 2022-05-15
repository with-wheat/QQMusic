<template>
  <el-carousel :initial-index="3" :interval="4000" type="card" height="11vw">
    <el-carousel-item v-for="item in hotList" :key="item.adid">
      <el-image :src="item.imageUrl" fit="contain" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { banner } from "@/server/recommend/index";
import type { banners } from "@/server/recommend/type";
onMounted(() => {
  getHotList();
});
const hotList = ref<banners[]>();
const getHotList = async () => {
  hotList.value = await banner(0);
};
</script>

<style scoped lang="less">
.el-image {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
/deep/.is-active .el-carousel__button {
  background-color: @color;
}
</style>
