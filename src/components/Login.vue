<template>
<div class="limiter">
		<div class="container-login" >
			<div  v-show="ifUnsuccessful">
				<Alert theme="danger">
					<template v-slot:heading><span>Credentials don't match</span></template>
				</Alert>
			</div>
			<div class="wrap-login ">
				<form class="login-form" name="form" @submit.prevent="login" >
					<span class="login-form-title">Login</span>
					<div class="wrap-input input1" >
						<span class="label-input">Email</span>
						<input class="input" id="inp1" type="email" name="emailID" v-model="form.email" @blur="$v.form.email.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.email),
                                'is-valid': shouldAppendValidClass($v.form.email)
                            }" >
					</div>
					<span id="error1">
						<div v-if="$v.form.email.$error">
                            <div v-if="!$v.form.email.required" class="error-message">
                                Email is required !
                            </div>
                            <div v-if="!$v.form.email.email" class="error-message">
                                Invalid Email address
                            </div>
                        </div>
					</span>
					<div class="wrap-input input2">
						<span class="label-input">Password</span>
						<input class="input" id="inp2" type="password" name="pass" v-model="form.password"
						@blur="$v.form.password.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.password),
                                'is-valid': shouldAppendValidClass($v.form.password)
                            }" >
					</div>
					<span id="error2">
						<div v-if="$v.form.password.$error">
						<div v-if="!$v.form.password.required" class="error-message">
                                Password is required !
                            </div>
						</div>
					</span>					
					<div class="text-right"><a href="#">Forgot password?</a></div>
					<button type="submit"  class="login-form-btn">Login</button>
					<span class="txt1">Or Sign Up Using</span>
					<router-link :to="`/register`" class="txt2">Sign Up</router-link>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { email, required,  } from 'vuelidate/lib/validators';

export default {
    name: 'AppLogin',
    title: 'Login',
    data() {
        return {
            processing: false,
            form: {
                email: '',
                password: ''
            },
			ifUnsuccessful: false,
			errorStatus: ''
        };
    },
    validations: {
            form: {
                email: {
                    email,
                    required
                },
                password: {
                    required
                }
            }},
    methods: {
        login() {
				this.$v.form.$touch();
                if( !this.$v.form.$invalid ) {
					this.$store.dispatch( 'login', this.form )
					.then( () => {
						this.$router.push( { name: 'calendar' } );
						} )
					.catch( error => {
						alert(error);
						console.log(error)
						// this.errorStatus = error.data.status;'Request failed with status code 401'
						if ( error.status === 401  ){
							this.ifUnsuccessful = true;
						}
					});
				
        }
        },
		shouldAppendValidClass( field ) {
                return !field.$invalid && field.$model && field.$dirty;
            },
        shouldAppendErrorClass( field ) {
                return field.$error;
            }
    }
};
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