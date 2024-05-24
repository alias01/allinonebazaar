<template>
  <div class="products-carousel">
    <div class="card-container">
      <div v-for="i in 10">
        <n-card :key="i" title="Card with Cover">
          <template #cover>
            <img
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
          </template>
          Card Content
        </n-card>
      </div>
    </div>
    <button type="button" class="custom-arrow--left" @click="prev">
      <n-icon><ArrowBack /></n-icon>
    </button>
    <button type="button" class="custom-arrow--right" @click="next">
      <n-icon><ArrowForward /></n-icon>
    </button>
  </div>
</template>

<script setup>
import { NCard, NIcon } from "naive-ui";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
</script>

<style scoped>
.n-card {
  width: 300px;
  margin-left: 10px;
  margin-right: 10px;
}

.products-carousel {
  overflow: hidden;
  position: relative;
}

.card-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.custom-arrow--left {
  position: absolute;
  top: 50%;
  left: 0;
}

.custom-arrow--right {
  position: absolute;
  top: 50%;
  right: 0;
}
</style>
