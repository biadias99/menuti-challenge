<template>
  <v-row align="center" justify="center">
      <v-card flat class="pa-1">
        <v-progress-circular
          color="deep-purple accent-4"
          indeterminate
          v-show="isLoading"
        ></v-progress-circular>
      </v-card>
  </v-row>
</template>

<script>
import CommonMixin from '../mixin/common';

export default {
  name: 'Loading',

  mixins: [CommonMixin],
};
</script>
