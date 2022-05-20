<template>
  <div class="playList">
    <div class="timer">
      <span>{{ secondsFormat(currentTime) }}</span>
      <span class="sp">/</span>
      <span>{{ secondsFormat(duration) }}</span>
    </div>
    <div class="songText">
      <IconPart :icon="Bill" size="20" />
    </div>
    <div
      class="musicList"
      @click="
        () => {
          drawer = true;
        }
      "
    >
      <IconPart :icon="MenuFold" size="20" />
      <span>{{ playList.length }}</span>
    </div>
  </div>
  <el-drawer
    v-model="drawer"
    size="280px"
    :with-header="false"
    @close="
      () => {
        drawer = false;
      }
    "
  >
    <h2>播放列表</h2>
    <div class="menu">
      <div>
        <span>歌曲总数{{ playList.length }}</span>
      </div>
      <div
        class="clear"
        @click="
          () => {
            playList = [];
          }
        "
      >
        <IconPart :icon="Delete" size="12" />
        <span>清空</span>
      </div>
    </div>
    <el-scrollbar>
      <div
        v-for="item in playList"
        :key="item.id"
        class="content"
        :class="item.id === id ? 'active' : ''"
        @click="playListChange(item.id)"
      >
        <div class="songInfo">
          <div class="img">
            <el-image :src="item.al.picUrl" lazy />
          </div>
          <div class="songTitle">
            <div class="name">{{ item.name }}</div>
            <div class="author">
              <span v-for="ar in item.ar" :key="ar.id">{{ ar.name }}</span>
            </div>
          </div>
        </div>
        <div class="songTime">{{ secondsFormat(item.dt / 1000) }}</div>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup lang="ts">
import IconPart from "@/components/icon";
import { Bill, MenuFold, Delete } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import { playMusicControl } from "@/store/playMusicControl";
import { secondsFormat } from "@/utils/timer";
import { ref } from "vue";
const { currentTime, duration, playList, id } = storeToRefs(playMusicControl());
const drawer = ref(false);
const playListChange = (id: number) => {
  playMusicControl().setSongInfo(id);
};
</script>

<style scoped lang="less">
.playList {
  width: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    span {
      display: flex;
      justify-content: center;
      align-items: center;
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
  .songText {
    cursor: pointer;
  }
  .songText:hover {
    color: @color;
  }
  .musicList {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .musicList:hover {
    color: @color;
  }
}
.el-drawer {
  padding: 10px !important;
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @fontColor1;
    font-size: 14px;
    .clear {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: @fontColor2;
    }
    .clear:hover {
      color: @color;
    }
  }
  .content {
    display: flex;
    align-items: center;
    margin-top: 15px;
    height: 44px;
    color: @fontColor1;

    .songInfo {
      flex: 1;
      display: flex;
      align-items: center;
      .img {
        height: 44px;
        margin-right: 5px;
        .el-image {
          width: 44px;
          height: 44px;
          border-radius: 2px;
        }
      }
      .songTitle {
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 14px;
        padding: 5px;
        box-sizing: border-box;
        .author {
          width: 100px;
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span {
            padding: 0 2px;
            white-space: nowrap;
          }
        }
        .name {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .active {
    color: @color !important;
  }
  .content:hover {
    cursor: pointer;
    background-color: rgba(218, 217, 217, 0.2);
  }

  .el-scrollbar {
    height: calc(89vh);
  }
}
</style>
