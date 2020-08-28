<template>
  <v-app>
    <navbar />

    <v-main>
      <router-view />

      <v-snackbar
        v-model="snackbar"
        right
        top
        timeout="2000"
        color="cyan darken-2"
        rounded="pill"
        content-class="text-center"
      >
        {{ message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import CommonMixin from './mixin/common';

export default {
  name: 'App',

  components: { Navbar },

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
