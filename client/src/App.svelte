<script>
	import {Route} from 'svelte-routing'
	import {onMount} from 'svelte'
	import NavBar from './components/NavBar.svelte'
	import Home from './pages/Home.svelte'
	import Login from './pages/Login.svelte'
	import SS from './components/SplashScreen.svelte'
	import Queue from './pages/Queue.svelte';
	import LoginAdmin from './pages/LoginAdmin.svelte';
import LoginAdminPuskesmas from './pages/LoginAdminPuskesmas.svelte';
	
	let showSplashScreen = false
	onMount(() => {
		setTimeout(() => {showSplashScreen = false}, 5000)
	})
</script>
{#if showSplashScreen}
	<SS />
{:else}
<main class="bg-blue-803 min-h-screen relative" >
	<NavBar >
		<Route path="/" component="{Home}" />
		<Route path="/login">
			<Login /> 
		</Route>
		<Route path="/queue/:id" let:params >
			<Queue id="{params.id}"/>
		</Route>
		<Route path="/authadmin" component={LoginAdmin} />
		<Route path="/auth" component={LoginAdminPuskesmas} />
	</NavBar>
</main>
{/if}

