import { createMemoryHistory, createRouter } from "vue-router";
import HomeContainer from "../src/views/HomeContainer.vue";

const routes = [{ path: "/", component: HomeContainer }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
