<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <h3>Latest News about Covid-19 in the Philippines</h3>
    </v-row>
    <v-row align="center" justify="center" class="grey lighten-5" style="height: 300px;">
      <v-col v-for="article in newsData.articles" :key="article.title" cols="5">
        <v-card class="ma-3 pa-6" outlined tile>
          <v-img
            :src="article.urlToImage"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="article.title"></v-card-title>
          </v-img>
          <v-card-text class="text--primary">{{article.content}}</v-card-text>
          <v-card-actions>
            <v-btn color="orange" :href="article.url">Open Article</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//<img alt="Vue logo" src="../assets/anocovid.jpg" />

import News from "../assets/news";

export default {
  name: "Home",

  data() {
    return {
      newsData: News
    };
  }
};
</script>
