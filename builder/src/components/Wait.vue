<template>
    <div class="wait">
        <WaitIcon class="icon"></WaitIcon>
        <div class="description">Pauza na {{ msg.value }} ms</div>
    </div>
</template>
<script>
import WaitIcon from "../assets/timer.svg"

export default {
    props: ["msg"],
    components: {
        "WaitIcon": WaitIcon
    }
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