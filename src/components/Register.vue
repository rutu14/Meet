<template>
    <div class="limiter">
		<div class="container-login justify-content-around flex-column">
			<div  v-show="ifSuccessful">
				<Alert theme="success">
					<template v-slot:heading><span>You are registered.</span></template>
					<template v-slot:body><br/>Go Back to <router-link :to="`/`"> Login Page </router-link> to sign in.</template>
				</Alert>
			</div>
			<div  v-show="ifUnsuccessful">
				<Alert theme="danger">
					<template v-slot:heading><span>Email already exists</span></template>
				</Alert>
			</div>
			<div class="wrap-login ">
				<form class="register-form">
					<span class="login-form-title" >Register</span>
					<div class="wrap-input input1">
						<label class="label-input">Username</label>
						<input class="input" id="inpreg1" type="text" name="username" v-model="regform.name"
						@blur="$v.regform.name.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.regform.name),
                                'is-valid': shouldAppendValidClass($v.regform.name)
                            }"  >
					</div>
                    <span id="error1">
						<div v-if="$v.regform.name.$error">
							<div v-if="!$v.regform.name.required" class="error-message">
								Name is required !
							</div>
						</div>
					</span>
					<div class="wrap-input input2" >
						<label class="label-input">Email</label>
						<input class="input" id="inpreg2" type="email" name="email" v-model="regform.email" 
						@blur="$v.regform.email.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.regform.email),
                                'is-valid': shouldAppendValidClass($v.regform.email)
                            }"  >
					</div>
                    <span id="error2">
						<div v-if="$v.regform.email.$error">
                            <div v-if="!$v.regform.email.required" class="error-message">
                                Email is required !
                            </div>
                            <div v-if="!$v.regform.email.email" class="error-message">
                                Invalid Email address...
                            </div>
                        </div>
					</span>
                    <div class="wrap-input input3" >
						<label class="label-input">Password</label>
						<input class="input" id="inpreg3" type="password" name="pass" v-model="regform.password" 
						@blur="$v.regform.password.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.regform.password),
                                'is-valid': shouldAppendValidClass($v.regform.password)
                            }">
					</div>
                    <span id="error3">
						<div v-if="$v.regform.password.$error">
                            <div v-if="!$v.regform.password.required" class="error-message">
                                Password is required!
                            </div>
                            <div v-if="!$v.regform.password.minLength" class="error-message">
                                Password must have at least 8 characters.
                            </div>
                            <div v-if="!$v.regform.password.containsUppercase" class="error-message">
                                Password must have at least 1 uppercase character.
                            </div>
                            <div v-if="!$v.regform.password.containsLowercase" class="error-message">
                                Password must have at least 1 lowercase character.
                            </div>
                            <div v-if="!$v.regform.password.containsNumber" class="error-message">
                                Password must have at least 1 digit.
                            </div>
                            <div v-if="!$v.regform.password.containsSpecial" class="error-message">
                                Password must have at least 1 special character.
                            </div>
                        </div>
					</span>					
					<button type="button" class="login-form-btn" id="regbtn" @click="register()">Register</button>
					<router-link :to="`/`" id="back" class="txt2">Back to login</router-link>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { email, required, minLength  } from 'vuelidate/lib/validators'
import {register} from "@/services/register";
export default {
        name: 'AppRegister',
        title: 'Register',
        data() {
            return {
                regform: {
                    name:'',
                    email: '',
                    password: ''
                },
                ifSuccessful: false,
				ifUnsuccessful: false
            };
        },
         validations: {
            regform: {
				name:{
					required
				},
                email: {
                    email,
                    required
                },
                password: {
                    required,
                    minLength: minLength( 8 ),
                    containsUppercase: function(value) {
                        return /[A-Z]/.test(value)
                    },
                    containsLowercase: function(value) {
                        return /[a-z]/.test(value)
                    },
                    containsNumber: function(value) {
                        return /[0-9]/.test(value)
                    },
                    containsSpecial: function(value) {
                        return /[#?!@$%^&*-]/.test(value)
                    }
                }
            }},
        methods: {
            async register(){
                try {
					this.$v.regform.$touch();
					if( !this.$v.regform.$invalid ) {
						const data = await register( this.regform );
						if(data.status === 204){
							this.ifSuccessful= true ;
						}
						this.status = "LOADED";
					}
                }catch (error) {
					this.status = "ERROR";
					this.error = error;
					if ( error.response.status === 409  ){
							this.ifUnsuccessful = true;
						}
				}
			},
			shouldAppendValidClass( field ) {
                return !field.$invalid && field.$model && field.$dirty;
            },
			shouldAppendErrorClass( field ) {
                return field.$error;
            }
        }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700&display=swap');
*{
	margin: 0px; 
	padding: 0px; 
	box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}
.limiter {
  width: 100%;
  margin: 5rem auto;
}
.container-login {
  width: 100%;  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.wrap-login {
  width: 300px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px 25px;
  border: 1px solid black;
}

.login-form {
  width: 100%;
}

.login-form-title {
  display: block;
  font-weight: medium;
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
  padding-bottom: 20px;
}

.wrap-input {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
  margin-bottom: 10px;
}

.label-input {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
  padding-left: 7px;
}

.input {
  font-weight:medium;
  font-size: 16px;
  color: #333333;
  line-height: 1.2;
  margin: 0;
  display: block;
  width: 100%;
  height: 25px;
  background: transparent;
  padding: 0 7px;
}

.text-right {
  text-align: right;
  padding-top: 8px;
  padding-bottom: 31px;
}

.login-form-btn {
  font-weight: medium;
  font-size: 20px;
  color: #374151;
  line-height: 1.2;
  text-transform: uppercase;
  background-color: #DDD6FE;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  width: 60%;
  height: 40px;
  margin: auto;
  border-radius: 5px;
}

.txt1 {
  font-size: 14px;
  line-height: 1.5;
  color: #666666;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 17px;
  display: block;
}

.txt2 {
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
  text-transform: uppercase;
  display: block;
  text-align: center;
}

a {
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  text-decoration: none;
}

a:focus {
	outline: none !important;
}

a:hover {
	text-decoration: none;
  color: #A78BFA;
}

input {
	outline: none;
	border: none;
}

button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

#error1,#error2,#error3{
  font-size: 10px;
  color: #c80000;
  margin-bottom: 10px;
}

#regbtn{
  margin-top: 40px;
}

#back{
  margin:14px;
}



</style>

