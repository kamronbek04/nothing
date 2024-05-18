<template>
  <div class="wrapper">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>
<script>
import Sidebar from './components/Sidebar.vue';
export default {
  components: {
    Sidebar,
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
}
</style>
