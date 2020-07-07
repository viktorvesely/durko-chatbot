<template>
    <v-carousel-item 
        reverse-transition="scale-transition"
        transition="scale-transition"
    >
        <v-card class="pl-5 pt-5 pb-0 pr-5 align-self-stretch" :ref="`answerView:${breadCrumbs}`" width="100%" elevation="2" height="100%">
        <v-row dense no-gutters>
            <v-col lg="3">
                 <h3>
                    Odpoveď na
                </h3>
            </v-col>
            <v-col lg="6">
                <v-row>
                    <v-col class="pt-2">
                        <div style="display: inline" v-for="(breadCrumb, index) in breadCrumbs" :key="index + 1">
                            <a @click="redirect(index)" v-if="index < breadCrumbs.length - 1" class="active-link">
                                {{ breadCrumb }}
                            </a>
                            <a @click="redirect(-1)" v-if="index === breadCrumbs.length - 1" class="passive-link">
                                {{ breadCrumb }}
                            </a>
                            <span>/</span>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col lg="2" class="pt-4">
                <v-btn color="blue" outlined text @click="saveResponse()">Uložiť</v-btn>
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
                <component 
                    :name="name"
                    ref="Dialog"
                    v-on:closeDialog="closeDialog"
                    v-on:removePostback="removePostback"
                    :is="`${currentMsg.type}-editor`"
                    >
                </component>
            </v-dialog>
        </v-row>
        <div ref="Cap" class="cap">
            <v-row dense no-gutters justify="center" tag="div" class="item-wrapper pa-2 d-flex align-stretch" v-for="(type, index) in response" :key="type.key">
                <v-col cols="4">
                    <component v-bind:is="typeToComponent(type.type)" :msg="type" class="item" @click.native.stop="displayDialog(type, index)">
                    </component>
                </v-col>
                <v-col cols="1">
                    <v-btn icon color="black" @click="removeElement(index)">
                        <v-icon dark>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        
    </v-card> 
    </v-carousel-item>   
</template>
<script>
import TextComp from "./Text"
import WaitComp from "./Wait"
import URLComp from "./URL"
import QuicksComp from "./Quicks"

import CloseIcon from '../assets/close.svg'
import { Database } from '../shared/Database.js'
import { Bus } from '../shared/Bus.js'
import PBus from '../shared/PBus.js'

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
    props: ["index", "isIntent", "name", "parent", "breadCrumbs"],
    data() {
        return {
            response: [],
            dialog: false,
            currentMsg: {},
            currentIndex: -1,
            pausedDialog: false,
            pBus: null,
            saved: true,
            removePostbacks: []
        }
    },
    created() {
        this.pBus = new PBus(this.name);
        if (!this.isIntent) this.parentPBus = new PBus(this.parent);
        this.loadResponse();

        // there is also a close dialog listener but it is a local event
        this.pBus.$on("pauseDialog", this.pauseDialog);
        this.pBus.$on("newType", this.addResponse);
        this.pBus.$on("resume", this.resume);
        this.pBus.$on("emptyBin", this.emptyPostbacksBin);
        this.pBus.$on("saveQuicks", this.quickSave);
    },
    mounted() {
        //let id = `answerView:${this.name}`;
        //let y = this.$refs[id].getBoundingClientRect().y;
        //let delta = window.innerHeight - y - 15;
        //iew.style.maxHeight = `${delta}px`;
        //view.style.height = `${delta}px`;
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
    beforeDestroy() {
        this.pBus.$off("pauseDialog", this.pauseDialog);
        this.pBus.$off("newType", this.addResponse);
        this.pBus.$off("resume", this.resume);
        this.pBus.$off("emptyBin", this.emptyPostbacksBin);
        this.pBus.$off("saveQuicks", this.quickSave);
    },
    methods: {
        redirect(index) {
            if (index === -1) return;
            let response = true;
            
            if (!this.saved) {
                response = window.confirm("Naozaj chceš odísť? Máš tu ešte neuložené zmeny");
            }

            if (response) {
                Bus.$emit("redirect", index);
            }
            
        },
        loadResponse() {
            if (this.isIntent) {
                Database.loadResponse(this.name).then(response => {
                    this.response = response;
                });
            } else  {
                Database.loadPostback(this.name).then(response => {
                    this.response = response;
                });
            }
        },
        pauseDialog() {
            this.dialog = false;
            this.pauseDialog = true;
        },
        resume(continueDialog) {
            if (continueDialog && this.pauseDialog) {
                this.dialog = true;
            }
            this.pauseDialog = false;
        },
        emptyPostbacksBin() {
            this.removePostbacks.forEach(postBack => {
                Database.removePostback(postBack);
            });
            this.removePostbacks = [];
        },
        quickSave(msg) {
            this.$set(this.response, this.currentIndex, msg);
            if (!this.isIntent) {
                Database.savePostback(this.name, this.response).then(() => {
                    this.saved = true;
                });
            } else {
                Database.saveResponse(this.name, this.response).then(() => {
                    this.saved = true;
                });
            }
        },
        saveResponse() {
            this.emptyPostbacksBin();
            if (!this.isIntent) {
                Database.savePostback(this.name, this.response).then(() => {
                    this.saved = true;
                    Bus.$emit("alert", {
                        type: "success",
                        msg: "Odpoveď bola uložená"
                    });
                    Bus.$emit("removeLast");
                });
            } else {
                Database.saveResponse(this.name, this.response).then(() => {
                    Bus.$emit("alert", {
                        type: "success",
                        msg: "Intent bol uložený"
                    });
                    this.saved = true;
                });
            }
        },
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
            this.$set(this.response, this.currentIndex, msg);
        },
        formNextName(postBackValue) {
            return `${this.name}:${postBackValue}`
        },
        removePostback(postBackValue) {
            this.removePostbacks.push(this.formNextName(postBackValue));
        },
        removeElement(index) {
            this.saved = false;
            let msg = this.response.splice(index, 1)[0];
            if (msg.type === "quicks") {
                msg.options.forEach(choice => {
                    this.removePostbacks.push(this.formNextName(choice.post_back));
                });
            }
        },
        addResponse(type) {
            let last = this.response[this.response.length - 1];
            if (last && last.type === "quicks") {
                console.log("alert ty kek");
                Bus.$emit("alert", {
                    type: "error",
                    msg: "Rýchle odpovede musia byť ako posledný prvok správy"
                });
                return;
            }

            this.saved = false;
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
                            post_back: "option_0" 
                        }
                    ];
                    break;
            }
            this.response.push(response);
        }
    }
}
</script>
<style lang="scss" scoped>
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

a {
    font-size: 16px;
}

a.active-link {
    color: #BCE4FA !important;
}

a.passive-link {
    color: gray;
}

a.passive-link:hover {
    cursor: default;
}

#answerView {
    overflow-y: auto;
}

</style>