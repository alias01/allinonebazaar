import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "../router/router";
import "./style.css";
import naive from "naive-ui";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(naive);
app.use(router);
app.use(pinia);
app.mount("#app");
