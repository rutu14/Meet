<template>
    <div> 
        <Alert  v-if = "addedMember === 'Done'" theme="success" class="alertt" >
            <template v-slot:heading><span >Added Member</span></template>
        </Alert>
        <div v-if= "status === 'Loaded'" >
            <input list="users" type="email" v-model="addedEmail">
                <datalist id="users" >
                    <option v-for="user in userEmailList" :key="user.id">{{user.email}}</option>
                </datalist>
            <button class="added border-0" @click.prevent="AddMember(id)">Add</button>
        </div>
        <Alert v-else-if= "status === 'Error'" theme="danger" class="alertt">
            <template v-slot:heading><span>Error</span></template>
            <template v-slot:body>{{error.message}}</template>
        </Alert>
    </div>
</template>

<script>
import { addMemberToTeam } from '@/services/teams';
import {getUsers} from '@/services/users';

export default{
    name: 'AddMeeting',    
    props:{
        id:{
            type: String
        }
    },
    data(){
        return {
            status: null,
            addedEmail: ' ',
            userEmailList: [],
            addedMember: null
        }
    },
    methods: {
        async AddMember( id ){
            try {
                await addMemberToTeam( id, this.addedEmail );
                window.location.reload();
                this.addedMember = 'Done';
            } catch( error ) {
                this.status = "Error";
                this.error = error;
                console.error(error);
            }
        },
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
}
</script>

<style scoped>
.added{
    margin-left: 10px;
    border: none;
    padding: 8px;
    font-size: 14px;
    border-radius: 3px;
    background-color: #b9d9f0;
    cursor: pointer;
}
input{
    padding: 5px;
    border: 1px solid #25233f;
    border-radius: 5px;
}
.alertt{
    position: fixed;
    top: 10%;
    left: calc(45%);
}
</style>
