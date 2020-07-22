<template>
    <v-card>
        <v-card-title>
          <span class="headline">Dramatická pauza</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-text-field
                  label="Pauza ms"
                  hint="Ďurko chvíľku počká"
                  v-model="value"
                  persistent-hint
                  required
                  spellcheck="false"
                ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" outlined color="red" text @click="closeDialog(false)">Zrušiť</v-btn>
          <v-btn class="ma-2" color="blue" outlined text @click="closeDialog(true)">Ok</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>

export default {
    data() {
        return {
            value: 0
        }
    },
    methods: {
        closeDialog(save) {
            if (save) {
                this.msg.value = this.value
            }
            this.$emit("closeDialog", this.msg);
            this.value = 0;
        },
        display(msg) {
            this.value = msg.value;
            this.msg = msg;
        }
    }
}
</script>