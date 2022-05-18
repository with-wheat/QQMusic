<template>
  <div class="PlayList">
    <header>
      <div class="img">
        <el-image :src="playlist?.coverImgUrl" fit="contain" />
      </div>
      <div class="playInfo">
        <div class="title">
          <h1>{{ playlist?.name }}</h1>
        </div>
        <div class="author">
          <div class="name">
            <el-avatar :src="playlist?.creator?.avatarUrl" />
            <span>{{ playlist?.creator?.nickname }}</span>
          </div>
          <div class="tag">
            <span v-for="item in playlist?.tags" :key="item">#{{ item }}</span>
          </div>
        </div>
        <div class="info">{{ playlist?.description }}</div>
        <div class="btn">
          <el-button type="primary" color="#34d399" @click="AllSong">全部播放</el-button>
          <el-button color="#34d399" plain>收藏</el-button>
        </div>
      </div>
    </header>
    <div class="content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane :label="'歌曲 ' + privileges?.length" name="first">
          <SongList :songs="privileges" />
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <h2>评论</h2>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPlayList, getPlaySongList } from "@/server/discover";
import { ref } from "vue";
import SongList from "./SongList.vue";
import { useRoute } from "vue-router";
import { playMusicControl } from "@/store/playMusicControl";
import type { playlistType } from "@/server/discover/type";
import type { songInfo } from "@/server/recommend/type";
const playListId: number = useRoute().query && parseInt(useRoute().query.playListId + "");
const playlist = ref<playlistType>();
const privileges = ref<songInfo[]>([]);
const activeName = ref("first");

const playStore = playMusicControl();

getPlayList(playListId).then((res) => {
  playlist.value = res.playlist;
  getPlaySongList(res.playlist.id).then((t) => (privileges.value = t));
});
/**
 * 播放全部
 */
const AllSong = () => {
  playStore.setAllPlayMusic(privileges.value);
};
</script>

<style scoped lang="less">
.PlayList {
  margin-top: 20px;
  header {
    height: 230px;
    display: flex;
    .img {
      width: 180px;
      margin-right: 50px;
      .el-image {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
    }
    .playInfo {
      flex: 1;
      color: @fontColor1;
      span {
        color: @fontColor2;
        font-size: 12px;
      }
      .author {
        display: flex;
        justify-content: start;
        align-items: center;
        .name {
          display: flex;
          align-items: center;
          .el-avatar {
            width: 24px;
            height: 24px;
          }
          span:last-child {
            margin-left: 5px;
          }
        }
        .tag {
          margin-left: 20px;
          display: flex;
          align-items: center;
          span {
            margin-left: 10px;
          }
        }
      }
      .info {
        font-size: 12px;
        color: @fontColor1;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .btn {
        margin-top: 25px;
        .el-button {
          width: 140px;
          height: 35px;
          border-radius: 20px;
        }
      }
    }
  }
}
/deep/.el-tabs__item.is-active {
  color: @color !important;
}
/deep/.el-tabs__item:hover {
  color: @color !important;
}
/deep/.el-tabs__active-bar {
  background-color: @color !important;
}
</style>
