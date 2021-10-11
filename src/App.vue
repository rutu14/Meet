<template>
	<div id="app" >
		<AppNavbar v-if="$route.meta.requiresNavbar" /> 
		<div class="container my-4">
			<router-view></router-view>
		</div>
		<AppFooter v-if="$route.meta.requiresFooter" />
	</div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  name: 'App',
  components : { 
    AppNavbar: Navbar,
	AppFooter: Footer
  }
}
</script>

<style scoped>
</style>
