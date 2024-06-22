<template>
  <div>
    <HomeBanner></HomeBanner>
    <ProductsCarousel></ProductsCarousel>
    <n-message-provider>
      <UserLogin></UserLogin>
    </n-message-provider>
    <MainFooter></MainFooter>
  </div>
</template>

<script setup>
import { NMessageProvider } from "naive-ui";
import HomeBanner from "../components/HomeBanner.vue";
import ProductsCarousel from "../components/ProductsCarousel.vue";
import UserLogin from "../components/UserLogin.vue";
import MainFooter from "../components/MainFooter.vue";
</script>

<style scoped></style>
