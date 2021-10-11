<template>
    <div class="container">
        <p class="title">Calendar</p>
        <hr>
        <Loading v-if= "status === 'Loading'" />
        <div v-else-if= "status === 'Loaded'">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column">
                    <span id="date">{{ selectedDate | date }}</span>
                    <span id="day">{{ selectedDate | day }}</span>
                </div>
                <input class="align-self-center" type="date" id="datepicker" v-model="selectedDate" @change="gettheMeetings()" >                        
            </div>        
            <div class="newplac" v-for = "( n, hr ) in 24" :key = "hr">
                <span class="hrs" >{{hr}}</span>
                <div  v-for="meeting in meetings" :key="meeting.id">
                    <div class="position-absolute" v-if="meeting.startTime.hours === hr">
                        <div class="meet1" >
                            <p class="meet-name">{{meeting.name}}</p>
                            <hr class="line">
                            <p class="meet-members">Attendees :
                                <span v-for="attendee in meeting.attendees" :key="attendee.id">
                                    {{attendee.email}}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>            
                <div class="placing"></div>
            </div>
        </div>
        <Alert v-else-if= "status === 'Error'">
            <template v-slot:heading><span>Error</span></template>
            <template v-slot:body>{{error.message}}</template>
        </Alert>
    </div>        
</template>

<script>
import { getCalendar } from "@/services/calendar";

export default {
    name: 'Calendar',
    title: 'Calendar',
    computed: {

    },
    data() {
        return {
        status: "Loading",
        meetings: [],
        error: null,
        selectedDate: new Date().toISOString().substr( 0, 10 )
        };
    },
    methods: {
        async gettheMeetings(){
            try {
                // console.log(this.selectedDate)
                const data = await getCalendar( this.selectedDate );
                // console.log( data );
                this.status = "Loaded";
                this.meetings = data;
                // console.log("calendar page", this.meetings);
            } catch (error) {
                this.status = "Error";
                this.error = error;
            }
        }
    },  
    async created() {
        try {
            // console.log(this.selectedDate)
            const data = await getCalendar( this.selectedDate );
            // console.log( data );
            this.status = "Loaded";
            this.meetings = data;
            console.log(this.status)
            // console.log("calendar page", this.meetings);
        } catch (error) {
            this.status = "Error";
            this.error = error;
        }
    }
};
    
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
:root {
    --dark-gray: #a1aed3;
    --primary-color: #EDE9FE;
    --dark-blue:#25233f;
    --lighter-blue:#3b3952;
}
*{
    font-family: 'Montserrat', sans-serif;
    line-height: 1.15;
}
template{
    font-family: 'Montserrat', sans-serif;
    background-color: #EDE9FE;    
    color: #3b3952;
}
.title{
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    margin-top: 26px;
    margin-bottom: 10px;
}
hr{
    border: 0;
    border-top: 1px solid  #25233f;
    margin: 8px 0;
}
#datepicker{
    margin-right: 2rem;
    /* border: 1.2px solid var(--dark-blue); */
    border-radius: 5px;
    padding: 4px;
}
#date{
    margin: 5px;
    color: var(--dark-blue);
    font-size: 24px;
    padding: 0;
}
#day{
    margin: 5px;
}
.schedule{
    margin: 10px;
}
.placing{
    background-color: #C4B5FD;
    height: 50px;
    flex-grow: 5;
    margin-bottom: 5px;
}
.place{
    display: flex;
    flex-direction: column;
    margin: 10px;
}
.newplac{
    display: flex;
}
.hrs{
    padding: 2px;
    width: 20px;
    margin: 5px;
    color: var(--lighter-blue);
}
.meet1{
    /* height: 40px; */
    background-color: wheat;
    font-size: 15px;
    padding: 3px;
    z-index: 3;
    margin: 2px 5px;
    width: 92%;
    /* right: 2px; */
    /* position: absolute; */
}
.meet-name,.meet-members{
    margin: 0;
    padding: 1px;
}
.line{
    margin: 0;
}
.position-absolute{
    z-index: 1;
}
</style>