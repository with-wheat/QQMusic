<template>
  <div class="music">
    <h1>音乐馆</h1>
    <div class="content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="精选" name="jx"> 111 </el-tab-pane>
        <el-tab-pane label="有声电台" name="dj">
          <h2>有声电台</h2>
        </el-tab-pane>
        <el-tab-pane label="排行" name="sort">
          <h2>排行</h2>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="singer">
          <h2>歌手</h2>
        </el-tab-pane>
        <el-tab-pane label="分类歌单" name="types">
          <h2>分类歌单</h2>
        </el-tab-pane>
        <el-tab-pane label="数字专辑" name="number">
          <h2>数字专辑</h2>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeName = ref("jx");
</script>

<style scoped lang="less">
.music {
  padding: 20px 5px 0 5px;
  box-sizing: border-box;
  .content {
    margin-top: 10px;
  }
}
</style>
