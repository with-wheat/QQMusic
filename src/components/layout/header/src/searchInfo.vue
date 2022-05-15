<template>
  <div v-for="(temp, index) in searchInfo.order" :key="index">
    <div class="topSearch">
      <span>{{ getTitle(temp) }}</span>
      <template v-if="temp == 'songs'">
        <div>
          <ul v-for="item in searchInfo.songs" :key="item.id">
            <li>
              <span style="color: #34d399">{{ item.name }} - </span>
              <span>{{ item.artists[0].name }}</span>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="temp == 'artists'">
        <div>
          <ul v-for="item in searchInfo.artists" :key="item.id">
            <li>
              <el-avatar size="small" :src="item.img1v1Url" />
              <span style="color: #34d399">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="temp == 'albums'">
        <div>
          <ul v-for="item in searchInfo.albums" :key="item.id">
            <li>
              <span style="color: #34d399">{{ item.name }} - </span>
              <span>{{ item.artist.name }}</span>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="temp == 'playlists'">
        <div>
          <ul v-for="item in searchInfo.playlists" :key="item.id">
            <li>
              <el-avatar size="small" :src="item.coverImgUrl" />
              <span style="color: #34d399">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </template>
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
  font-size: 12px;
  ul {
    width: 100%;
    align-items: center;
    margin: 10px 0;
    li {
      cursor: pointer;
      display: flex;
      align-items: center;
      span:last-child {
        margin-left: 5px;
      }
    }
    li:hover {
      color: @color;
    }

    .score {
      text-align: right;
      color: @fontColor;
    }
  }
}
</style>
