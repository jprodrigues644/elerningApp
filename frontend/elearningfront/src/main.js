import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './config/router'; // import the router configuration

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router); // Use the router
app.mount('#app');
