<template>
    <nav class="navbar navbar-expand navbar-light ">
        <div class="container px-2">
            <ul class="nav navbar-nav mr-auto">
                <li class="nav-item ">
                    <router-link class="nav-link" to="/calendar" active-class="active" exact>Calendar</router-link>                
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/meetings" active-class="active" exact>Meetings</router-link>
                </li>
                <li class="nav-item ">
                    <router-link class="nav-link" to="/teams" active-class="active" exact>Teams</router-link>
                </li>
            </ul>
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <span class="nav-link text-capitalize">
                        Hi {{name}}
                    </span>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/" @click="logout()">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'Navbar',
    computed: {
        email() {
            return this.$store.state.auth.email;
        },
        name() {
            return this.$store.state.auth.name;
        },        
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch( 'logout' )
                .then( () => this.$router.push( { name: 'login' } ) );
        }
    },
    // async created(){
    //         try {
    //         console.log(this.email)
    //         const data = await getUsers();
    //         console.log( data );
    //         let obj = data.find(o => o.email === this.email);
    //         // console.log(obj);
    //         console.log(obj.name);
    //         // this.status = "LOADED";
    //         // this.meetings = data;
    //         // console.log("calendar page", this.meetings);
    //     } catch (error) {
    //         this.status = "ERROR";
    //         this.error = error;
    //     }}  
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
nav{
    font-family: 'Montserrat', sans-serif;
    background-color: #EDE9FE;    
    color: #3b3952;
}
</style>