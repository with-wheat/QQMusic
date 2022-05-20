<template>
  <div class="footer">
    <SliderInput />
    <div class="content">
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
  </div>
</template>

<script setup lang="ts">
import Control from "./control.vue";
import PlayInfo from "./playInfo.vue";
import PlayList from "./playList.vue";
import SliderInput from "./sliderInput.vue";
</script>

<style scoped lang="less">
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 999;
}
.content {
  width: calc(100% - 200px);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
