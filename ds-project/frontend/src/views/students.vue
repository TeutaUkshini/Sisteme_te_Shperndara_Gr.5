<template>
    <div class="students-content">
        <div v-if="showForm" class="overlay"></div>
        <div class="students-content__wrapper ">
            <button @click="showForm=true" class="button chat" style="width: 100%;margin:0;">Add new</button>
            <div v-if="showForm" class="form">
                <div>
                    <span v-if="error">
                        <p class="errors">{{ error }}</p>
                    </span>
                    <input class="input" v-model="formData.name" type="text" placeholder="Name">
                    <input class="input" v-model="formData.surname" type="text" placeholder="Last name">
                    <input @keydown="checkIfNeg($event)" class="input" v-model="formData.age" placeholder="Age">
                    <VuePhoneNumberInput class="input" v-model="formData.contact" />
                    <input class="input" v-model="formData.classname" type="text" placeholder="Class">
                    <button class="button" @click="saveInfo">Save </button>
                </div>
                <img @click="showForm=false" class="delete-icon" :src="DeleteIcon" alt="">
            </div>
            <Student v-for="(student, index) in students" @save="updateInfo($event,index)" :key="student.id" :student="student" @checkIfNeg="checkIfNeg" @delete="deleteStudent(index)" />
        </div>
    </div>
</template>
<script>
import Student from '@/components/Student'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';


export default {
    name: 'students',
    components: {
        Student,
        VuePhoneNumberInput
    },
    mounted() {
        this.$store.dispatch('fetchStudents')
    },
    data() {
        return {
            formData: {
                name: null,
                surname: null,
                age: null,
                classname: null,
                contact: null,
            },
            error: null,
            showForm: false,
            DeleteIcon: require('@/assets/x.svg'),
        }
    },
    computed: {
        students() {
            return this.$store.getters.getStudents
        }
    },
    methods: {
        regexTest(val) {
            let allowedKeys = [
                'Meta',
                'Backspace',
                'Delete',
                'Escape',
                'ArrowLeft',
                'ArrowRight'
            ]
            let regex = /\d+/g
            return regex.test(val) || allowedKeys.includes(val) ? true : false
        },
        checkIfNeg(event) {
            if (!this.regexTest(event.key)) {
                event.preventDefault();
                return
            }
        },
        saveInfo() {
            if (!this.formData.age || !this.formData.name || !this.formData.surname || !this.formData.classname) {
                this.error = "All fields are required!";
                setTimeout(() => { this.error = null }, 2000)
                return

            }
            let payload = {
                contact: this.formData.contact,
                name: this.formData.name,
                surname: this.formData.surname,
                classname: this.formData.classname,
                age: this.formData.age
            }
            this.$store.dispatch('createStudent', payload)
                .then(() => {
                    return this.$store.dispatch('fetchStudents')
                })
                .then(() => {
                    this.showForm = false
                })
        },
        updateInfo(event, index) {
            let payload = event
            payload.id = this.students[index].id
            this.$store.dispatch('updateStudent', payload).then(() => {
                return this.$store.dispatch('fetchStudents')
            }).then(() => this.students[index] = { ...this.students[index], event })

        },
        deleteStudent(index) {
            let { id } = this.students[index]
            this.$store.dispatch('deleteStudent', id).then(() => {
                return this.$store.dispatch('fetchStudents')
            })
        }
    }
}
</script>
<style lang="scss">
.input{
    padding: 8px 10px;
}
.students-content__wrapper {
    margin: 20px;
    position: relative;
}

.form {
    z-index: 1;
    width: calc(100% - 50px);
    top: 0px;
    left: 5px;
    border-radius: 4px;
    position: absolute;
    background-color: #324657;
    padding: 20px;
    box-shadow: 0 0 2px 0px #f0f0f0;
    border-radius: 10px;

    >div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .input {
        margin-bottom: 10px;
    }

    p {
        margin-top: 50px;
    }

    .button {
        margin-top: 20px;
        color: black;
    }
}

.overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: lightgray;
}

.delete-icon {
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;

    &:active {
        border-radius: 100%;
        box-shadow: 0 0 2px 1px lightgrey;
    }
}
</style>









































