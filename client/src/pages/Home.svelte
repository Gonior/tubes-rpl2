<script>
    import CardPuskesmas from '../components/CardPuskesmas.svelte'
    import {baseURL} from '../store/store.js'
    import axios from 'axios'
    export let location
    export let keyword = ""
    
    $: data = getdata(keyword)
    
    const getdata = async (key) => {
        let url = $baseURL+'/pk'
        let res = await axios.get(url)
        let result = []; 
        if (key != "") {
            let pks = await res.data.puskesmas    

            if(pks.length > 0) {
                result = [...pks.filter(p => p.nama.toUpperCase().includes(key.toUpperCase()))]
            }
        } else result = [...await res.data.puskesmas ]

        return result
    }

    
    
</script>
<main class="py-2 px-1 mt-3 sm:px-32 md:px-48 lg:px-72" >
    {#await data}
    <CardPuskesmas isLoading={true}/>
    {:then value}
        {#each value as p}    
            <CardPuskesmas {...p} />
        {:else}
            <h1 class="text-2xl text-white text-center">{keyword !== "" ? `${keyword} tidak ditemukan` : 'Belum ada puskesmas'}</h1>
        {/each}
    {:catch error}
    <p class="text-red-500 font-semibold">{error}</p>
    <h1>Error</h1>
    {/await}
    
    
</main>
    
