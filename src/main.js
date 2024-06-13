import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Tambahkan impor ini

const app = createApp(App);

app.use(router);
app.use(store); // Tambahkan ini
app.mount('#app');
