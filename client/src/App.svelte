<script>
	import {Route} from 'svelte-routing'
	import {onMount} from 'svelte'
	import NavBar from './components/NavBar.svelte'
	import Home from './pages/Home.svelte'
    import TempPage from './pages/TempPage.svelte';
	
	import SS from './components/SplashScreen.svelte'
	
	let showSplashScreen = true

	onMount(() => {
		setTimeout(() => {showSplashScreen = false}, 5000)
	})
</script>
{#if showSplashScreen}
	<SS />
{:else}
<main>
	<NavBar >
		<Route path="/" component="{Home}" />
		<Route path="/temp">
			<TempPage /> 
		</Route>
	</NavBar>
</main>
{/if}

