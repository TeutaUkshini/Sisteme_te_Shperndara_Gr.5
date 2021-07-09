<template>
    <div class="login-view">
        <div class="login-form">
            <span v-if="error">
                <p class="errors">{{ error }}</p>
            </span>
            <input class="input" v-model="username" type="text" placeholder="Username">
            <input class="input" v-model="password" type="password" placeholder="Password">
            <button class="button" @click="login">Log in</button>
            <p>Don't have an account? Click here to <router-link :to="{ name: 'signup'}" replace>register</router-link>
            </p>
        </div>
        <img class="login-image" :src="loginSVG" />
    </div>
</template>
<script>

export default {
    name: 'login',
    data() {
        return {
            loginSVG: require('@/assets/undraw_mobile_login_ikmv.svg'),
            error: null,
            username: null,
            password: null,
        }
    },
    computed: {
        users() {
            return this.$store.getters.getUsers;
        },
    },
    methods: {
        async login() {
            if (!this.username || !this.password) {
                this.error = "All fields are required!";
                setTimeout(() => { this.error = null }, 2000)
                return
            }
            // TODO: use /login (to be created) endpoint
            // when its created
            this.$store.dispatch('fetchUsers').then(() => {
                const loggedUser = this.users.find(user => {
                    return user.username === this.username
                });
                if (!loggedUser) {
                    this.error = "This account doesn't exist";
                    setTimeout(() => { this.error = null }, 2000)
                    return
                }
                this.$store.commit('SET_USER', loggedUser);
                localStorage.setItem('user', JSON.stringify(loggedUser));
                this.$router.push({
                    name: 'dashboard'
                })
            })

        }
    }
}
</script>
<style lang="scss">
.input{
    background: white;
    padding: 8px 10px;
    border-radius: 4px;
    border: none;
    font-size: 14px;
}
.login-view {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    display: flex;
}

.input{
    padding:8px 10px ;
}
.login-form {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px;
    box-shadow: 0 0 2px 0px #f0f0f0;
    border-radius: 10px;
    top: 30%;
    left: 20%;

    .input {
        margin-bottom: 10px;
    }

    p {
        margin-top: 50px;
    }

    .button {
        margin-top: 20px;
        background-color: #6c62fc;
    }
}

.login-image {
    width: 100%;
    height: 95%;
}
</style>
