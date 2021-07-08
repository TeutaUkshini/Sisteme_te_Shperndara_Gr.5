<template>
    <div>
        <div class="profile" @click="isDroppedDown = !isDroppedDown">
            <p style="margin:0 10px 0 0;">{{user.name}}</p>
            <img :src="ChevronDown" />
        </div>
        <div v-if="isDroppedDown" class="dropdown">
            <p @click="$router.push('login')">Log out</p>
        </div>
    </div>
</template>
<script>
//import ChevronDown from '@/assets/chevron-down.svg'
export default {
    name: 'Profile',
    data() {
        return {
            ChevronDown: require('@/assets/chevron-down.svg'),
            isDroppedDown: false,
        }
    },
    components: {
        //ChevronDown
    },
    computed: {
        user() {
            return this.$store.getters.getUser ? this.$store.getters.getUser : JSON.parse(localStorage.getItem('user'));
        }
    }
}
</script>
<style lang="scss" scoped>
.profile {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.dropdown {
    position: absolute;
    top: 0;
    right: 15px;
    z-index: 2;
    background-color: white;
    box-shadow: 0 3px 3px -1px gray;
    border-radius: 2px;
    animation: slide-bottom .5s cubic-bezier(.25, .46, .45, .94) both;

    >p {
        margin: 0;
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
            background-color: #f3efef;
        }
    }

}

@keyframes slide-bottom {
    0% {
        transform: translateY(40px)
    }

    100% {
        transform: translateY(58px)
    }
}
</style>
