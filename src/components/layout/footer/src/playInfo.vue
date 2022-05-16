<template>
  <div class="playInfo">
    <div class="playImg">
      <el-image
        style="height: 50px"
        :src="songInfo?.al?.picUrl ? songInfo?.al?.picUrl : OpticalDisk"
      />
    </div>
    <div class="palyText">
      <div class="title">
        <span>{{ songInfo?.name ? songInfo?.name : "开源音乐" }}</span>
        <span v-if="songInfo?.ar">- {{ songInfo?.ar[0]?.name }}</span>
        <span v-else>- SmallRuralDog</span>
      </div>
      <div class="palyBtn">
        <IconPart :icon="Like" size="18" />
        <IconPart :icon="DownloadOne" size="18" />
        <IconPart :icon="MessageOne" size="18" />
        <div class="buzz">
          <IconPart :icon="Comment" size="18" />
          <span>{{ songInfo?.pop > 99 ? "99" : songInfo?.pop }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Like, DownloadOne, MessageOne, Comment } from "@icon-park/vue-next";
import IconPart from "@/components/icon";
import { storeToRefs } from "pinia";
import { playMusicControl } from "@/store/playMusicControl";
import { OpticalDisk } from "@/assets/img";

const { songInfo } = storeToRefs(playMusicControl());
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
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        color: @fontColor1;
        white-space: nowrap;
      }
      span:last-child {
        color: @fontColor2;
        overflow: hidden;
        text-overflow: ellipsis;
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
