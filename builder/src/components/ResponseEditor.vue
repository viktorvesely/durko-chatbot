<template>
    <v-card max-width="344">
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-for="property in properties" :key="property.value">
                <v-text-field
                  :label="property.display"
                  :hint="property.hint"
                  @change="(value) => change(value, property.value)"
                  persistent-hint
                  required
                ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog(false)">Zrušiť</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog(true)">Uložiť</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>

export default {
    props: ["msg"],
    data() {
        return {
            title: "",
            properties: [],
            value: ""
        }
    },
    methods: {
        closeDialog(save) {
            this.$emit("closeDialog", save);
            this.title = "";
            this.properties = [];
            this.value = "";
        },
        change(value, valuename) {
            this[valuename] = value;
        },
        display() {
            switch (this.msg.type) {
                case "text":
                    this.title = "Textová správa";
                    this.properties.push({
                        display: "Text",
                        hint: "Nepíš nič dlhé",
                        value: "value"
                    });
                    break;
            }
        }
    }
}
</script>