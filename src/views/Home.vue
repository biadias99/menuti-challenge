<template>
  <v-container style="max-width: 500px">
    <v-text-field
      v-model="task"
      label="Digite uma tarefa..."
      solo
      @keydown.enter="create"
      rounded
      clearable
      outlined
      flat
    >
      <v-fade-transition v-slot:append>
        <v-icon
          v-if="task"
          @click="create"
        >
          add_circle
        </v-icon>
      </v-fade-transition>
    </v-text-field>

    <h2 class="text-h4 font-weight-medium">
      To-Do List
    </h2>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0" flat>
      <v-slide-y-transition
        class="py-0"
        group
      >
        <template v-for="(task, i) in tasks">
          <v-list-item :key="`${i}-${task.name}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="task.done && 'grey' || 'black'"
              >
                <template v-slot:label>
                  <div
                    :class="task.done && 'grey--text' || 'black--text'"
                    class="ml-4"
                    v-text="task.name"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data: () => ({
    tasks: [{
      name: 'Example 1',
      done: false,
    }],
    task: null,
  }),

  computed: {
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
  },

  methods: {
    create() {
      if (this.task) {
        this.tasks.push({
          done: false,
          name: this.task,
        });

        this.task = null;
      }
    },
  },
};
</script>
