<template>
    <v-card>
        <v-card-title>
          <span class="headline">Rýchle odpovede</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col>
                <v-text-field
                  label="Úvodná správa"
                  hint="Text, kde sa spýtaš otázku"
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
                    label="Text odpovede"
                    v-model="btn.title"
                    required
                    spellcheck="false"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-btn color="blue" width="190" outlined @click="editQuick(btn)">Upraviť reakciu</v-btn>
                </v-row>
                <v-row class="mt-2" v-if="index > 0">
                    <v-btn width="190" outlined color="red" text @click="remove(index)">Zmazať reakciu</v-btn>
                </v-row>
            </v-col>
            <v-col lg="3" justify-center align-center>
                <v-row fill-height>
                    <v-btn color="blue" class="ma-12" outlined @click="addQuick">
                        <v-icon color="blue">mdi-plus</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" outlined color="red" text @click="closeDialog(false)">Zrušiť</v-btn>
          <v-btn class="ma-2" color="blue" outlined text @click="closeDialog(true)">Uložiť</v-btn>
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
        closeDialog(save) {
            if (save) {
                this.msg.value = this.value;
                this.msg.options = this.btns;
                this.pBus.$emit("saveQuicks");
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
                    post_back: btn.post_back
                })      
            });
            return copy;
        },
        display(msg) {
            this.value = msg.value;
            this.btns = this.copyButtons(msg.options);
            this.msg = msg;
        },
        remove(index) {
            let removed = this.btns.splice(index, 1)[0];
            this.$emit("removePostback", removed.post_back);
        },
        addQuick() {
            this.btns.push({
                title: `Možnosť ${this.btns.length + 1}`,
                post_back: `option_${this.btns.length}`
            });
        },
        editQuick(post_back) {
            this.pBus.$emit("pauseDialog");
            Bus.$emit("openPostBack", post_back);
        }
    }
}
</script>