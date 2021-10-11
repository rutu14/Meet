<template>
    <transition name="modal" v-if= "status === 'Loaded'">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <h5 class="text-center">Add Team</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" @click="$emit('close')">✖</span>
                            </button>
                            <label class="form" for="team-name">Team Name</label>
                            <input type="text"  id="team-name"  v-model="addteams.name"
                            @blur="$v.addteams.name.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.addteams.name),
                                'is-valid': shouldAppendValidClass($v.addteams.name)
                            }"/>
                            <div v-if="!$v.addteams.name.required" 
                            :state="$v.addteams.name.$dirty ? !$v.addteams.name.$anyError : null"
                             class="error-message">
                                <small>Name is required</small>
                            </div>

                            <label class="form" for="team-id">Team ID</label>
                            <input type="text"  id="team-id" v-model="addteams.shortName"
                            @blur="$v.addteams.shortName.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.addteams.shortName),
                                'is-valid': shouldAppendValidClass($v.addteams.shortName)
                            }"/>
                            <div v-if="!$v.addteams.shortName.required" class="error-message">
                                <small>ShortName is required</small>
                            </div>
                            
                            <span class="form" >Description</span>
                            <textarea v-model="addteams.description"></textarea>
                            <span class="form" >Email ID of attendees OR Team's ID</span>
                            <input type="email" list="users" id="emailinput" v-model="addedEmail" @change="member(addedEmail)">
                            <datalist id="users" >
                                <option v-for="user in userEmailList" :key="user.id">{{user.email}}</option>
                            </datalist>
                            <div class="emailbox" style="height: 5rem;">
                                <span class="badge" v-for="user in addteams.members" :key="user.id" >
                                    {{user.email}}
                                </span>
                            </div>
                            <small class="d-block my-3">Use comma to seperate the Email ID or Team ID ~ use @ for Team ID</small>
                            <button class="form-button" :disabled="$v.addteams.$invalid" @click.prevent="AddNewTeam">Add Team</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <Alert v-else-if= "status === 'Error'" theme="danger">
            <template v-slot:heading><span>Error</span></template>
            <template v-slot:body>{{error.message}}</template>
    </Alert>
</template>

<script>
import {  required } from 'vuelidate/lib/validators';
import { addTeams } from '@/services/teams';
import {getUsers} from '@/services/users';

export default {
    name: 'Addteam',
    title: 'Add Team',
    data(){
        return {
            status: null,
            addteams: {
                name: '',
                shortName: '',
                description: '',
                members: []
            },
            addedEmail: '',
            userEmailList: [],
        }
    },
    computed: {        
        newTeamsDetails() {
            return {
                ...this.addteams, 
            };
        }
    },
    validations: {
        addteams: {
            name: {
                required
            },
            shortName:{
                required
            }
        }
    },
    methods: {
        member(addedEmail){
            let emailObj= {
                email:addedEmail
            };
            this.addteams.members.push(emailObj);
            this.addedEmail = ' ';
        }, 
        async AddNewTeam(){
            try {
                this.$v.addteams.$touch();
                if( !this.$v.addteams.$invalid ) {
                    await addTeams( this.newTeamsDetails );
                    window.location.reload();
                }
            }catch( error ) {
                this.status = "Error";
                this.error = error;
            }
        },
            shouldAppendValidClass( field ) {
                return !field.$invalid && field.$model && field.$dirty;
            },
            shouldAppendErrorClass( field ) {
                return field.$error;
            }
    },
    async created() {
        try {
            this.status = 'Loaded';
            const data = await getUsers();        
            this.userEmailList = data;            
            return this.userEmailList;
        } catch (error) {
            this.status = "Error";
            this.error = error;
            console.error(error);
        }
    }  
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
*{
    font-family: 'Montserrat', sans-serif;
    line-height: 1.15;
}
button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
    position: relative;
    top: -29px;
}
input{
    padding: 5px;
    border: 1px solid #25233f;
    border-radius: 5px;
}
textarea{
    width: 95%;
    height: 60px;
    border: 1px solid #25233f;
    border-radius: 5px;
}
.form{
    margin:9px 0;
    display: block;
}
.form-button{
    display: block;
    border: none;
    border-radius: 4px;
    background-color: #b9d9f0;
    margin: 20px auto;
    padding: 8px;
    cursor: pointer;
}
#emailinput{
    width: 95%;
}
.badge{
    background-color:#b9d9f0;
    margin: 2px;
}
.emailbox{
    height: 5rem;
    overflow-y: auto;
}
.emailbox::-webkit-scrollbar-track{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 5px;
	background-color: #F5F5F5;
}
.emailbox::-webkit-scrollbar{
	width: 9px;
	background-color: #F5F5F5;
}
.emailbox::-webkit-scrollbar-thumb{
	border-radius: 5px;
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #b9d9f0;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: table;
    transition: opacity .3s ease;
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
.modal-content{
    background-color: #EDE9FE;
    padding: 20px 25px 0 25px;
    border-radius: 4px;
}
</style>