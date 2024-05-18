export default {
  createTask({ commit }, task) {
    commit('addTask', task);
  },
  toggleTaskCompleted({ commit }, taskId) {
    commit('toggleTaskCompleted', taskId);
  },
  toggleTaskImportant({ commit }, taskId) {
    commit('toggleTaskImportant', taskId);
  },
  deleteTask({ commit }, { category, taskId }) {
    commit('deleteTask', { category, taskId });
  },
};
