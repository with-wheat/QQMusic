<template>
  <h2>热门推荐 ></h2>
  <div class="playList">
    <div v-for="item in PersonaInfo" :key="item.id" class="item">
      <div class="img">
        <div class="count">
          <el-image :src="item.picUrl" fit="cover" />
          <div class="playCount">
            <IconPart stroke-linejoin="round" :icon="Headset" size="12" theme="outline" />
            {{ item.playCount }}
          </div>
        </div>
        <div class="bgc">
          <IconPart :icon="PlayOne" size="50" />
        </div>
      </div>
      <div class="text">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Personalized } from "@/server/discover/index";
import { playListTypes } from "@/server/discover/type.d";
import IconPart from "@/components/icon";
import { PlayOne, Headset } from "@icon-park/vue-next";
const PersonaInfo = ref<playListTypes[]>();
onMounted(async () => {
  PersonaInfo.value = await Personalized(10);
});
</script>

<style scoped lang="less">
h2 {
  margin-bottom: 10px;
}
.playList {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 20px;
  .item {
    cursor: pointer;
    .img {
      position: relative;
      display: flex;
      justify-content: center;
      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .el-image {
          width: 100%;
          border-radius: 5px;
        }
        .playCount {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 5px;
          right: 15px;
          color: white;
          background-color: rgba(15, 5, 5, 0.5);
          border-radius: 20px;
          padding: 0 5px;
          box-sizing: border-box;
          span {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-right: 2px;
          }
        }
        .playCount:hover {
          display: none;
          transform: translateY(5px);
        }
      }
      .bgc {
        width: 100%;
        height: 100%;
        background-color: rgba(2, 2, 2, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 5px;
        border-radius: 5px;
        box-sizing: border-box;
        opacity: 0;
        span:hover {
          color: @color;
        }
      }
      .bgc:hover {
        opacity: 1;
      }
    }
    .text {
      font-size: 13px;
      color: @fontColor1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 5px;
    }
  }
}
</style>
<style scoped>
@media only screen and (max-width: 1400px) {
  .playList {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
@media only screen and (max-width: 970px) {
  .playList {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
