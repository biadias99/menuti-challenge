<template>
  <v-container style="max-width: 600px" class="mt-4 pa-6">
    <v-row align="center">
      <v-btn
        color="deep-purple accent-4"
        to="/"
        icon
        x-large
      >
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>

      <span class="text-h4 font-weight-bold ml-4">
        {{ title }}
      </span>
    </v-row>

    <v-text-field
      v-model="task"
      placeholder="Digite uma atividade"
      @keydown.enter="createOrUpdate()"
      clearable
      outlined
      rounded
      color="deep-purple accent-4"
      class="text-h6 font-weight-regular mt-10"
      height="60px"
    />

    <v-row justify="end">
      <v-btn
        class="mt-6"
        color="deep-purple accent-4"
        x-large
        rounded
        dark
        @click="createOrUpdate()"
      >
        Ok
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CommonMixin from '../mixin/common';

export default {
  name: 'Task',

  mixins: [CommonMixin],

  props: {
    title: {
      type: String,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: String,
    },
  },

  computed: {
    task: {
      get() {
        return this.$store.state.task;
      },
      set(value) {
        this.setTask(value);
      },
    },
  },

  methods: {
    async createOrUpdate() {
      if (this.task ? this.task.trim() : this.task) {
        if (this.isEdit) {
          await this.updateText({
            name: this.task,
            id: this.taskId,
          });
          await this.loadTasks();
        } else {
          await this.createTask({
            done: false,
            name: this.task,
            created_at: new Date().toLocaleString('en-US'),
          });
        }
        this.$router.push('/');
      } else {
        this.setMessage('Por favor, digite uma atividade válida.');
        this.setSnackbar(true);
      }
    },
  },
};
</script>
