<template>
  <div class="songList">
    <div class="header">
      <div>歌曲</div>
      <div>歌手</div>
      <div>专辑</div>
      <div>时长</div>
    </div>
    <div>
      <template v-for="song in songs.slice(0, pageSize * page)" :key="song.id">
        <song-list-item :song="song" />
      </template>
    </div>
    <div v-if="songs.length > pageSize && !noMore" class="more">
      <el-button type="text" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { songInfo } from "@/server/recommend/type";
import SongListItem from "@/components/common/SongListItem.vue";
import { computed, ref } from "vue";

const props = defineProps<{
  songs: songInfo[];
}>();

const pageSize = ref(10);
const page = ref(1);

const noMore = computed(() => {
  return page.value - props.songs.length / pageSize.value >= 0;
});

const loadMore = () => {
  page.value = page.value + 1;
};
</script>
<style lang="less" scoped>
.songList {
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      flex: 4;
      color: @fontColor2;
      display: flex;
      align-items: center;
    }
    div:first-child {
      flex: 6;
      justify-content: flex-start;
    }
    div:last-child {
      flex: 1;
    }
  }
  .more {
    text-align: center;
    padding: 20px 0;
    box-sizing: border-box;
  }
}
</style>
