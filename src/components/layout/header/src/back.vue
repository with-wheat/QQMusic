<template>
  <div class="back">
    <Icon
      :icon="ArrowLeft"
      size="18"
      @click="
        () => {
          router.go(-1);
        }
      "
    />
    <Icon
      :icon="ArrowRight"
      size="18"
      @click="
        () => {
          router.go(1);
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from "@icon-park/vue-next";
import Icon from "@/components/icon/index";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="less">
.back {
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  span:hover {
    color: @color;
  }
}
</style>
