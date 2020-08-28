import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: '',
    task: null,
    tasks: [],
    snackbar: false,
    isLoading: true,
  },
  mutations: {
    LOAD_TASKS(state, payload) {
      state.tasks = payload.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    SET_TASK(state, payload) {
      state.task = payload;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_SNACKBAR(state, payload) {
      state.snackbar = payload;
    },
    RESET_TASK(state) {
      state.task = null;
    },
  },
  getters: {
    message: (state) => state.message,
    task: (state) => state.task,
    tasks: (state) => state.tasks,
    snackbar: (state) => state.snackbar,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async loadTasks({ commit }) {
      commit('SET_LOADING', true);
      firebase.firestore().collection('tasks').orderBy('created_at', 'asc').get()
        .then((response) => {
          commit('LOAD_TASKS', response.docs);
          commit('SET_LOADING', false);
        })
        .catch((error) => {
          commit('SET_MESSAGE', error);
          commit('SET_SNACKBAR', true);
        });
    },
    async createTask({ commit }, payload) {
      firebase.firestore().collection('tasks').add(payload)
        .then(() => {
          commit('RESET_TASK');
          commit('SET_MESSAGE', 'Atividade adicionada com sucesso.');
          commit('SET_SNACKBAR', true);
        })
        .catch((error) => {
          commit('SET_MESSAGE', error);
          commit('SET_SNACKBAR', true);
        });
    },
    async updateTask({ commit }, payload) {
      firebase.firestore().collection('tasks').doc(payload.id).update({
        done: payload.status,
      })
        .then(() => {})
        .catch((error) => {
          commit('SET_MESSAGE', error);
          commit('SET_SNACKBAR', true);
        });
    },
    async setTask({ commit }, payload) {
      commit('SET_TASK', payload);
    },
    async setSnackbar({ commit }, payload) {
      commit('SET_SNACKBAR', payload);
    },
    async resetTask({ commit }) {
      commit('RESET_TASK');
    },
  },
});
