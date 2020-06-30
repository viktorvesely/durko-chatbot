<template>
    <div class="answer">
        <h3>
            Odpoveď
        </h3>
        <div class="item-wrapper" v-for="type in types" :key="type.key">
            <component  v-bind:is="`${type.type}-comp`" :msg="type" class="item">
            </component>
            <div classs="delete-item" :key="type.key">
                <close-icon></close-icon>
            </div>
        </div>
    </div>    
</template>
<script>
import TextComp from "./Text"
import CloseIcon from '../assets/close.svg'

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
            types: []
        }
    },
    components: {
        "text-comp": TextComp,
        "close-icon": CloseIcon
    },
    methods: {
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
                    response.value = "Úvodný text";
                    response.options =  {
                        url: "URL adresa",
                        title: "Klikni na mňa"
                    }
                    break;
                case "text":
                    response.value = "Klikni na mňa aby si ma upravil(a)";
                    break;
                case "quicks":
                    response.value = "Úvodný text";
                    response.options = [
                        {
                            title: "Možnosť 1",
                            post_back: "example_1" 
                        },
                        {
                            title: "Možnosť 2",
                            post_back: "example_2" 
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
.item {
    display: inline-block;
}
</style>