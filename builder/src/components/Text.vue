<template>
    <div class="text-response">
        {{ msg.value }}
    </div>
</template>
<script>
export default {
    props: ["msg"]
}
</script>
<style lang="scss" scoped>
.text-response {
    background-color: black;
    border-radius: 15px;
    padding: 5px 15px;
    color: white;
    font-size: 16px;
    text-align: left;
    max-width: 400px;
}
</style>