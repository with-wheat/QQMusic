<template>
  <div class="playInfo">
    <div class="playImg">
      <el-image style="height: 50px" :src="url" fit="fit" />
    </div>
    <div class="palyText">
      <div class="title">
        <span>开源音乐</span>
        <span>- SmallRuralDog</span>
      </div>
      <div class="palyBtn">
        <IconPart :icon="Like" size="18" />
        <IconPart :icon="DownloadOne" size="18" />
        <IconPart :icon="MessageOne" size="18" />
        <div class="buzz">
          <IconPart :icon="Comment" size="18" />
          <span>99+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Like, DownloadOne, MessageOne, Comment } from "@icon-park/vue-next";
import IconPart from "@/components/icon";
const url = "http://localhost:3002/src/assets/img/OpticalDisk.png";
</script>

<style scoped lang="less">
.playInfo {
  display: flex;
  .playImg {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-image {
      border-radius: 5px;
      margin: 0 10px 0 0;
    }
  }
  .palyText {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        color: @fontColor1;
      }
      span:last-child {
        color: @fontColor2;
      }
    }
    .palyBtn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: @fontColor2;
        cursor: pointer;
      }
      span:hover {
        color: @color;
      }
      .buzz {
        display: flex;
        position: relative;
        span:last-child {
          background-color: rgb(242, 237, 237);
          position: absolute;
          left: 11px;
          top: -9px;
          font-size: 12px;
          border-radius: 50%;
          padding: 0;
          border: 0;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
