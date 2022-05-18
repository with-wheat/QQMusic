<template>
  <div class="page-search">
    <el-popover placement="bottom" :width="220" trigger="click">
      <template #reference>
        <el-input
          v-model="searchKeyword"
          class="w-50 m-2"
          size="default"
          with
          :prefix-icon="Search"
          placeholder="搜索音乐、MV、歌单"
          clearable
          @focus="showSearchView == true"
          @focusout="showSearchView == false"
          @input="searchChange"
          @clear="setSearchView()"
        />
        />
      </template>
      <template #default>
        <el-scrollbar>
          <div v-if="showSearchView" class="topSearch">
            <span>热门搜索</span>
            <ul
              v-for="(item, index) in searchTopInfo"
              :key="item.searchWord"
              @click="searchClick(item)"
            >
              <li>
                <span>{{ index + 1 }}</span>
                <span>{{ item.searchWord }}</span>
              </li>
              <li class="score">{{ item.score }}</li>
            </ul>
          </div>
          <template v-else>
            <SearchInfo />
          </template>
        </el-scrollbar>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Search } from "@icon-park/vue-next";
import { searchTop } from "@/server/search";
import type { searchTopTyp } from "@/server/search/types";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import SearchInfo from "./searchInfo.vue";

const searchTopInfo = ref<searchTopTyp[]>([]);
const { showSearchView, searchKeyword } = storeToRefs(useSearchStore());
const { getSearchInfo, setSearchView } = useSearchStore();
onMounted(async () => {
  searchTopInfo.value = await searchTop();
});

const searchClick = (info: searchTopTyp) => {
  searchKeyword.value = info.searchWord;
  getSearchInfo();
  setSearchView();
};
const searchChange = (info: string) => {
  if (info !== "") {
    searchKeyword.value = info;
    getSearchInfo();
  }
  setSearchView();
};
</script>

<style scoped lang="less">
.page-search {
  padding: 10px;
  box-sizing: border-box;
}
.topSearch {
  font-size: 14px;
  height: 290px;
  padding: 10px;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      width: 100%;
      margin-top: 10px;
      cursor: pointer;
      span:last-child {
        margin: 0 5px;
      }
    }
    li:first-child:hover {
      color: @color;
    }
    .score {
      text-align: right;
      color: @fontColor;
    }
  }
}
.el-popover {
  height: 200px;
}
.el-input--large {
  width: 200px !important;
}
</style>
