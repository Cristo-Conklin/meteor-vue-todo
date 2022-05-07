<template>
  <div class="app">
    <header>
      <div class="app-bar">
        <div class="app-header">
          <h1>📝️ To Do List <span v-if="incompleteCount > 0">({{ incompleteCount }})</span></h1>

        </div>
      </div>
    </header>
    <div class="main">
      <template v-if="currentUser">
        <div class="user" v-on:click="logout">
          {{ currentUser.username }} 🚪
        </div>
        <TaskForm class="task-form" />
        <div class="filter">
          <button @click="toggleHideCompleted" v-if="incompleteCount > 0">
            <span v-if="hideCompleted">Show All</span>
            <span v-else>Hide Completed Tasks</span>
          </button>
        </div>

        <div class="loading" v-if="!$subReady.tasks">Loading...</div>

        <ul class="tasks">
          <Task class="task" v-for="task in tasks" :key="task._id.toString()" v-bind:task="task" />
        </ul>
      </template>
      <template v-else>
        <LoginForm />
      </template>
    </div>
  </div>
</template>

<script>
import Task from "./components/Task.vue";
import { Tasks } from "/imports/api/collections/Tasks"
import TaskForm from "./components/TaskForm.vue";
import LoginForm from "./components/LoginForm.vue";

export default {
  components: {
    Task,
    TaskForm,
    LoginForm
  },
  data() {
    const logout = () => Meteor.logout()

    return { hideCompleted: false };
  },
  methods: {
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    logout() {
      Meteor.logout();
    }
  },
  meteor: {
    $subscribe: {
      'tasks': []
    },
    tasks() {
      if (!this.currentUser || this.currentUser == undefined) {
        return [];
      }

      const hideCompletedFilter = { isChecked: { $ne: true } };

      const userFilter = this.currentUser ? { userId: this.currentUser._id } : {};

      const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

      return Tasks.find(
        this.hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
    },
    incompleteCount() {
      if (!this.currentUser || this.currentUser == undefined) {
        return [];
      }

      return Tasks.find({ isChecked: { $ne: true }, userId: this.currentUser._id }).count();
    },
    currentUser() {
      console.log("m user", Meteor.user());
      return Meteor.user();
    }
  }
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 10px;
}
</style>
