<template>
  <div class="playList">
    <div class="timer">
      <span>00:00</span>
      <span class="sp">/</span>
      <span>00:00</span>
    </div>
    <div>
      <IconPart :icon="Bill" size="20" />
    </div>
    <div class="musicList">
      <IconPart :icon="MenuUnfold" size="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPart from "@/components/icon";
import { Bill, MenuUnfold } from "@icon-park/vue-next";
</script>

<style scoped lang="less">
.playList {
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    span {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span:hover {
      color: @color;
    }
  }
  .timer {
    display: flex;
    justify-content: space-between;
    .sp {
      padding: 0 5px;
      box-sizing: border-box;
    }
  }
}
</style>
