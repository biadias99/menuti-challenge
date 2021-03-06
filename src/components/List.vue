<template>
  <v-container class="pa-0">
    <div v-show="!isLoading">
      <v-card v-if="tasks.length > 0" flat>
        <v-progress-linear
          v-model="progress"
          color="deep-purple accent-4"
          class="mb-6 mt-6"
        />

        <template v-for="(task, i) in tasks">
          <v-list-item :key="`${i}-${task.name}`" class="pl-0">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="task.done && 'deep-purple accent-4' || 'black'"
                @click="update(task.id, task.done)"
              >
                <template v-slot:label>
                  <span
                    :class="task.done && 'grey--text text-decoration-line-through' || 'black--text'"
                    class="ml-2 text-h6 font-weight-light"
                  >
                  {{ task.name }}
                  </span>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer />

            <v-list-item-action>
              <v-btn
                icon
                :key="`btn-${i}`"
                @click="callUpdatePage(task.id, task.name)"
              >
                <v-icon color="#2c3e50">mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn
                icon
                :key="`btn-${i}`"
                @click="deleteTaskId(task.id)"
              >
                <v-icon color="#2c3e50">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>

      </v-card>

      <v-alert
        v-else
        type="info"
        text
        border="left"
      >
        Nenhuma atividade localizada.
      </v-alert>
    </div>
    <loading />
  </v-container>
</template>

<script>
import CommonMixin from '../mixin/common';
import Loading from './Loading.vue';

export default {
  name: 'List',

  components: { Loading },

  mixins: [CommonMixin],

  computed: {
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
  },

  methods: {
    async update(id, status) {
      await this.updateTask({
        id, status,
      });
    },
    async deleteTaskId(id) {
      await this.deleteTask(id);
      await this.loadTasks();
    },
    callUpdatePage(id, name) {
      this.setTask(name);
      this.$router.push({
        name: 'Tasks',
        params: {
          title: 'Editar atividade',
          isEdit: true,
          taskId: id,
        },
      });
    },
  },

  async created() {
    await this.loadTasks();
    await this.resetTask();
  },
};
</script>
