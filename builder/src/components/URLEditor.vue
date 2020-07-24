<template>
    <v-card>
        <v-card-title class="primary--text">
          <span class="headline">Webový odkaz</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col lg="12">
                <v-text-field
                  label="Úvodná správa"
                  hint="Text kde vysvetlíš o čo ide"
                  v-model="value"
                  persistent-hint
                  required
                  spellcheck="false"
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="justify-center" lg="12">
            <v-col class="ma-4" v-for="(btn, index) in btns" :key="btn.post_back" lg="3">
                <v-row>
                    <v-text-field
                    label="Text na tlačítku"
                    v-model="btn.title"
                    required
                    spellcheck="false"
                    ></v-text-field>
                </v-row>
                <v-row>
                   <v-text-field
                    label="URL, kam bude užívateľ presmerovaný"
                    v-model="btn.url"
                    required
                    spellcheck="false"
                    ></v-text-field>
                </v-row>
                <v-row class="mt-2" v-if="index > 0">
                    <v-btn width="190" outlined color="red" text @click="remove(index)">Zmazať</v-btn>
                </v-row>
            </v-col>
            <v-col lg="3" justify-center align-center>
                <v-row fill-height>
                    <v-btn color="primary" class="ma-12" outlined @click="add">
                        <v-icon color="primary">mdi-plus</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" outlined color="red" text @click="closeDialog(false)">Zrušiť</v-btn>
          <v-btn class="ma-2" color="primary" outlined text @click="closeDialog(true)">Ok</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>


import { Bus } from "../shared/Bus.js"
import PBus from "../shared/PBus.js"

export default {
    data() {
        return {
            value: "",
            btns: [],
            msg: {},
            pBus: null
        }
    },
    props: ["name"],
    created() {
        this.pBus = new PBus(this.name);
    },
    methods: {
        evalURL(url) {
            try {
                let temp = new URL(url);
            } catch(_) {
                return false;
            }
            return true;
        },
        closeDialog(save) {
            if (save) {
                for (let i = 0; i < this.btns.length; ++i) {
                    let btn = this.btns[i];
                    if (!this.evalURL(btn.url)) {
                        Bus.$emit("alert", {
                            type: "error",
                            msg: "URL addres nie je validná. Nezabudli ste na 'http(s)' alebo 'www'?"
                        });
                        return;
                    }
                }
                this.msg.value = this.value;
                this.msg.options = this.btns;
            }
            this.$emit("closeDialog", this.msg);
            this.value = "";
            this.btns = [];
        },
        copyButtons(btns) {
            let copy = [];
            btns.forEach(btn => {
                copy.push({
                    title: btn.title,
                    url: btn.url
                });
            });
            return copy;
        },
        display(msg) {
            this.value = msg.value;
            this.btns = this.copyButtons(msg.options);

            this.msg = msg;
        },
        remove(index) {
            this.btns.splice(index, 1);
        },
        add() {
            this.btns.push({
                title: `Text ${this.btns.length + 1}`,
                url: `URL ${this.btns.length + 1}`
            });
        },
    }
}
</script>