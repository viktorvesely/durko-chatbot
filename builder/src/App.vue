<template>
  <v-app id="root" :style="{background: $vuetify.theme.themes.light.background}">
    <Alerts></Alerts>

    <v-container class="pa-2" style="height:100%;">
  
        <div style="max-height: 100vh">
          <Search></Search>
        

          <v-carousel
            hide-delimiters
            :show-arrows="false"
            light
            v-model="currentResponse"
            class="mt-5"
             style="max-height: 540px; height: 540px"
          >
            <Answer 
              v-for="(response, index) in responses"
              :breadCrumbs="breadCrumbs"
              :index="index"
              :name="names[index]"
              :isIntent="index === 0"
              :key="response.key"
              ></Answer>
          </v-carousel>
        </div>
    </v-container>
  </v-app>
</template>

<script>
import Search from "./components/Search.vue"
import Builder from "./components/BuilderBar.vue"
import Answer from "./components/Answer.vue"
import PBus from './shared/PBus.js'
import Alerts from "./components/Alerts.vue"

import { Bus } from "./shared/Bus.js";

function generateHexString(length) {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0,length);
}

export default {
  name: "App",

  components: {
    "Search": Search,
    "b-bar": Builder,
    "Answer": Answer,
    "Alerts": Alerts
  },
  created() {
    Bus.$on("loadIntent", intent => {
      this.responses = [];
      this.names = [];
      this.breadCrumbs = [];

      this.responses.push({
        value: intent,
        key: generateHexString(5)
      });
      this.breadCrumbs.push(intent);
      this.pBuses.push(new PBus(intent));
      this.names.push(this.generateName(0));
      this.currentResponse = 0;
    });

    Bus.$on("redirect", index => {
        let deleteNum = (this.responses.length -1) - index;

        this.responses.splice(index + 1, deleteNum);
        this.names.splice(index + 1, deleteNum);
        this.breadCrumbs.splice(index + 1, deleteNum);
        this.pBuses.splice(index + 1, deleteNum);
        this.currentResponse = index;

        // Resume dialog
        this.pBuses[this.pBuses.length - 1].$emit("resume", true);
    });

    Bus.$on("removeLast", () => {
      let index = this.responses.length - 1;
      this.responses.pop();
      this.names.pop();
      this.breadCrumbs.pop();
      this.pBuses.pop();
      this.currentResponse--;

      // Resume dialog
      this.pBuses[this.pBuses.length - 1].$emit("resume", true);

    });

    Bus.$on("openPostBack", postBack => {
      this.nextId++;
      let display = postBack.title;
      let value = postBack.post_back;
      this.responses.push({
        value: value,
        key: generateHexString(5)
      });
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
    pBuses: [],
    screens: [],
    nextId: 0
  }),
  methods: {
    generateName(index) {
      let name = "";
      for (let i = 0; i <= index; ++i) {
        name += this.responses[i].value;
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
  color: "#00E8FC"
}
$material-light: (
  'background': black
);
</style>
