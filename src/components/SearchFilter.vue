<template>
    <div >
        <div class="content" >
            <span class="heads">Search for Meetings</span>
            <span class="after-head "></span>
            <label for="date-select">Date</label>
            <select id="date-selection" v-model="period" >
                <option value="all">All</option>
                <option value="present">Today</option>
                <option value="past">Past</option>/
                <option value="future">Upcoming</option>
            </select>
            <label for = 'desc' >Search for</label>
            <textarea id = 'desc' v-model="search" ></textarea>
            <button class="content-button border" @click="getSearchedMeetings()">Search</button>
        </div>
        <p id="sub-title">Meetings matching search criteria</p>
        <hr />
        <Loading v-if= "status === 'Loading'" />
        <div v-if= "meetingStatus === 'Not Found'"> 
            <div class="d-flex justify-content-center my-4">
                <div class="alert" role="alert">
                    <header class="font-weight-bolder text-center">No Meeting Present</header>
                </div>
            </div>
        </div>
        <div class="main-box" v-else-if= "status === 'Loaded'">
            <SearchResults :searchMeetings="searchMeetings"  />    
        </div>            
        <Alert v-else-if= "status === 'Error'" theme="danger">
            <template v-slot:heading><span>Error</span></template>
            <template v-slot:body>{{error.message}}</template>
        </Alert>
    </div>
</template>

<script>
import SearchResults from './SearchResults';
import { getMeetings } from '@/services/meetings';

export default {
    name: 'SearchFilter',
    title: 'Search/Filter Meeting',
    components:{
        SearchResults
    },
    data() {
        return {
        status: "Loading",
        meetingStatus: null,
        searchMeetings: [],
        error: null,
        period: 'all',
        search: null
        };
    },
    methods: {
        async getSearchedMeetings(){
            try {
                const data = await getMeetings( this.period,this.search );
                this.status = "Loaded";
                this.searchMeetings = data;
                if( data.length === 0 ){
                    this.meetingStatus = "Not Found"; 
                }
            } catch (error) {
                this.status = "Error";
             this.error = error;
        }}
    },
    async created() {
        try {
            const data = await getMeetings( this.period,this.search );
            this.status = "Loaded";
            this.searchMeetings = data;
            if( data.length === 0 ){
                this.meetingStatus = "Not Found"; 
            }
        } catch (error) {
            this.status = "Error";
            this.error = error;
        }
    }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
*{
    font-family: 'Montserrat', sans-serif;
    color:#25233f;
}
.content{
    background-color: #EDE9FE;
    padding: 20px 30px;
    margin: 0;
    border-radius: 4px;
    border-top-left-radius:0;
}
span,label,input,textarea,small,select{
    margin: 5px;
    display: block;
}  
.heads{
    font-size: 20px;
    margin-bottom: 8px;
}  
.after-head, hr{
    border: 0;
    border-top:1px solid #25233f;
}
input,select{
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
label{
    margin-bottom: 9px;
    margin-top: 14px;
}
.content-button{
    border: none;
    border-radius: 4px;
    background-color: #b9d9f0;
    margin: 9px;
    padding: 8px;
    cursor: pointer;
}
#sub-title{
    font-size: 22px;
    margin: 10px;
}
.main-box{
    display: flex;
    margin: 20px 0;
    flex-direction: column;
    /* justify-content: center; */
}
.alert{
    background-color:#EDE9FE;
}
</style>