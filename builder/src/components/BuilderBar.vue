<template>
    <v-card class="pl-5 pr-5" outlined>
        <v-row>
            <h3>Skladač správ</h3>
        </v-row>
        <v-row>
            <p>Tu si zvoľ, akú odpoveď má Ďurko na daný <b>intent</b> odpísať. Jednoducho klikni na žiadaný typ správy a zobrazí sa ti v odpovedi</p>    
        </v-row>
        <v-row>
            <div class="response text">
                <div class="bubble click" @click="pipeType('text')">Klasická textová správa vhodná na rýchlu a jednoduchú odpoveď</div>
                <div class="description">Textová správa</div>
            </div>
        </v-row>
        <v-row>
            <div class="response wait">
                <WaitIcon class="wait-icon click" @click="pipeType('wait')"></WaitIcon>
                <div class="description">Dramatická pauza</div>
            </div>
        </v-row>
        <v-row>
            <div class="response url">
                <div class="button click" @click="pipeType('url')">
                    Zoberem ťa do Infoportalu
                </div>
                <div class="description">Webová stránka</div>
            </div>
        </v-row>
        <v-row>
            <div class="response quick-responses">
                <div class="bubbles-wrapper click" @click="pipeType('quicks')">
                    <div class="bubbles">
                        Dovolenka
                    </div>
                    <div class="bubbles center">
                        Sviatky
                    </div>
                    <div class="bubbles">
                        Sabatikal
                    </div>
                </div>
                <div class="description">Rýchle odpovede</div>
            </div>    
        </v-row>
    </v-card>
</template>
<script>
import API from "../shared/API.js";
import WaitIcon from "../assets/timer.svg";

export default {
    data() {
        return {
            options: []
        }
    },
    components: {
        "WaitIcon": WaitIcon
    },
    methods:{
        pipeType(type) {
            this.$emit('addResponse', type);
        }
    },
    created() {
    }
}
</script>
<style lang="scss" scoped>



.response {
    display: block;
    width: 100%;
    padding: 15px 20px;

    .click:hover {
        cursor: pointer;
    }
}


.bubble {
    background-color: #97cae6;
    border-radius: 15px;
    width: 100%;
    padding: 5px 15px;
    color: white;
    font-size: 16px;
}

.bubbles-wrapper {
    width: 100%;
    display: block;
}

.bubbles {
    background-color: black;
    opacity: 0.8;
    border-radius: 4px;
    display: inline-block;
    box-sizing: border-box;
    color: white;
    width: 32%;
    padding: 5px 5px;
    font-size: 16px;
    text-align: center;
}

.bubbles.center {
    margin: 0 5px;
}

.description {
    display: block;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    padding: 10px 0 4px 0;
}

.description-text {
    display: block;
    text-align: center;
    font-size: 15px;
}

.wait-icon {
    width: 50px;
    height: 50px;
    position: relative;
    left: calc(50% - 25px);
}

.url {
    text-align: center;
}
.button {
    background-color: black;
    opacity: 0.8;
    border-radius: 4px;
    color: white;
    padding: 6px 10px;
    font-size: 16px;
    text-align: center;
    display: inline-block;
}
</style>