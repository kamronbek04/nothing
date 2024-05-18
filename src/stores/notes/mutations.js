export default {
  addTask(state, task) {
    state.tasks[task.category].push(task);
  },
  toggleCompleted(state, taskId) {
    const task = state.tasks[task.category].find((t) => t.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  },
  toggleImportant(state, taskId) {
    const task = state.tasks[task.category].find((t) => t.id === taskId);
    if (task) {
      task.isImportant = !task.isImportant;
    }
  },
  deleteTask(state, { category, taskId }) {
    state.tasks[category] = state.tasks[category].filter(
      (t) => t.id !== taskId
    );
  },
};
