<template>
    <div class="url">
        <div class="text-response">
            {{ msg.value }}
        </div>
        <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
                <div class="button click" v-bind="attrs" v-on="on">
                    {{ msg.options.title }}
                </div>
            </template>
            <span>{{ msg.options.url }}</span>
        </v-tooltip>
    </div>
</template>
<script>

export default {
    props: ["msg"]
}
</script>
<style lang="scss" scoped>
.button {
    background-color: black;
    opacity: 0.8;
    border-radius: 4px;
    color: white;
    padding: 6px 10px;
    font-size: 14px;
    text-align: center;
    display: inline-block;
}

.text-response {
    background-color: #97cae6;
    border-radius: 15px;
    padding: 5px 15px;
    color: white;
    font-size: 16px;
    text-align: left;
    max-width: 400px;
    margin-bottom: 7px;
}
</style>