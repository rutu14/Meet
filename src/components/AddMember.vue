<template>
        <div  v-if= "status === 'Loaded'" > 
            <Alert  v-if = "addedMember === 'Done'" theme="success" class="alertt" >
                <template v-slot:heading><span >Added Member</span></template>
            </Alert>
            <input class="add d-inline " list="users" type="email" v-model="addedEmail">
                <datalist id="users" >
                    <option v-for="user in userList" :key="user.id">{{user.email}}</option>
                </datalist>
            <button class="added border-0" @click.prevent="addnewMembers(id)">Add</button>
        </div>
        <Alert v-else-if= "status === 'Error'" theme="danger">
            <template v-slot:heading><span>Error</span></template>
            <template v-slot:body>{{error.message}}</template>
        </Alert>
        
</template>

<script>
import { addMember } from '@/services/meetings';

export default{
    name: 'AddMeeting',    
    props:{
        id:{
            type: String
        },
        userList:{
            type:Array
        }
    },
    data(){
        return {
            addedEmail: ' ',
            status: null,
            addedMember: null
        }
    },
    methods: {
        async addnewMembers( id ) {
            try {
                await addMember( id, this.addedEmail );
                window.location.reload();
                this.addedMember = 'Done';
            } catch( error ) {
                this.status = "Error";
                this.error = error;
                console.error(error);
            }
        }
    },
    async created() {
        try {
            this.status = 'Loaded';
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
    padding: 8px;
    font-size: 14px;
    border-radius: 3px;
    background-color: #b9d9f0;
    cursor: pointer;
    margin: 5px;
}
span, input, select {
    margin: 5px;
}
.add{
    padding: 5px;
    border: 1px solid #25233f;
    border-radius: 5px;
}
.alertt{
    position: relative;
    top: -120px;
    left: 0;
    margin: 0 !important;
}
</style>
