import { createApp } from "vue";
import router from "./router";

import { createPinia } from "pinia";
import App from "@/App.vue";

import "./assets/css/index.less";
import "element-plus/es/components/message/style/css";

const app = createApp(App);

const pinia = createPinia();

app.use(router);

app.use(pinia);
app.mount("#app");
