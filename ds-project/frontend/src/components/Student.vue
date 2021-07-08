<template>
    <div class="student-row">
        <button class="edit-button" @click="showForm=true">Edit</button>
        <div ref="name" style="flex:2">{{student.name}} {{student.surname}}</div>
        <div>{{student.age}}</div>
        <div>{{student.contact}}</div>
        <div v-if="student.classname">{{student.classname}}</div>
        <img @click="$emit('delete')" class="delete-icon" :src="DeleteIcon" alt="">
        <div ref="form" class="form customized" v-if="showForm">
            <div>
                <input class="input" v-model="formData.name" type="text" placeholder="Name">
                <input class="input" v-model="formData.surname" type="text" placeholder="Last name">
                <input @keydown="$emit('checkIfNeg', $event)" class="input" v-model="formData.age" placeholder="Age">
                <VuePhoneNumberInput class="input" v-model="formData.contact" />
                <input class="input" v-model="formData.classname" type="text" placeholder="Class">
                <button class="button chat" style="color:white;" @click="save()">Save editing</button>
            </div>
            <img @click="showForm=false" class="delete-icon" :src="DeleteIcon" alt="">
        </div>
    </div>
</template>
<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
    props: {
        student: Object,
    },
    components: { VuePhoneNumberInput },
    data() {
        return {
            formData: {
                name: this.student.name,
                surname: this.student.surname,
                contact: this.student.contact,
                age: this.student.age,
                classname: this.student.classname
            },
            showForm: false,
            isEditable: false,
            DeleteIcon: require('@/assets/x.svg'),
        }
    },
    methods: {
        save() {
            this.$emit('save', this.formData)
            this.showForm = false
        }
    }
}
</script>
<style lang="scss">
.student-row {
    position: relative;
    display: flex;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #e2dfdf;

    >div {
        margin: 5px 0;
        flex: 1;
        padding: 5px 10px;
        border-right: solid 1px #e2dfdf;

        :last-child {
            border-right: none;
        }
    }

    .customized {
        width: 100%;
        margin: 0;
        padding: 20px 0;
        margin-left: -5px;
        margin-top: -5px;
        border-radius: 2px;
        background: #f3efef;
        box-shadow: 0 0 2px 0px grey;
    }

    .edit-button {
        height: 30px;
        margin: auto;
        margin-left: 5px;
        width: 50px;
        border: none;
        border-radius: 2px;
        color: gray;
        cursor: pointer;
        outline: none;

        &:active {
            color: #324657;
            background-color: #f3efef;
        }
    }
}
</style>
