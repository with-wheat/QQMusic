<template>
  <div class="footer">
    <div class="playInfo">
      <PlayInfo />
    </div>
    <div class="playControl">
      <Control />
    </div>
    <div class="playList">
      <PlayList />
    </div>
  </div>
</template>

<script setup lang="ts">
import Control from "./control.vue";
import PlayInfo from "./playInfo.vue";
import PlayList from "./playList.vue";
</script>

<style scoped lang="less">
.footer {
  width: calc(100% - 200px);
  height: 70px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
}
</style>
