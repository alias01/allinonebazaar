<template>
  <div>
    <n-button>naive-ui</n-button>
    <HomeBanner></HomeBanner>
    <ProductsCarousel></ProductsCarousel>
    <n-message-provider>
      <UserLogin></UserLogin>
    </n-message-provider>
  </div>
</template>

<script setup>
import { NButton, NMessageProvider } from "naive-ui";
import HomeBanner from "../components/HomeBanner.vue";
import ProductsCarousel from "../components/ProductsCarousel.vue";
import UserLogin from "../components/UserLogin.vue";
</script>

<style scoped></style>
