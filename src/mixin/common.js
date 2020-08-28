import { mapActions, mapGetters } from 'vuex';

export default {
  computed: mapGetters([
    'task',
    'tasks',
    'message',
    'snackbar',
    'isLoading',
  ]),

  methods: {
    ...mapActions([
      'loadTasks',
      'createTask',
      'updateTask',
      'setTask',
      'setSnackbar',
      'resetTask',
    ]),
  },
};
