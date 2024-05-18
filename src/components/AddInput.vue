<template>
  <div class="note">
    <div v-if="showAlert" class="alert__animation">
      <Alert key="alert" :message="alertMessage" />
    </div>

    <div class="note__inner">
      <span class="plus-icon"><i class="fa-solid fa-plus"></i></span>
      <input
        v-model="userInput"
        @keyup.space="checkInput"
        @keyup.enter="submitTask"
        ref="inputField"
        placeholder="Add To Do..."
        class="note__input"
      />
      <div class="note__inner__dropdown">
        <span @click="toggleDropdown" class="calendar-icon">
          <p>{{ selectedDate }}</p>

          <i class="fa-regular fa-calendar-days"></i>
        </span>

        <transition>
          <ul v-if="isDropdownOpen" class="dropdown__options">
            <li
              @click="changeSelectedDate(taskCategory.category)"
              v-for="taskCategory in categorizationRules"
              :key="taskCategory"
            >
              <p class="option__name">{{ taskCategory.category }}</p>

              <p class="option__weekday">
                {{ formatWeekday(taskCategory.taskDate) }}
              </p>
            </li>
            <li
              @click="deleteSelectedDate"
              class="option__delete"
              v-if="selectedDate"
            >
              <span>
                <i class="fa-regular fa-trash-can"></i>
              </span>
              <p>Delete selected date</p>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Alert from './Alert.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    Alert,
  },
  data() {
    return {
      userInput: '',
      currentDate: new Date(),
      // tasks: {
      //   today: [],
      //   tomorrow: [],
      //   yesterday: [],
      //   other: [],
      // },
      pendingTask: null,
      isDropdownOpen: false,
      selectedDate: null,
      showAlert: false,
      alertMessage: 'Please enter value to submit that TODO task',
    };
  },
  computed: {
    categorizationRules() {
      return [
        {
          keyword: 'today',
          category: 'today',
          taskDate: this.formatDate(this.currentDate),
        },
        {
          keyword: 'tomorrow',
          category: 'tomorrow',
          taskDate: this.formatDate(this.getTomorrowDate()),
        },
        {
          keyword: 'yesterday',
          category: 'yesterday',
          taskDate: this.formatDate(this.getYesterdayDate()),
        },
      ];
    },
  },
  methods: {
    ...mapActions(['createTask']),
    checkInput() {
      const words = this.userInput.toLowerCase().split(' ');
      let categorized = false;

      words.forEach((word) => {
        this.categorizationRules.forEach((rule) => {
          if (this.selectedDate) {
            word = this.selectedDate;
          }
          if (word === rule.keyword) {
            this.pendingTask = {
              category: rule.category,
              task: this.userInput,
              taskDate: rule.taskDate || null,
              id: this.$uuidv4(),
              completed: false,
              isHover: false,
              oldTask: false,
              isImportant: false,
            };
            categorized = true;
          }
        });
      });
      if (!categorized) {
        this.pendingTask = {
          category: 'other',
          task: this.userInput,
          taskDate: null,
          id: this.$uuidv4(),
          isCompleted: false,
          isHover: false,
          isImportant: false,
        };
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    changeSelectedDate(selected) {
      this.selectedDate = selected;
      this.isDropdownOpen = false;

      if (this.selectedDate !== null) {
        this.$refs.inputField.focus();
      }
    },
    deleteSelectedDate() {
      this.selectedDate = null;
      this.isDropdownOpen = false;
    },
    submitTask() {
      this.checkInput();
      if (this.userInput.length == 0) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      } else if (this.pendingTask) {
        this.tasks[this.pendingTask.category].push(this.pendingTask);
        this.userInput = '';
        this.pendingTask = null;
        this.selectedDate = null;
      }
      // this.$emit('tasks', this.tasks);
    },

    formatDate(currentDate) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${month}-${day}-${year}`;
    },
    formatWeekday(date) {
      const weekday = new Date(date);
      return weekday.toLocaleDateString('default', { weekday: 'short' });
    },
    getTomorrowDate() {
      const tomorrow = new Date(this.currentDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    },
    getYesterdayDate() {
      const yesterday = new Date(this.currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    },
    // When we click other thing then dropdown it will be closed
    closeDropdownOnClickOutside(event) {
      if (
        this.isDropdownOpen &&
        !this.$el.contains(event.target) &&
        !document.querySelector('.calendar-icon').contains(event.target)
      ) {
        this.isDropdownOpen = false;
      }
    },
  },
  created() {
    document.addEventListener('click', this.closeDropdownOnClickOutside);
  },
};
</script>
<style scoped>
.note {
  position: sticky;
  top: 0;
  width: 100%;
  /* z-index: 3; */
}
.note__inner {
  position: relative;
  display: inline-block;
  width: 100%;
}
.note__input {
  padding: 20px 150px 20px 50px;
  border-radius: 20px;
  border: 1px solid var(--border-blue);
  background-color: var(--bright-blue);
  font-size: 18px;
  width: 100%;
}
.note__inner .plus-icon,
.note__inner .calendar-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  font-size: 20px;
}
.note__inner .plus-icon {
  left: 10px;
}
.note__inner .calendar-icon {
  right: 10px;
}
.calendar-icon p {
  text-transform: capitalize;
  margin-right: 10px;
  font-size: 16px;
}
.dropdown__options {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--white);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-top: none;
  border-radius: 10px;
  width: 18%;
}

.dropdown__options li {
  list-style: none;
  padding: 12px 16px;
  cursor: pointer;
  text-transform: capitalize;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dropdown__options li:hover {
  background-color: #f5f5f5;
  transition: all 0.3s linear;
}
.option__weekday {
  font-size: 14px;
  opacity: 0.9;
}
.option__delete {
  display: flex;
  align-items: center;
  justify-content: center !important;
  gap: 10px;
  border-top: 1px solid var(--bright-blue);
  text-transform: none !important;
}
.option__delete p,
.option__delete span i {
  color: var(--red);
}
/* Animation */
.v-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.v-enter-active {
  transition: all 0.3s ease-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-active {
  transition: all 0.2s ease-in;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
/* Animation */
.alert-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
/* .alert__animation {
  z-index: 9999;
  opacity: 0;
  transition: opacity 1s;
  animation: fadeIn 1s forwards;
}
@keyframes fadeIn {
  to {
    opacity: 0.7;
  }
} */
</style>
