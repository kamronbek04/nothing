import { createRouter, createWebHistory } from 'vue-router';
import Completed from './components/Completed.vue';
import AddNote from './components/AddNote.vue';
// import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AddNote,
      children: [
        {
          path: 'completed',
          name: 'Completed',
          component: Completed,
        },
        // {
        //   path: 'another',
        //   name: 'AnotherPage',
        //   component: AnotherPage,
        // },
      ],
    },
  ],
});

export default router;
