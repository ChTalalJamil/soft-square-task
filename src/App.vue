<template>
  <div>
    <h1>Activities</h1>
    <form @submit.prevent="addActivity">
      <input type="text" v-model="newActivity" placeholder="Add new activity" />
      <button type="submit">Add</button>
    </form>
    <div v-if="activities.length === 0">No activities yet.</div>
    <ul>
      <li v-for="(activity, index) in activities" :key="index">
        <span :class="{ completed: activity.completed }">{{
          activity.title
        }}</span>
        <button @click="deleteActivity(index)">Delete</button>
        <button @click="toggleCompleted(index)">
          {{
            activity.completed ? "not completed" : "completed"
          }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      newActivity: "",
    };
  },
  computed: {
    activities() {
      return this.$store.state.activities;
    },
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() === "") {
        return;
      }
      this.$store.dispatch("addActivity", {
        title: this.newActivity,
        completed: false,
      });
      this.newActivity = "";
    },
    deleteActivity(index) {
      const id = this.activities[index].id;
      this.$store.dispatch("deleteActivity", id);
    },
    toggleCompleted(index) {
      const id = this.activities[index].id;
      this.$store.commit("toggleCompleted", id);
    },
  },
  mounted() {
    this.$store.dispatch("initializeActivities");
  },
};
</script>
