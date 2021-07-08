<template>
    <div style="display: flex; align-items: center; justify-content: center;">
        <p v-if="message.from=='me'" :style="message.from=='me' ? 'margin-left:auto;' : 'margin-right:auto'">{{message.from}}</p>
        <div class="message-bubble" :class="{'is-from-me': message.from=='me'}">{{message.message}}</div>
        <p style="text-align: right;" v-if="message.from !=='me'">{{message.from}}</p>
    </div>
</template>
<script>
export default {
    props: {
        message: Object,
    }
}
</script>
<style lang="scss">
.message-bubble {
    background-color: #445f7a;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    margin: 10px 20px 5px 10px;
    text-align: left;
    width: max-content;
    max-width: 200px;
    &.is-from-me {
        //margin-left: auto;
        color: #727d93;
        background-color: white;
    }
}
</style>
