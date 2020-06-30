<template>
  <div id="root">
    <div id="left-screen">
      <Search class="Search"></Search>
      <Answer ref="Answer"></Answer>
    </div><div id="right-screen">
      <b-bar v-on:addResponse="addResponse"></b-bar>
    </div>
  </div>
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
      this.$refs.Answer.addResponse(type)
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

#root {
  width: 100%;
  height: 100vh;
  max-width: 100%;
  max-height: 100vh;
  margin: auto;
  overflow: hidden;
}

#left-screen {
  float: left;
  width: 70%;
  height: 100%;
}

#right-screen {
  height: 100%;
  margin-left: 70%;
}


</style>
