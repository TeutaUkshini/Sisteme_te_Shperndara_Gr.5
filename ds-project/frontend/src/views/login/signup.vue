<template>
    <div class="login-view">
        <div class="login-form">
            <span v-if="error">
                <p class="errors">{{ error }}</p>
            </span>
            <input class="input" v-model="name" type="text" placeholder="Your name...">
            <input class="input" v-model="username" type="text" placeholder="Username">
            <input class="input" type="email" name="email" id="email" placeholder="Email" v-model="email">
            <input class="input" v-model="password" type="password" placeholder="Password">
            <input class="input" v-model="confirmedpass" type="password" placeholder="Confirm password">
            <div style="margin-top:10px;"><input type="checkbox" v-model="isTeacher"> Teacher</div>
            <button class="button" @click="signup">Register</button>
            <p>Already have an account? Click here to <router-link :to="{ name: 'login'}" replace>Log in</router-link>
            </p>
        </div>
        <img class="login-image" :src="loginSVG" />
    </div>
</template>
<script>
export default {
    name: 'signup',
    data() {
        return {
            loginSVG: require('@/assets/undraw_mobile_login_ikmv.svg'),
            error: null,
            name: null,
            username: null,
            email: null,
            password: null,
            confirmedpass: null,
            isTeacher: false,
        }
    },
    computed: {
        users() {
            return this.$store.getters.getUsers;
        },
    },
    methods: {
        signup() {
            if (!this.name || !this.username || !this.email || !this.password || !this.confirmedpass) {
                this.error = "All fields are required!";
                setTimeout(() => { this.error = null }, 2000)
                return
            }
            if (!this.validEmail(this.email)) {
                this.error = 'Valid email required.';
                setTimeout(() => { this.error = null }, 2000)
            }
            if (this.password !== this.confirmedpass) {
                this.error = `Passwords don't match. `;
                setTimeout(() => { this.error = null }, 2000)
            }
            if (!this.error) {
                let name = this.name.split(' ')[0]
                let surname = this.name.split(' ')[1]
                let status
                if (this.isTeacher) { status = 'Teacher' } else { status = 'Parent' }
                let payload = {
                    username: this.username,
                    name,
                    surname,
                    email: this.email,
                    password: this.password,
                    status
                }

                this.$store.dispatch('createUser', payload).then(() => {
                    return this.$store.dispatch('fetchUsers').then(() => {
                        const loggedUser = this.users.find(user => {
                            return user.username === this.username
                        });
                        this.$store.commit('SET_USER', loggedUser);
                        localStorage.setItem('user', JSON.stringify(loggedUser));
                        this.$router.push('home')
                    })
                })
            }

        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>
<style lang="scss">
.input {
    min-width: 300px;
}

.errors {
    margin: 0 0 10px 0 !important;
    color: red;
    background: white;
    border-radius: 4px;
    padding: 5px 20px;
}
</style>
