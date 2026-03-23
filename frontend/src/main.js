import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App);

app
.use(store)
.use(router)
.use(VueAwesomePaginate)
.mount('#app')
