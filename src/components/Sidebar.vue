<template>
  <div class="sidebar">
    <ul class="sidebar__options">
      <li class="sidebar__item">
        <router-link to="/completed">
          <img src="../imgs/sun-icon.svg" />
          <p>Completed</p>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/calendar">
          <img src="../imgs/calendar-icon.svg" />
          <p>Calendar</p>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/">
          <img src="../imgs/all-icon.svg" />
          <p>All tasks</p>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/important">
          <img src="../imgs/star-icon.svg" />
          <p>Important</p>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/delete">
          <img src="../imgs/trash-icon.svg" />
          <p>Deleted tasks</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.sidebar {
  max-width: 250px;
  width: 100%;
  padding: 10px;
}
.sidebar__item {
  display: flex;
  padding: 20px 16px;
  width: 100%;
  border-radius: 5px;
}
.sidebar__item:hover {
  background-color: #f5f5f5;
  transition: all 0.3s linear;
}
.sidebar__item a {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--default-color);
}
.sidebar__item img {
  width: 20px;
  height: 20px;
}
</style>
