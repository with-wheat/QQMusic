<template>
  <div class="recomSong">
    <div class="title">
      <h2>推荐音乐 ></h2>
    </div>
    <div class="content">
      <div v-for="item in newSong" :key="item.id" class="count" @click="newSongClick(item)">
        <div class="img">
          <el-image :src="item.picUrl" fit="cover" />
        </div>
        <div class="text">
          <div class="name">{{ item.name }}</div>
          <div class="author">{{ item.song.artists[0].name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { playMusicControl } from "@/store/playMusicControl";
import { getNewSong } from "@/server/discover";
import type { newSongTypes } from "@/server/discover/type.d";
const newSong = ref<newSongTypes[]>();
const playStore = playMusicControl();
onMounted(async () => {
  newSong.value = await getNewSong(10);
});
// 点击播放
const newSongClick = (data: newSongTypes) => {
  playStore.setSongInfo(data.id);
};
</script>

<style scoped lang="less">
.recomSong {
  margin: 20px 0;
  .title {
    margin-bottom: 10px;
  }
}
.content {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  .count {
    height: 48px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    .img {
      width: 48px;
      .el-image {
        width: 100%;
        border-radius: 5px;
      }
    }
    .text {
      flex: 1;
      margin-left: 10px;
    }
  }
  .count:hover {
    background-color: rgba(218, 217, 217, 0.2);
  }
}
</style>
<style scoped>
@media only screen and (max-width: 1400px) {
  .content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media only screen and (max-width: 970px) {
  .content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
