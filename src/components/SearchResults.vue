<template>
    <div>
        <div class="box d-block p-3 m-x-auto" v-for="(searchMeeting, index) in searchMeetings" :key="index" >
            <span class="date">{{ searchMeeting.date | date }}</span>
            <span class="time">
                {{ searchMeeting.startTime.hours }}:{{ searchMeeting.startTime.minutes }}  
                 - 
                {{ searchMeeting.endTime.hours }}:{{ searchMeeting.endTime.minutes }} </span>
            <span class="meeting-name d-block">{{ searchMeeting.name }}</span>
            <button class="excused border-0" @click="removeYourself(searchMeeting._id)" >Excuse Yourself</button>
            <hr class="boxline" >
            <span class="members"><strong> Attendees: </strong>
                <span class="badge" v-for="attendees in searchMeeting.attendees" :key="attendees.id">
                    {{attendees.email}}
                </span>
            </span>
            <AddMember :id="searchMeeting._id" :userList="userEmailList"></AddMember>
            <!-- <div class="input-add d-flex"> -->
                <!-- <input class="add d-inline " v-show="searchMeeting" list="users" type="email" v-model="addedEmail[index]"> -->
                <!-- <datalist id="users" >
                    <option v-for="user in userEmailList" :key="user.id">{{user.email}}</option>
                </datalist> -->
                <!-- <button class="added border-0" @click.prevent="addnewMembers(searchMeeting._id)">Add</button> -->
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import AddMember from './AddMember';
import { addMember, removeSelf } from '@/services/meetings';
import {getUsers} from '@/services/users';

export default {
    name: 'SearchResults',
    components:{
        AddMember
    },
    props:{
        searchMeetings:{
            type: Array
        }
    },
    data(){
        return {
            userEmailList:[],
            addedEmail: ' '
        }
    },
    methods: {
        async addnewMembers( id ) {
            try {
                console.log( this.addedEmail );
                console.log( id );
                const meeting = await addMember( id, this.addedEmail );
                console.log("Added email ", meeting );
                // window.location.reload();
            } catch( error ) {
                alert( error.message );
            }
        },
        async removeYourself( id ) {
            try {
                console.log( id );
                const meeting1 = await removeSelf( id );
                console.log("removed email ", meeting1 );
                console.log("removed email ");
                window.location.reload();
            } catch( error ) {
                alert( error.message );
            }
        }
    },    
    async created() {
        try {
            const data = await getUsers();        
            this.userEmailList = data;
            return this.userEmailList;
            // this.status = "LOADED";
            // this.meetings = data;
            // console.log("calendar page", this.meetings);
        } catch (error) {
            this.status = "ERROR";
            console.error(error);
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
.box{
    border: 1px solid #a1aed3;
    border-radius: 5px;
    margin: 20px 0;
}
.excused{
    padding: 9px;
    font-size: 14px;
    border-radius: 3px;
    background-color: #f8cbd2;
    cursor: pointer;
}
.added{
    margin-left: 10px;
    padding: 8px;
    font-size: 14px;
    border-radius: 3px;
    background-color: #b9d9f0;
    cursor: pointer;
    margin: 5px;
}
.boxline{
    margin: 15px 0;
    border-top: 1px solid  #25233f;
}
.date{
    font-size: 20px;
    font-weight: 600;
}
.time{
    font-size: 15px;
    margin: 10px 0;
}
.meeting-name{
    line-height: 1.3rem;
    font-size: 15px;
    margin-bottom: 10px;
}
.add{
    padding: 5px;
    border: 1px solid #25233f;
    border-radius: 5px;
}
span, input, select {
    margin: 5px;
}
.badge{
    background-color:#EDE9FE;
    color: #25233f;
    margin: 0 2px;
}
</style>
