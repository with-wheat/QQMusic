<template>
  <div v-for="(temp, index) in searchInfo.order" :key="index">
    <div class="topSearch">
      <span>{{ getTitle(temp) }}</span>
      <ul v-for="item in searchInfo.songs" :key="item.id">
        <li>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
const { searchInfo } = storeToRefs(useSearchStore());
const getTitle = (name: string) => {
  switch (name) {
    case "songs":
      return "单曲";
    case "albums":
      return "专辑";
    case "artists":
      return "歌手";
    case "playlists":
      return "歌单";
    default:
      return name;
  }
};
</script>

<style scoped lang="less">
.topSearch {
  font-size: 14px;
  ul {
    width: 100%;
    align-items: center;
    li {
      cursor: pointer;
    }
    li:hover {
      color: #34d399;
    }
    .score {
      text-align: right;
      color: #fca5a5;
    }
  }
}
</style>
