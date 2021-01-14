<script>
	import {Route} from 'svelte-routing'
	import {onMount} from 'svelte'
	import NavBar from './components/NavBar.svelte'
	import Home from './pages/Home.svelte'
	import Login from './pages/Login.svelte'
	// import { showSplashScreen} from './store/store.js'
	import SS from './components/SplashScreen.svelte'
	import Queue from './pages/Queue.svelte';
	import DetailPuskesmas from './pages/DetailPuskesmas.svelte';
	let showSplashScreen = true
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
		<Route path="/queue" component="{Queue}" />
		<Route path="/detailPuskesmas" component="{DetailPuskesmas}" />
	</NavBar>
</main>
{/if}

