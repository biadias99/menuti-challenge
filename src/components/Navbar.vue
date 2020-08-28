<template>
  <v-app-bar
      app
      color="deep-purple accent-4"
      dark
      flat
    >
      <v-toolbar-title>
        <router-link
          to="/"
        >
          <v-img src="@/assets/menuti.png" height="40px" max-width="100px" contain>
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
          </v-img>
        </router-link>
      </v-toolbar-title>
    </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>
