<template>
  <v-container style="max-width: 600px;" class="mt-3 pa-6">
    <v-row align="center">
      <span class="text-h4 font-weight-bold">
        To-Do List
      </span>

      <v-spacer />

      <v-btn
        class="ma-2"
        fab
        color="deep-purple accent-4"
        to="/tasks"
        dark
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <list />

    <v-snackbar
      v-model="snackbar"
      multi-line
      timeout="2000"
      color="deep-purple accent-4"
      rounded="pill"
      content-class="text-center"
    >
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import CommonMixin from '../mixin/common';
import List from '../components/List.vue';

export default {
  name: 'Home',

  components: {
    List,
  },

  mixins: [CommonMixin],

  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(value) {
        this.setSnackbar(value);
      },
    },
  },
};
</script>
