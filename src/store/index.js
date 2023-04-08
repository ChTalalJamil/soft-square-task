import { createStore } from 'vuex'

// initial state
const state = {
  activities: []
}

// mutations
const mutations = {
  addActivity(state, activity) {
    state.activities.push(activity)
  },
  updateActivity(state, activity) {
    const index = state.activities.findIndex(a => a.id === activity.id)
    if (index !== -1) {
      state.activities.splice(index, 1, activity)
    }
  },
  deleteActivity(state, id) {
    const index = state.activities.findIndex(a => a.id === id)
    if (index !== -1) {
      state.activities.splice(index, 1)
    }
  },
  setActivities(state, activities) {
    state.activities = activities
  },
  toggleCompleted(state, id) {
    const activity = state.activities.find(a => a.id === id)
    if (activity) {
      activity.completed = !activity.completed
    }
  },
}

// actions
const actions = {
  async addActivity({ commit }, activity) {
    // simulate async API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // generate a unique ID for the new activity
    const id = Date.now().toString()
    const newActivity = { ...activity, id }
    // add the activity to the state
    commit('addActivity', newActivity)
    // save the state to local storage
    localStorage.setItem('activities', JSON.stringify(state.activities))
    return newActivity
  },
  async updateActivity({ commit }, activity) {
    // simulate async API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // update the activity in the state
    commit('updateActivity', activity)
    // save the state to local storage
    localStorage.setItem('activities', JSON.stringify(state.activities))
    return activity
  },
  async deleteActivity({ commit }, id) {
    // simulate async API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // delete the activity from the state
    commit('deleteActivity', id)
    // save the state to local storage
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },
  initializeActivities({ commit }) {
    // load activities from local storage if available
    const storedActivities = localStorage.getItem('activities')
    const activities = storedActivities ? JSON.parse(storedActivities) : []
    // set the activities in the state
    commit('setActivities', activities)
  }
}

// getters
const getters = {
  activities: state => state.activities,
  completedActivities: state => state.activities.filter(a => a.completed),
  incompleteActivities: state => state.activities.filter(a => !a.completed)
}

// create the store
const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store
