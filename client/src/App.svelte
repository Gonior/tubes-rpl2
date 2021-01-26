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
import QueueManagement from './pages/QueueManagement.svelte'
import Admin from './pages/Admin.svelte';
	let keyword = ""
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
		<input slot="search" type="text" class="bg-transparent focus:border-gray-300 focus:outline-none border-b border-gray-600 w-full placeholder-gray-400 text-white mr-5" placeholder="Cari.." bind:value="{keyword}">
		<Route path="/" >		
			<Home {keyword}/>
		</Route>
		<Route path="/login">
			<Login /> 
		</Route>
		<Route path="/queue/:id" let:params >
			<Queue id="{params.id}"/>
		</Route>
		<Route path="/authadmin" component={LoginAdmin} />
		<Route path="/auth" component={LoginAdminPuskesmas} />
		<Route path="/pk/:id" let:params>
			<QueueManagement id={params.id}/>
		</Route>
		<Route path="/pk/a" component={Admin}/>
	</NavBar>
</main>
{/if}

