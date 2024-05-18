<template>
  <div class="tasklist">
    <ul v-for="(taskList, category) in tasks" :key="category">
      <h2>{{ category }}</h2>

      <div
        v-for="task in taskList"
        :key="task.id"
        class="tasklist__wrapper"
        @mouseenter="task.isHovered = true"
        @mouseleave="task.isHovered = false"
      >
        <div class="tasklist__content">
          <button
            class="tasklist__content__btn"
            :class="{ completed: task.isCompleted }"
            @click="toggleCompleted(task)"
          >
            <span v-if="task.isHovered || task.isCompleted">
              <i class="fa-solid fa-check"></i>
            </span>
          </button>

          <li
            class="tasklist__item"
            :class="{ completed: task.isCompleted }"
            :key="task.id"
          >
            <p class="tasklist__item__text">
              {{ task.task }}
            </p>

            <div class="tasklist__item__date" v-if="formatComingDate(task)">
              <i
                :style="{ color: task.oldTask ? 'red' : '#495057' }"
                class="fa-regular fa-calendar"
              ></i>
              <p :style="{ color: task.oldTask ? 'red' : '#495057' }">
                {{ formatComingDate(task) }}
              </p>
            </div>
          </li>
        </div>

        <div class="tasklist__btn">
          <button
            class="tasklist__btn__delete"
            v-if="task.isHovered"
            @click="deleteTask(taskList, task)"
          >
            <i class="fa-regular fa-trash-can"></i>
          </button>
          <button
            class="tasklist__btn__important"
            @click="toggleImportant(task)"
            :class="{ fill: task.isImportant }"
            v-if="task.isHovered || task.isImportant"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#4c6ef5"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['tasks']),
  },
  // props: {
  //   // category: {
  //   //   type: String,
  //   //   required: false,
  //   // },
  //   tasks: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  // data() {
  //   return {
  //     // filteredTasks: this.tasks,
  //   };
  // },
  watch: {
    tasks: {
      handler(newTasks) {
        for (const taskCategory in newTasks) {
          newTasks[taskCategory].forEach((task) => {
            this.oldComingDate(task);
          });
        }
      },
      deep: true,
    },
    // category(value) {
    //   this.updateTasks(value);
    // },
  },
  methods: {
    ...mapActions(['toggleTaskCompleted', 'toggleTaskImportant', 'deleteTask']),
    // toggleCompleted(task) {
    //   task.isCompleted = !task.isCompleted;
    // },
    // toggleImportant(task) {
    //   task.isImportant = !task.isImportant;
    // },
    // deleteTask(taskList, task) {
    //   const index = taskList.findIndex((t) => t.id === task.id);
    //   console.log('id', task.id);
    //   if (index !== -1) {
    //     taskList.splice(index, 1);
    //   }
    // },

    toggleCompleted(task) {
      this.toggleTaskCompleted(task.id);
    },
    toggleImportant(task) {
      this.toggleTaskImportant(task.id);
    },
    deleteTask(category, taskId) {
      this.deleteTask({ category, taskId });
    },
    formatComingDate(task) {
      if (task.taskDate !== null) {
        let date = new Date(task.taskDate);
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'short' });
        let weekday = date.toLocaleDateString('default', { weekday: 'short' });
        return `${weekday}, ${month} ${day}`;
      }
    },
    oldComingDate(task) {
      let date1 = new Date(task.taskDate);
      let date2 = new Date();

      const day1 = date1.getDate();
      const month1 = date1.getMonth();
      const year1 = date1.getFullYear();

      const day2 = date2.getDate();
      const month2 = date2.getMonth();
      const year2 = date2.getFullYear();

      if (day1 >= day2 && month1 >= month2 && year1 >= year2) {
        task.oldTask = false;
      } else {
        task.oldTask = true;
      }
    },
    // updateTasks(value) {
    //   if (value && this.tasks[value]) {
    //     this.filteredTasks = {
    //       [value]: this.tasks[value],
    //     };
    //   } else {
    //     this.filteredTasks = this.tasks;
    //   }
    // },
  },
};
</script>

<style scoped>
.tasklist {
  width: 95%;
  margin: 0 auto;
}
.tasklist h2 {
  text-transform: capitalize;
  color: var(--white);
}
.tasklist ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tasklist__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 16px 8px;
  border-radius: 10px;
  background-color: var(--bright-blue);
  width: 100%;
}
/* .tasklist__wrapper:hover {
  opacity: 0.9;
} */
.tasklist__content {
  display: flex;
  gap: 10px;
}
.tasklist__content__btn {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid var(--border-blue);
  background-color: var(--white);
  cursor: pointer;
}
.tasklist__content__btn i {
  font-size: 12px;
}
/* Dynamic class */
.tasklist__content__btn.completed {
  background-color: var(--dark-blue);
}
.tasklist__content__btn.completed span i {
  color: var(--white);
}
.tasklist__item.completed .tasklist__item__text {
  color: #b5b5b5;
  text-decoration: line-through;
}
/* Dynamic class */
.tasklist__item {
  text-decoration: none;
  color: var(--default-color);

  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tasklist__item span {
  font-size: 12px;
}
.tasklist__item__date {
  display: flex;
  align-items: start;
  gap: 5px;
  font-size: 12px;
}
.tasklist__btn {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 20px;
}
.tasklist__btn__delete,
.tasklist__btn__important {
  background-color: inherit;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tasklist__btn__delete i {
  color: var(--red);
}
.tasklist__btn__important svg {
  width: 20px;
  height: 20px;
}
.tasklist__btn__important.fill svg {
  fill: var(--dark-blue);
  transition: 0.3s;
}
</style>
