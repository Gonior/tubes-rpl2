<script>
    import {fly} from 'svelte/transition'
    import {baseURL} from '../store/store.js'
    import {createEventDispatcher, onMount} from 'svelte'
    import axios from 'axios'
import { each } from 'svelte/internal';
    export let showModal = false;
    export let data
    let dispatch = createEventDispatcher()
    
    const handleClose = () => {
        showModal = !showModal
        dispatch("showModal", {
            showModal : false
        })
    }
    const getUser = async (id) => {
                try {
                    let url = $baseURL+"/login/usr/"+id
                    let req = await axios.get(url, {
                    headers : {
                        Authorization : localStorage.getItem('token pk')
                    }
                    }) 
                    return req.data.user
                } catch (error) {
                    console.log(error)
                }
                    
                
            }
    let getDatas = async () => {
        let result = []
        data.forEach(async d => {
            let user = {}
            
            let da = await getUser(d.user_id)
            user.nama = da.nama
            user.nope = da.nope
            user.nomor = d.nomor
            if (d.cancel === true ) user.status = 'Cancel'
            else if (d.done === true) user.status = "Selesai"
            else user.status = "Mengantre"
            result.push(user)
        });
        return result
    }
    let result = getDatas()
    onMount(() => {
        result = getDatas()
        console.log(result)
    })
    
</script>
{#if showModal}
    <div class="bg-gray-600 px-5 bg-opacity-90 min-h-screen w-full absolute flex justify-center items-center inset-0 z-20" on:click|self={handleClose}>
        <div class="bg-blue-803 h-3/4 w-full sm:w-3/4 md:w-1/2 rounded shadow-lg p-5"  in:fly={{y :-100 ,duration : 200}} out:fly={{y : -100, duration : 200}}  >
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold tracking-wider text-white">Data Antrean</h1>
                <button on:click="{handleClose}" class="bg-transparent rounded hover:text-white text-gray-400 focus:ring-0 focus:outline-none">
                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19L5 5M19 5L5 19"/>
                    </svg>
                  </button>
            </div>
            {#await result}
                <h1 class="text-gray-400">Loading</h1>
            {:then md}
            
            <div class="w-full h-full overflow-x-auto mt-2">
                {#each md as value}
                <div class="flex justify-between items-center mb-2">
                    <div class="flex flex-col">
                        <h1 class="text-xl text-gray-300 font-semibold">{value.nama} ({value.status})</h1>
                        <h3 class="text-base text-gray-400">{value.nope}</h3>
                    </div>
                    <h1 class="text-2xl font-bold text-white mr-5">Q-{value.nomor}</h1>
                </div>
                {/each}
            </div>
            
            {:catch error}
            <h1 class="text-gray-400">{error}</h1>
            {/await}
            
        </div>
    </div>
{/if}
