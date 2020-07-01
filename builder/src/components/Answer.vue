<template>
    <div class="answer">
        <v-row dense no-gutters>
            <v-col>
                 <h3>
                    Odpoveď
                </h3>
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col>
                 <p>
                    Takto nejako bude tvoja odpoveď vyzerať
                </p>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialog" max-width="800">
                <component ref="Dialog" v-on:closeDialog="closeDialog" :is="`${currentMsg.type}-editor`"></component>
            </v-dialog>
        </v-row>
        <v-row dense no-gutters justify="center" tag="div" class="item-wrapper" v-for="(type, index) in types" :key="type.key">
            <v-col lg="4">
                <component v-bind:is="typeToComponent(type.type)" :msg="type" class="item" @click.native.stop="displayDialog(type, index)">
                </component>
            </v-col>
            <v-col lg="1">
                <v-btn icon color="black" @click="removeElement(index)">
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>    
</template>
<script>
import TextComp from "./Text"
import WaitComp from "./Wait"
import URLComp from "./URL"
import QuicksComp from "./Quicks"

import CloseIcon from '../assets/close.svg'

import TextEditor from './TextEditor'
import WaitEditor from './WaitEditor'
import URLEditor from  './URLEditor'
import QuicksEditor from './QuicksEditor'

function generateHexString(length) {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0,length);
}


export default {
    data() {
        return {
            types: [],
            dialog: false,
            currentMsg: {},
            currentIndex: -1
        }
    },
    components: {
        "text-comp": TextComp,
        "wait-comp": WaitComp,
        "url-comp": URLComp,
        "quicks-comp": QuicksComp,
        "close-icon": CloseIcon,
        "text-editor": TextEditor,
        "wait-editor": WaitEditor,
        "url-editor": URLEditor,
        "quicks-editor": QuicksEditor
    },
    methods: {
        typeToComponent(type) {
            return `${type}-comp`;
        },
        displayDialog(msg, index) {
            this.currentMsg = msg;
            this.currentIndex = index;
            this.dialog = true;
            this.$nextTick(() => {
                this.$refs.Dialog.display(this.currentMsg);
            });
        },
        closeDialog(msg) {
            this.dialog = false;
            this.$set(this.types, this.currentIndex, msg);
        },
        removeElement(index) {
            this.types.splice(index, 1);
        },
        addResponse(type) {
            let response = {
                type: type,
                key: generateHexString(5)
            };
            switch (type) {
                case "wait":
                    response.value = 500;
                    break;
                case "url":
                    response.value = "Viac info nájdeš na tejto stránke";
                    response.options =  {
                        url: "URL adresa",
                        title: "Klikni na mňa"
                    }
                    break;
                case "text":
                    response.value = "Klikni na mňa aby si ma upravil(a)";
                    break;
                case "quicks":
                    response.value = "Tvoja naj farba je?";
                    response.options = [
                        {
                            title: "Možnosť 1",
                            post_back: "option_1" 
                        }
                    ];
                    break;
            }
            this.types.push(response);
        }
    }
}
</script>
<style lang="scss" scoped>
.answer {
    height: 80%;
    width: 100%;
    padding: 10px 15px;
    overflow: auto;
}
.item-wrapper {
    text-align: center;
    margin: 20px 0;
}
.delete-item {
    width: 20px;
    display: inline-block;
    height: 20px;
    position: relative;
    top: 2px;
    
}
.delete-item:hover {
    cursor: pointer;
}

.item {
    display: inline-block;
}

.item:hover {
    cursor: pointer;
}
</style>