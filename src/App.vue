<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Covid 19 Philippines</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text rounded to="/">Home</v-btn>
      <v-btn text rounded to="/numbers">Numbers</v-btn>
    </v-app-bar>

    <v-content>
      <v-spacer></v-spacer>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>

<style>
</style>
