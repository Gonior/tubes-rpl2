<script>
    import {fly} from 'svelte/transition'
    import {createEventDispatcher} from 'svelte'
    import {baseURL, queued} from '../store/store.js'
    import Snackbar from './Snackbar.svelte'
    import axios from 'axios';
    export let showModal = false;
    export let register = true
    export let pkid;
    export let usid;
    let input = "";
    let msg;
    let success = false
    let showSnackbar = false
    let isLoading = false
    let dispatch = createEventDispatcher()
    
    const handleClose = () => {
        showModal = !showModal
        input = ""
        dispatch("showModal", {
            showModal : false,
            success : success
        })
    }
    const handleSubmit = async () => {
        isLoading = true
        if (register) {
            let url = $baseURL+'/q/add'
            try {
                let req = await axios.post(url,{puskesmas_id : pkid, user_id : usid, password : input},{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                })
                msg = req.data.message
                success = true
                isLoading = false
                showSnackbar = true
                $queued = true
                setTimeout(() => {
                    showSnackbar = false
                    handleClose()
                }, 2000)
                
            } catch (error) {
                
                if (error.response) msg = error.response.data.message
                else msg = error
                isLoading = false
                success = false
                showSnackbar = true
                setTimeout(() => {
                    showSnackbar = false
                }, 2000)
            }
            
            isLoading = false
        } else {
            let url = $baseURL+'/q/cancel'
            try {
                let req = await axios.post(url,{puskesmas_id : pkid, user_id : usid, alasan : input.trim()},{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                })
                msg = req.data.message
                success = true
                isLoading = false
                showSnackbar = true
                $queued = false
                setTimeout(() => {
                    showSnackbar = false
                    handleClose()
                }, 2000)
                
            } catch (error) {
                
                if (error.response) msg = error.response.data.message
                else msg = error
                isLoading = false
                success = false
                showSnackbar = true
                setTimeout(() => {
                    showSnackbar = false
                }, 4000)
            }
            
            isLoading = false
        }
        
    }
    
</script>

{#if showModal}
    <div class="bg-gray-600 px-5 bg-opacity-90 min-h-screen w-full absolute flex justify-center items-center inset-0 z-20"    on:click|self={handleClose}>
        {#if showSnackbar}
        <Snackbar message="{msg}" {success}/>
        {/if}
        <div class="bg-blue-803 h-1/2 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded shadow-lg p-5" in:fly={{y :-100 ,duration : 200}} out:fly={{y : -100, duration : 200}}>
            <div class="flex flex-col w-full justify-around h-full">
                <div class="flex items-center justify-between -mt-5">
                    <h1 class="text-xl tracking-wider text-white"> Konfirmasi {register ?'Pendaftaran' : "Pembatalan"} </h1>
                    <button on:click="{handleClose}" class="bg-transparent rounded hover:text-white text-gray-400 focus:ring-0 focus:outline-none">
                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19L5 5M19 5L5 19"/>
                        </svg>
                      </button>
                </div>
                <div class="bg-blue-801 rounded-3xl py-3 px-6 ">
                    <label for="" class="text-gray-400">{register ? 'Password' : 'Alasan'}</label><br />

                    {#if register}
                    <input
                        required
                        type="password"
                        bind:value="{input}"
                        class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                        placeholder="*******" />
                    {:else}
                    <input
                        required
                        type="text"
                        bind:value="{input}"
                        class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                        placeholder="Ingin pindah ke puskesmas lain"
                        />
                    {/if}
                </div>
                <div class="w-full -mb-3">
                    <button on:click="{handleSubmit}" disabled={isLoading} class="disabled:opacity-50 py-2 rounded-xl w-full {register ? 'bg-gray-300 hover:bg-gray-100' : 'bg-red-600 text-white hover:bg-red-700' }  uppercase shadow">{isLoading ? "Loading" : register ? 'daftar' : 'yakin'}</button>
                </div>
            </div>
            
        </div>
    </div>
{/if}
