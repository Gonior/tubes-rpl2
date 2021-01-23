<script>
    import NavLink from "./NavLink.svelte"
    import {baseURL} from '../store/store.js'
    import axios from 'axios'
    export let nama
    export let fotoName
    export let alamat
    export let _id
    export let kode
    export let __v
    const getQueue = async () => {
        let url = $baseURL+"/q/"+_id
        let res = await axios.get(url)
        return res.data.queue
    }
    let antrean = getQueue()
    
</script>
<div class="bg-blue-801 h-32 rounded-3xl flex text-white py-2 px-5 items-center justify-between mb-4 shadow-md space-x-2">
    <div class="flex items-center space-x-3">
        <div>
            <img class="object-cover h-16 rounded" src="{$baseURL+'/pk/photo/'+fotoName}" alt="{nama}">
        </div>
        <div>
            <h1 class="text-2xl font-semibold">{nama}</h1>
            <p class="text-sm text-gray-300">{alamat}</p>
            {#await antrean}
                <p>fetch data...</p>
            {:then value}
            <p class="text-md text-white">{value.length} orang dalam antrean</p>
            {:catch error}
            <p class="text-red-500">{error}</p>
            {/await}
            <!-- <p class="text-xl text-white">{antrean} orang dalam antrean</p> -->
        </div>
    </div>
    
    <div>
        <NavLink to="/queue/{_id}"> 
        <button class="h-10 w-10 text-gray-400 hover:text-white">
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l3-3-3-3"/>
            </svg> 
        </button>
    </NavLink>
    </div>
</div>