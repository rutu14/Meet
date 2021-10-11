<template>
    <div class="container parent position-relative">
        <p class="title">Teams</p>
        <div class=" position-absolute d-flex flex-column" >
            <span class="pb-2">Show Description</span>
            <div class="px-5">
            <input class="pb-2" type="checkbox" name="switch" id="switch" @change="isDescriptionShown = !isDescriptionShown">
            <label class="pb-2" for="switch" id="slider"></label>
            </div>
        </div>
        <hr >
        <Loading v-if= "status === 'Loading'" />
        <Alert v-if = "excused === 'Done'" theme="success" >
            <template v-slot:heading><span>You're excused !</span></template>
        </Alert>
        <div class="boxes d-flex justify-content-around flex-wrap" v-else-if= "status === 'Loaded'" >
                <div class="card" style="width: 20rem;" v-for="team,index in teams" :key="index">
                    <div class="card-body">
                        <span class="heads card-title">{{team.name}}</span>
                        <span class="sub-heads card-text">@{{team.shortName}}</span>
                        <div class="desc card-text" v-show="isDescriptionShown">{{team.description}}</div>
                        <button class="excused card-text" @click="removeYourself(team._id)">Excuse Yourself</button>
                        <hr class="boxline card-text" >
                        <div class="members card-text" style="height: 4rem;" >
                            <strong @click="ViewMember( team)">Members</strong>:
                            <ViewMembers v-if="showMembers" :teams="teams" @close="showMembers = false" />
                            <span class="badge" v-for="members in team.members" :key="members.id">
                                {{members.email}}
                            </span>
                        </div>
                        <AddTeamMember :id="team._id" ></AddTeamMember>
                    </div>
                </div>
                <div class="box-add" style="width: 20rem;">
                    <span class="icon"  @click="showModal = true" >➕</span>
                    <AddTeam  v-if="showModal" @close="showModal = false"></AddTeam>
                </div>
        </div>
        <Alert v-else-if= "status === 'Error'" theme="danger">
            <template v-slot:heading><span>Error</span></template>
            <template v-slot:body>{{error.message}}</template>
        </Alert>
    </div>
</template>

<script>
import { getTeams,removeSelfFromTeam } from '@/services/teams';
import AddTeamMember from './AddTeamMember';
import ViewMembers from './ViewMembers';
import AddTeam from './AddTeam';

export default {
    name: 'Teams',
    title: 'Teams',
    components:{
        AddTeamMember,
        ViewMembers,
        AddTeam
    },
    data() {
        return {
        status: "Loading",
        teams: [],
        error: null,
        isDescriptionShown: false,        
        showModal: false,
        addEmail: '',        
        excused: null,
        showMembers: false,
        team:{}
        };
    },
    methods: {
        ViewMember( team ){
            this.teams.members= team.members;
            this.showMembers = true;
        },        
        async removeYourself( id ) {
            try {
                console.log( id );
                await removeSelfFromTeam( id );              
                window.location.reload();
                this.excused = 'Done';
            } catch( error ) {
                this.status = "Error";
                this.error = error;
            }
        }        
    },
    async created() {
        try {            
            console.log(this.teams)
            const data = await getTeams();
            console.log( data );
            this.status = "Loaded";
            this.teams = data;
            console.log("Teams Page", this.teams);
            if (data.length === 0 ){
                this.status = "Not Found"; 
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
    line-height: 1.15;
}
.title{
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 26px;
    margin-bottom: 10px;
}
hr{
    border: 0;
    border-top: 1px solid  #25233f;
}
.badge{
    background-color:#EDE9FE;
    margin: 0 2px;
}
.boxes{
    display: flex;
    margin-top: 15px;
    flex-flow: row wrap;
    justify-content: space-around;
}
.card{
    border: 1px solid #a1aed3;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
}
.box-add{
    width: 290px;
    border: 1px solid #a1aed3;
    padding: 20px;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
}
.icon{
    cursor: pointer;
}
.heads,.sub-heads,.desc,.members{
    display: block;
}
.heads{
    font-size: 20px;
    font-weight: 600;
    text-align: center;
}
.sub-heads{
    font-size: 15px;
    margin: 10px 0;
    font-weight: 600;   
}
.desc{
    line-height: 1.3rem;
    font-size: 15px;
    margin-bottom: 10px;
    min-width: 1rem;
}
.excused{
    border: none;
    padding: 9px;
    font-size: 14px;
    border-radius: 3px;
    background-color: #f8cbd2;
    cursor: pointer;
}
.boxline{
    margin: 15px 0;
}
.members{
    line-height: 1.3rem;
    font-size: 15px;
    margin-bottom: 1rem;
    overflow: hidden;  
}
input[type="checkbox"] {
  width: 0;
  height: 0;
  visibility: hidden;
}
#slider {
  width: 40px;
  height: 15px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 25px;
  position: relative;
  top: -2px;
  cursor: pointer;
  transition: 0.5s;
}
#slider::after {
  content: "";
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid black;
  position: absolute;
  border-radius: 50%;
  top: -3.5px;
  left: -2px;
  transition: 0s;
}
input:checked + #slider:after {
  left: 40px;
  transform: translateX(-100%);
}
input:checked + #slider {
  background-color: #C4B5FD ;
  border: 1px solid #C4B5FD;
}
.position-absolute{
    top: -5px;
    right: 10px;
}
</style>