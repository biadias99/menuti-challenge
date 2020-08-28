<template>
  <v-container style="max-width: 700px;" class="mt-3 pa-6">
    <v-row align="center">
      <span class="text-h4 font-weight-bold">
        To-Do List
      </span>

      <v-spacer />

      <v-btn
        class="ma-2"
        fab
        color="deep-purple accent-4"
        @click="callCreatePage()"
        dark
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <list />
  </v-container>
</template>

<script>
import List from '../components/List.vue';

export default {
  name: 'Home',

  components: {
    List,
  },

  methods: {
    callCreatePage() {
      this.$router.push({
        name: 'Tasks',
        params: {
          title: 'Adicionar atividade',
        },
      });
    },
  },
};
</script>
