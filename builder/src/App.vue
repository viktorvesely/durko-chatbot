<template>
  <v-app id="root">
    <v-container fluid class="pa-2 d-flex align-stretch" style="height:100%">
      <v-row>
        <v-col cols="8" class="pa-0">
          <v-row>
            <v-col>
              <Search></Search>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pt-0 pb-0">
              <v-carousel
                hide-delimiters
                :show-arrows="false"
                height="100%"
                light
                v-model="currentResponse"
              >
                <Answer v-for="(response, index) in responses" :index="index" :name="response" :breadCrumbs="generateName(index)" :isIntent="index === 0" :key="generateName(index)"></Answer>
              </v-carousel>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" class="pa-2 d-flex align-stretch">
          <b-bar v-on:addResponse="addResponse"></b-bar>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Search from "./components/Search.vue";
import Builder from "./components/BuilderBar.vue";
import Answer from "./components/Answer.vue";

import { Bus } from "./shared/Bus.js";

export default {
  name: "App",

  components: {
    Search: Search,
    "b-bar": Builder,
    Answer: Answer
  },
  created() {
    Bus.$on("loadIntent", intent => {
      this.responses = [];
      this.breadCrumbs = [];
      this.breadCrumbs.push(intent);
      this.responses.push(intent);
    });

    Bus.$on("openPostBack", postBack => {
      this.openPostBack(postBack);
    });
  },
  data: () => ({
    currentResponse: 0,
    responses: [],
    breadCrumbs: []
  }),
  methods: {
    addResponse(type) {

    },
    generateName(index) {
      let name = "";
      for (let i = 0; i <= index; ++i) {
        name += this.breadCrumbs[i];
        if (i < index) {
          name += ":";
        }
      }
      return name;
    }
    
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Montserrat&display=swap");

* {
  font-family: "Lato", sans-serif;
}
</style>
