<template>
    <div class="text-center mt-8">
        <v-menu open-on-hover top offset-y >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            outlined
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        
        <v-card>
            <v-list>
                <v-list-item>
                    <v-list-item-content text-align="center" justify="center">
                        <v-list-item-title style="text-align: center"><b>Pridať odpoveď</b></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-item>
                    <v-list-item-action>
                        <v-btn color="black" outlined @click="add('text')">
                            <v-icon>mdi-message-text</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-title>Textová správa</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-btn color="black" outlined @click="add('wait')">
                            <v-icon>mdi-timer-sand</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-title>Dramatická pauza</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-btn color="black" outlined @click="add('url')">
                            <v-icon>mdi-web</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-title>Webová stránka</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-btn color="black" outlined @click="add('quicks')">
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-title>Rýchle odpovede</v-list-item-title>
                </v-list-item>
            </v-list>

        </v-card>
        </v-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: []    
        }
    },
    methods: {
        add(type) {
            this.$emit('addResponse', type);
        }
    }
}
</script>