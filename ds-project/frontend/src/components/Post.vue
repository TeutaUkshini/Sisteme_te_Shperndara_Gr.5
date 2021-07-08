<template>
    <div class="post-container">
        <div style="min-width: max-content;">
            <p>@{{post.username}}</p>
        </div>
        <div class="post-content">
            {{post.text}}
        </div>
        <img v-if="post.username==user.username"  @click="$emit('delete')" class="delete-icon" :src="DeleteIcon" alt="">
    </div>
</template>
<script>
export default {
    props: {
        post: Object,
    },
    data() {
        return {
            DeleteIcon: require('@/assets/x.svg'),
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser ? this.$store.getters.getUser : JSON.parse(localStorage.getItem('user'));
        }
    }
}
</script>
<style lang="scss" scoped>
.post-container {
    position: relative;
    display: flex;
    background: white;
    padding: 10px 20px;
    border-radius: 2px;
    margin-bottom: 10px;
    text-align: left;
    align-items: center;

    h4 {
        margin: 0;
    }

    p {
        margin: 0;
    }

    .delete-icon {
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;

        &:active {
            box-shadow: 0 0 2px 1px lightgray;
        }
    }

    .post-content {
        margin-left: 10px;
        border-left: solid 1px #e2dfdf;
        padding: 5px 10px;
        max-width: 100%;
        word-break: break-all;
    }
}
</style>
