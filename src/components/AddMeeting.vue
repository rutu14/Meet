<template>
    <div>
        <form novalidate @submit.prevent="addMeeting">
            <div class="content m-0">
                <span class="heads">Add a Meeting</span>
                <span class="after-head "></span>
                <label for="name">Name</label>
                <input type="text"  id="name" v-model="meetingDetails.name"
                @blur="$v.meetingDetails.name.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.meetingDetails.name),
                                'is-valid': shouldAppendValidClass($v.meetingDetails.name)
                            }"/>
                            <div v-if="!$v.meetingDetails.name.required" 
                            :state="$v.meetingDetails.name.$dirty ? !$v.meetingDetails.name.$anyError : null"
                             class="error-message">
                                <small>Name is required</small>
                            </div>

                <label for="date-picker">Date</label>
                <input type="date"  id="date-picker" v-model="meetingDetails.date">
                <label for="start-hr-select">Start Time (hr:min)</label>
                <select id="start-hr-select" class="hr-select" v-model="meetingDetails.startTime.hours">                 
                    <option value="0" selected >0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                </select>

                <label class="colon" for="start-min-select">:</label>
                <select id="start-min-select" class="min-select" v-model="meetingDetails.startTime.minutes" >
                    <option value="0" selected >0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                </select>

                <label for="end-hr-select">End Time (hr:min)</label>
                <select id="end-hr-select" class="hr-select" v-model="meetingDetails.endTime.hours" >
                    <option value="0" selected>0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                </select>

                <label class="colon" for="end-min-select">:</label>
                <select id="end-min-select" class="min-select" v-model="meetingDetails.endTime.minutes" >
                    <option value="0" selected >0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                </select>
                <label for="desc">Description</label>
                <textarea id="desc" v-model="meetingDetails.description" ></textarea>
                <label for="email">Email ID of attendees OR Team's ID</label>
                <input list="users" type="email" id="email" v-model="emaill" @change="attendee(emaill)" >
                <datalist id="users" >
                    <option v-for="user in userEmailList" :key="user.id">{{user.email}}</option>
                </datalist>
                <span class="badge" v-for="user in meetingDetails.attendees" :key="user.id" >
                    {{user.email}}</span>
                <small>Use comma to seperate the Email ID or Team ID ~ use @ for Team ID</small>
                <button class="content-button" :disabled="$v.$invalid" type="submit" >Add Meeting</button>
            </div>
        </form>
        <Alert v-if= "status === 'Error'" theme="danger">
            <template v-slot:heading><span>Error</span></template>
            <template v-slot:body>{{error.message}}</template>
        </Alert>
  </div>
</template>
<script>
import {  required } from 'vuelidate/lib/validators';
import { addMeetings } from '@/services/meetings';
import {getUsers} from '@/services/users';

export default {
    name: 'AddMeetings',
    title: 'Add Meeting',
    data(){
        return {
            status: null,
            meetingDetails: {
                date: new Date().toISOString().substr( 0, 10 ),
                startTime:{
                    hours:0,
                    minutes:0
                },
                endTime: {
                    hours:0,
                    minutes:0
                },
                name: '',
                description: '',
                attendees: []
            },
            userEmailList:[],
            emaill: ' '
        }
    },
    computed: {        
        newMeetingsDetails() {
            console.log("computed", this.meetingDetails);
            return {
                ...this.meetingDetails, 
            };
        }
    },
    validations: {
        meetingDetails: {
            name: {
                required
            }
        }
    },
    methods: {
        attendee(emaill){
            let emailobj = { email: emaill }
            this.emaill= ' ';
            this.meetingDetails.attendees.push(emailobj);
        },
        async addMeeting() {
            try {
                this.$v.$touch();
                if( !this.$v.$invalid ) {
                    await addMeetings( this.newMeetingsDetails );
                    this.$router.push({ name: 'SearchFilter' });
                }
            } catch( error ) {
                this.status = "Error";
                this.error = error;
                // this.error.message = error.response.data.message;
                // console.log(error.response.data)
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
*{
    font-family: 'Montserrat', sans-serif;
    line-height: 1.15;
}
.content{
    background-color:#EDE9FE;
    padding: 20px 30px;
    border-radius: 4px;
}
span,label,input,textarea,small{
    margin: 5px;
    display: block;
}  
.heads{
    font-size: 20px;
    margin-bottom: 8px;
}  
.after-head{
    border: 0;
    border-top:1px solid #25233f;
}
input,.min-select,.hr-select{
    padding: 5px;
    border: 1px solid #25233f;
    border-radius: 5px;
}
.min-select,.hr-select{
    margin: 5px;
}
.colon{
    display: inline;
}
textarea{
    width: 95%;
    height: 60px;
    border: 1px solid #25233f;
    border-radius: 5px;
}
label,.label{
    margin-bottom: 9px;
    margin-top: 14px;
}
.content-button{
    border: none;
    border-radius: 4px;
    background-color: #b9d9f0;
    margin: auto calc(40%);
    padding: 8px;
    cursor: pointer;
}
#email,#name{
    width: 95%;
}
.badge{
    display: inline;
    background-color:#b9d9f0;
    margin: 5px 2px;
}
small{
    margin: 9px;
}
</style>