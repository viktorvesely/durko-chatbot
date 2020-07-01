<template>
    <v-card>
        <v-card-title>
          <span class="headline">Webový odkaz</span>
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
            <v-row>
            <v-col v-for="btn in btns" :key="btn.post_back" lg="4">
                <v-row>
                    <v-text-field
                    label="Odpoveď"
                    v-model="btn.title"
                    required
                    spellcheck="false"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-btn color="blue" outlined @click="editQuick(btn.post_back)">Upraviť odpoveď</v-btn>
                </v-row>
            </v-col>
            <v-col>
                <v-btn color="blue">
                    <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
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

export default {
    data() {
        return {
            value: "",
            btns: [],
            msg: {}
        }
    },
    methods: {
        closeDialog(save) {
            if (save) {
                this.msg.value = this.value;
                this.msg.options = this.btns;
            }
            this.$emit("closeDialog", this.msg);
            this.value = "";
            this.btns = [];
        },
        display(msg) {
            this.value = msg.value;
            this.btns = msg.options;

            this.msg = msg;
        },
        editQuick(post_back) {
            console.log(post_back);
        }
    }
}
</script>