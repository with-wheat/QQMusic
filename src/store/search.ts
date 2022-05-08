import { defineStore } from "pinia";
import type { SearchSuggest } from "../server/search/types";
import { searchInfo } from "../server/search/index";
export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      // 搜索
      showSearchView: true,
      searchKeyword: "",
      searchInfo: {} as SearchSuggest
    };
  },
  getters: {
    showHot: (state) => {
      return state.searchKeyword == "";
    }
  },
  actions: {
    async getSearchInfo() {
      this.searchInfo = await searchInfo(this.searchKeyword);
    }
  }
});
