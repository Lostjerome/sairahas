import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import sairahas from "./utils/sairahas";

const app = createApp(App);
app.provide("sairahas", sairahas);
app.mount("#app");
