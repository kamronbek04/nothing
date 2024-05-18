import { createStore } from 'vuex';
import notesModule from './notes';

const store = createStore({
  modules: {
    notes: notesModule,
  },
  // state() {
  //   return {
  //     userId: 'c3',
  //   };
  // },
  // getters: {
  //   userId(state) {
  //     return state.userId;
  //   },
  // },
});
export default store;
