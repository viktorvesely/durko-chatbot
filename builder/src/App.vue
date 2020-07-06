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
                style="max-height: 100%"
              >
                <Answer v-for="(response, index) in responses" :breadCrumbs="breadCrumbs" :index="index" :parent="index === 0 ? null : names[index - 1]" :name="names[index]" :isIntent="index === 0" :key="names[index]"></Answer>
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
import Search from "./components/Search.vue"
import Builder from "./components/BuilderBar.vue"
import Answer from "./components/Answer.vue"
import PBus from './shared/PBus.js'

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
      this.names = [];
      this.breadCrumbs = [];

      this.responses.push(intent);
      this.breadCrumbs.push(intent);
      this.pBuses.push(new PBus(intent));
      this.names.push(this.generateName(0));
      this.currentResponse = 0;
    });

    Bus.$on("removeLast", () => {
      let index = this.responses.length - 1;
      this.responses.splice(index, 1);
      this.names.splice(index, 1);
      this.breadCrumbs.splice(index, 1);
      this.pBuses.splice(index, 1);
      this.currentResponse--;

      // Resume dialog
      this.pBuses[this.pBuses.length - 1].$emit("resumeDialog");

    });

    Bus.$on("openPostBack", postBack => {
      let display = postBack.title;
      let value = postBack.post_back;
      this.responses.push(value);
      this.names.push(this.generateName(this.responses.length - 1));
      this.breadCrumbs.push(display);
      this.pBuses.push(new PBus(this.names[this.names.length - 1]));
      this.currentResponse++;
    });
  },
  data: () => ({
    currentResponse: 0,
    responses: [],
    breadCrumbs: [],
    names: [],
    pBuses: []
  }),
  methods: {
    addResponse(type) {
      let pBus = this.pBuses[this.pBuses.length - 1];
      pBus.$emit("newType", type);
    },
    generateName(index,) {
      let name = "";
      for (let i = 0; i <= index; ++i) {
        name += this.responses[i];
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
