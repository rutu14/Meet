<template>
    <div class="container">
        <p class="title">Meetings</p>
        <hr >
        <ul class="nav nav-pills ">
            <li class="nav-item ">
                    <router-link class="nav-link" :to="{name: 'SearchFilter'}" >Search/Filter meetings</router-link>                
            </li>
            <li class="nav-item ">
                    <router-link class="nav-link" :to="{name: 'AddMeetings'}"  >Add a Meeting</router-link>                
            </li>
        </ul>
       
        <router-view></router-view>
   
   
  </div>
</template>

<script>
export default {
    name: 'Meetings',
    title: 'Meeting',
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
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 26px;
    margin-bottom: 10px;
}
hr{
    border: 0;
    border-top: 1px solid  #25233f;
}
.nav-item{
    padding: 10px 4px 0 0;
    cursor: pointer;
    transition: 0.5s;
}
.router-link-exact-active{
    background-color: #EDE9FE;
    border-radius: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.nav-link{
    padding-bottom:10px;
    color: #232c3d;    
    font-size: 15px;
    text-decoration: none;
}
</style>