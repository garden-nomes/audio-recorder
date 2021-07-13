import { createApp } from "vue";
import App from "./App.vue";
import Api from "./lib/api";
import "./style.css";

const app = createApp(App);

// make our API instance available via provide/inject API
app.provide("api", new Api());

app.mount("#app");
