<template>
  <el-scrollbar>
    <div v-for="(item, index) in menus" :key="index" class="menus">
      <span class="title">{{ item.name }}</span>
      <ul>
        <li
          v-for="temp in item.menus"
          :key="temp.key"
          class="menu-item"
          :class="currentKey == temp.key ? 'active' : null"
          @click="routerPush(temp)"
        >
          <IconPart :theme="temp.theme" :icon="temp.icon" size="18" />
          <span>{{ temp.name }}</span>
        </li>
      </ul>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useMenu } from "../menuConfig";
import IconPart from "@/components/icon/index";
const { menus, routerPush, currentKey } = useMenu();
</script>

<style lang="less" scoped>
.menus {
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;
  .title {
    font-size: 12px;
  }
  li {
    height: 38px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      padding: 0 3px;
    }
  }
  .menu-item {
    cursor: pointer;
  }
  .active {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
    --tw-gradient-from: #2dd4bf;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(45 212 191 / 0));
    --tw-gradient-to: #34d399;
    --tw-text-opacity: 1;
    color: rgb(248 250 252 / var(--tw-text-opacity));
    border-radius: 5px;
  }
}
</style>
