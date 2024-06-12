<template>
  <div>
    <n-button>naive-ui</n-button>
    <HomeBanner></HomeBanner>
    <ProductsCarousel></ProductsCarousel>
    <UserLogin></UserLogin>
  </div>
</template>

<script setup>
import { NButton } from "naive-ui";
import HomeBanner from "../components/HomeBanner.vue";
import ProductsCarousel from "../components/ProductsCarousel.vue";
import UserLogin from "../components/UserLogin.vue";
</script>

<style scoped></style>
