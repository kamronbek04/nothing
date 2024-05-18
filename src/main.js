import { createApp } from 'vue';
// import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';
// import TaskList from './components/TaskList.vue';
import { v4 as uuidv4 } from 'uuid';
import store from './stores/index.js';
import router from './router.js';

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: '/', name: 'all', component: TaskList },
//     // {
//     //   path: '/:category',
//     //   name: 'all',
//     //   component: TaskList,
//     //   props: true,
//     // },
//     {
//       path: '/today',
//       name: 'today',
//       component: TaskList,
//       props: { category: 'today' },
//     },
//     {
//       path: '/tomorrow',
//       name: 'tomorrow',
//       component: TaskList,
//       props: { category: 'tomorrow' },
//     },
//   ],
// });

const app = createApp(App);
app.config.globalProperties.$uuidv4 = uuidv4;
app.use(router);
app.use(store);
app.mount('#app');
