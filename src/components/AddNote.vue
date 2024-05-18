<template>
  <div class="note-list">
    <div class="container">
      <AddInput @tasks="updateTasks" />
      <TaskList :tasks="tasks" />
      <router-view />
    </div>
  </div>
</template>

<script>
import AddInput from './AddInput.vue';
import TaskList from './TaskList.vue';
export default {
  components: {
    AddInput,
    TaskList,
  },
  data() {
    return {
      tasks: {
        today: [],
        tomorrow: [],
        yesterday: [],
        other: [],
      },
    };
  },
  methods: {
    updateTasks(updatedTasks) {
      this.tasks = updatedTasks;
    },
  },
};
</script>

<style>
.note-list {
  background-color: #748ffc;
  width: 100%;
  border-top-left-radius: 10px;
  height: 100vh;
  overflow-y: scroll;
}
</style>
