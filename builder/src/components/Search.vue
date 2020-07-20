<template>
    <v-card width="100%" class="pa-5 align-self-stretch">
        <v-row dense>
            <v-col class="pa-0" lg="5">
                <h3>Zvoľ si akú odpoveď chceš editovať</h3>
            </v-col>
            <v-col lg="5">   
                <v-autocomplete spellcheck="false" v-model="current" dense color="#BCE4FA" :items='options' @change="selectIntent" label="Názov intentu">
                    
                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col class="pa-0">
                <p>Napíš názov <b>intent</b>-u ktorý si mu pridelil(a)</p>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import "vue-select/dist/vue-select.css";
import API from "../shared/API.js";
import { Bus } from "../shared/Bus.js";

export default {
    data() {
        return {
            options: [],
            current: ""
        }
    },
    methods:{
    },
    created() {
        API.getIntents().then(intents => {
            this.options = intents;
            this.current = intents[0];
            this.selectIntent(this.current);
        });
    },
    methods: {
        selectIntent(intent) {
            Bus.$emit("loadIntent", intent);
        }
    }
    }
</script>
<style lang="scss" scoped>
</style>