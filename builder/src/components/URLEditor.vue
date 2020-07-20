<template>
    <v-card>
        <v-card-title>
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
            <v-row>
                <v-col lg="8">
                    <v-text-field
                    label="URL"
                    hint="URL, kam bude užívateľ presmerovaný"
                    v-model="url"
                    persistent-hint
                    required
                    spellcheck="false"
                    ></v-text-field>
                </v-col>
                <v-col lg="4">
                    <v-text-field
                    label="Text na tlačítku"
                    v-model="title"
                    required
                    spellcheck="false"
                    ></v-text-field>
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
            url: "",
            title: ""
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
                this.msg.options.url = this.url;
                this.msg.options.title = this.title;
            }
            this.$emit("closeDialog", this.msg);
            this.value = "";
            this.url = "";
            this.title = "";
        },
        display(msg) {
            this.value = msg.value;
            this.url = msg.options.url;
            this.title = msg.options.title;

            this.msg = msg;
        }
    }
}
</script>