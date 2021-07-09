<template>
    <div class="home">
        <section class="nav">
            <Profile/>
        </section>
        <div style="display: flex; flex:1">
            <ul>
                <li v-for="option in sideMenu" :key="option.name">
                    <router-link :to="option.route">{{option.name}}</router-link>
                </li>
            </ul>
            <router-view class="main-content"></router-view>
        </div>
    </div>
</template>
<script>
import Profile from '@/components/Profile';

export default {
    name: 'home',
    components: {
        Profile,
    },
    data() {
        return {
            sideMenu: [{
                    name: 'Dashboard',
                    route: '/dashboard',
                }, 
                {
                    name: 'Students',
                    route: '/students',
                }, 
                // {
                //     name: 'Teachers',
                //     route: '/teachers',
                // },
                {
                    name: 'Chat Room',
                    route: '/ChatRoom',
                }

            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.nav {
    padding: 10px 20px;
    display: flex;
    justify-content: flex-end;
    background-color: #F3EFEF;
    box-shadow: 0 0 2px 1px #d6d1d1;
}

ul {

    list-style: none;
    margin: 0;
    margin-top: 2px;
    padding: 20px 40px;
    background-color: #f9f6f6;
    text-align: left;

    >li {
        font-size: 18px;
        margin-bottom: 15px;
        cursor: pointer;

        >a {
            padding-bottom: 2px;
            color: gray;
            text-decoration: none;
        }

    }
}

.router-link-active {
    border-bottom: solid 2px #2996f5;
}

.main-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>
