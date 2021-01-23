<script>
    import CardPuskesmas from '../components/CardPuskesmas.svelte'
    import {fly} from 'svelte/transition'
    import {baseURL} from '../store/store.js'
    import axios from 'axios'
    export let location

    const getdata = async () => {
        let url = $baseURL+'/pk'
        let res = await axios.get(url)
        return res.data.puskesmas
    }

    let data = getdata()
    
</script>
<main class="py-2 px-1 mt-3 sm:px-32 md:px-48 lg:px-72" in:fly={{x :-300, duration:300}} out:fly={{x : 300, duration:300}}>
    {#await data}
    <p class="text-white">loading..</p>
    {:then value}
        {#each value as p}
            <CardPuskesmas {...p} />
        {/each}
    {:catch error}
    <p class="text-red-500 font-semibold">{error}</p>
    {/await}
    
    
</main>
    