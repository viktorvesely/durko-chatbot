<template>
    <div class="wait">
        <v-icon color="black" large class="mb-3">mdi-timer-sand</v-icon>
        <div class="description">Pauza na {{ msg.value }} ms</div>
    </div>
</template>
<script>

export default {
    props: ["msg"],
}
</script>
<style lang="scss" scoped>
.description {
    text-align: center;
    font-size: 15px;
}


.wait {
    padding: 5px 15px;
    max-width: 400px;

    .icon {
        width: 45px;
        height: 45px;
    }
}
</style>