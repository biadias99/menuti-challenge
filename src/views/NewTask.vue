<template>
  <v-container style="max-width: 500px" class="mt-6">
    <v-row align="center">
      <v-btn
        color="deep-purple accent-4"
        to="/"
        icon
        x-large
      >
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>

      <span class="text-h3 font-weight-medium ml-4">
        Nova tarefa
      </span>
    </v-row>

    <v-text-field
      v-model="task"
      placeholder="Digite uma atividade"
      @keydown.enter="create"
      clearable
      outlined
      rounded
      color="deep-purple accent-4"
      class="textField mt-10"
      height="60px"
    />

    <v-row justify="end">
      <v-btn
        class="mt-6"
        color="deep-purple accent-4"
        x-large
        rounded
        dark
        @click="create"
      >
        Ok
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CommonMixin from '../mixin/common';

export default {
  name: 'NewTask',

  mixins: [CommonMixin],

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
    async create() {
      if (this.task) {
        await this.createTask({
          done: false,
          name: this.task,
          created_at: new Date().toLocaleString(),
        });
      }
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.textField {
  font-size: 20px;
}
</style>
