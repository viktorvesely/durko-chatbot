<template>
    <div class="builder-bar">
        <h3>Skladač správ</h3>
        <p>Tu si zvoľ, akú odpoveď má Ďurko na daný <b>intent</b> odpísať. Jednoducho klikni na žiadaný typ správy a zobrazí sa ti v odpovedi</p>
        <div class="type-responses">
            <div class="response text">
                <div class="bubble click" @click="pipeType('text')">Klasická textová správa vhodná na rýchlu a jednoduchú odpoveď</div>
                <div class="description">Textová správa</div>
            </div>
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
            <div class="response wait">
                <WaitIcon class="wait-icon click" @click="pipeType('wait')"></WaitIcon>
                <div class="description">Dramatická pauza</div>
            </div>
            <div class="response url">
                <div class="button click" @click="pipeType('url')">
                    Zoberem ťa do Infoportalu
                </div>
                <div class="description">Webová stránka</div>
            </div>
        </div>
    </div>
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
.builder-bar {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: 1px solid black;
}


.response {
    display: block;
    width: 100%;
    padding: 15px 20px;

    .click:hover {
        cursor: pointer;
    }
}


.bubble {
    background-color: black;
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

.button {
    background-color: black;
    opacity: 0.8;
    border-radius: 4px;
    color: white;
    padding: 5px 5px;
    font-size: 16px;
    text-align: center;
}
</style>