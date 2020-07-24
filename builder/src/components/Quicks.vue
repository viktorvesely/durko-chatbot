<template>
    <div class="quick">
        <div class="text-response">
            {{ msg.value }}
        </div>
        <div v-for="button in msg.options" :key="button.post_back" class="button">
            {{ button.title }}
        </div>
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
    margin: 4px 4px;
}

.text-response {
    background-color: #32d2db;
    border-radius: 15px;
    padding: 5px 15px;
    color: white;
    font-size: 16px;
    text-align: left;
    max-width: 400px;
    margin-bottom: 7px;
}
</style>