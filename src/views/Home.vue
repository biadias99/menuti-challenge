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
                @click="update(task.id, task.done)"
              >
                <template v-slot:label>
                  <div
                    :class="task.done && 'grey--text text-decoration-line-through' || 'black--text'"
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

    <v-alert
    v-else
    type="info"
    text
    border="left"
    >
      Nenhuma atividade localizada.
    </v-alert>

    <v-snackbar
      v-model="snackbar_add"
      multi-line
      timeout="2000"
    >
      Erro ao adicionar atividade.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar_add = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'Home',
  data: () => ({
    item: 1,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
    tasks: [],
    task: null,
    db: firebase.firestore(),
    snackbar_add: false,
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
    async create() {
      if (this.task) {
        try {
          await this.db.collection('tasks').add({
            done: false,
            name: this.task,
            created_at: new Date().toLocaleString(),
          });
        } catch (error) {
          this.snackbar_add = true;
        }
      }
      this.task = null;
      this.getActivities();
    },
    getActivities() {
      this.db.collection('tasks').orderBy('created_at', 'asc').get()
        .then((response) => {
          this.tasks = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
    },
    async update(id, status) {
      await this.db.collection('tasks').doc(id).update({
        done: status,
      });
    },
  },

  created() {
    this.getActivities();
  },
};
</script>
