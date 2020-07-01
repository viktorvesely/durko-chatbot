<template>
    <div class="search-intent">
        <h3>Zvoľ si akú odpoveď chceš editovať</h3>
        <p>Napíš názov <b>intent</b>-u ktorý si mu pridelil(a)</p>
        <vue-select :options='options' class="intent-widget"></vue-select>
    </div>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import API from "../shared/API.js";

export default {
    data() {
        return {
            options: []
        }
    },
    components: {
        "vue-select": vSelect
    },
    methods:{
    },
    created() {
        API.getIntents().then(intents => {
            intents.forEach(intent => {
                this.options.push(intent.name);
            });
        });
    }
}
</script>
<style lang="scss" scoped>

.search-intent {
    position: static;
    width: 100%;
    padding: 0 20px;
    top: 0;
    left: 0;
    border: 1px solid black;
    border-right: 0;
    height: 20%;
    padding-bottom: 20px;
}


.intent-widget {
    max-width: 400px;
}
</style>