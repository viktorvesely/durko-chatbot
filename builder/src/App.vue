<template>
  <v-app id="root">
    <v-container fill-width fluid ma-0 pa-0>
      <v-row dense no-gutters>
        <v-col lg="8" dense>
          <v-row dense no-gutters>
            <Search class="Search"></Search>
          </v-row>
          <v-row dense>
            <Answer ref="Answer"></Answer>
          </v-row>
        </v-col>
        <v-col lg="4" dense>
          <b-bar v-on:addResponse="addResponse"></b-bar>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import Search from "./components/Search.vue"
import Builder from "./components/BuilderBar.vue"
import Answer from "./components/Answer.vue"


export default {
  name: 'App',

  components: {
    "Search": Search,
    "b-bar": Builder,
    "Answer": Answer 
  },

  data: () => ({

  }),
  methods: {
    addResponse(type) {
      this.$refs.Answer.addResponse(type);
    }
  }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Montserrat&display=swap');

* {
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

h3 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 22px;
}

p {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
}

body {
  margin: 0;
}


</style>
