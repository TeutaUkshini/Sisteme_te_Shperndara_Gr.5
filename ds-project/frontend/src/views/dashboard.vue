
<template>
    <div>
        <div class="post">
            <div class="post-input">
                <input v-model="inputValue" placeholder="What's happening!!" @keyup.enter="sendPost" type="text">
                <button @click="sendPost" class="button">Post</button>
            </div>
        </div>
        <div class="posts-container">
            <Post v-for="post in posts" @delete="deletePost(post.postId)" :key="post.postId" :post="post" />
        </div>
    </div>
</template>
<script>
import Post from '@/components/Post'

export default {
    name: 'dashboard',
    components: {
        Post
    },
    data() {
        return {
            inputValue: null,
            loading: false,
        }
    },
    mounted() {
        this.$store.dispatch('fetchUsers')
            .then(() => {
                return this.$store.dispatch('fetchPosts')
            })
    },
    computed: {
        posts() {
            return this.$store.getters.getPosts;
        },
        users() {
            return this.$store.getters.getUsers;
        },
        user() {
            return this.$store.getters.getUser ? this.$store.getters.getUser : JSON.parse(localStorage.getItem('user'));
        }
    },
    methods: {
        sendPost() {
            if (!this.inputValue) return;
            let post = {
                userId: this.user.id,
                text: this.inputValue,
            };
            this.loading = true;
            this.$store.dispatch('createPost', post)
                .finally(() => {
                    this.loading = false;
                });
            this.inputValue = null;
        },
        deletePost(id) {
            this.$store.dispatch('deletePost', id)
        }
    }
}
</script>
<style lang="scss" scoped>
.post {
    display: flex;
    padding: 10px 20px;
    margin: 20px;
    border-radius: 5px;
    background: #8da7bd;
}

.post-input {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;

    input {

        border: none;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 4px;

    }

    .button {
        color: #314658;
        margin-left: auto;
        margin-top: 10px;
        margin-right: 0;

        &:active {
            box-shadow: 0 0 2px 2px lightgray;
        }
    }
}

.posts-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 0px 20px 20px 20px;
    border-radius: 5px;
    background: #8da7bd;
}
</style>
