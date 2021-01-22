<script>
    import axios from "axios"
    import {fly, slide} from "svelte/transition"
    import Snackbar from "../components/Snackbar.svelte";
    import {navigate} from 'svelte-routing'
    import {baseURL, logged} from '../store/store.js'
    
    let showSnackbar = false
    let isLoading = false
    let success = false
    let input = ""
    let message = ""
    const handleSubmit = async () => {
        isLoading = !isLoading
        let url = $baseURL+'/auth/admin'
        try {
            const resp = await axios.post(url, {kode : input})
            localStorage.setItem("token admin", resp.data.token)
            message = resp.data.message
            success = true
            isLoading = !isLoading
            showNotif(message, 2000, () => {
                navigate('/admin', {replace : true})
                // $logged = true
            })
            

        } catch (error) {
            if (error.response) message = error.response.data.message
            else message = error
            success = false
            isLoading = !isLoading
            showNotif(message, 3000, null)
        }
            
    }
    //controller 
    const showNotif = (msg, time, callback) => {
        if (time === undefined) time = 2000
        
        message = msg
        showSnackbar = true
        setTimeout(() => {
            showSnackbar = false
            if (callback != null) callback()
        }, time)
    }

    
</script>


<div
    in:fly={{x :300, duration:300}} 
    out:fly={{x : -300, duration:300}}
    class="flex flex-col bg-gray-200 items-center justify-center sm:px-32 md:px-48 lg:px-72 h-full absolute inset-0 z-10">
    {#if showSnackbar}
    <Snackbar message="{message}" success={success}/>
    {/if}
    <div transition:slide class="mt-5 p-7 bg-blue-803 shadow-lg rounded space-y-5">
        <div>
            <h1 class="text-white text-3xl font-light">Queue Management</h1>
            <h3 class="text-gray-300 text-sm">Masukan Kode Puskesmas anda</h3>
        </div>
        <form on:submit|preventDefault={handleSubmit}>
            <div>
                <input
                    type="text"
                    required
                    bind:value={input}
                    class="bg-blue-801 px-4 py-2  placeholder-gray-400 text-white w-full focus:outline-none"
                    placeholder="PK-MKsifs2as" />
            </div>
            <div class="text-center mt-5">
                <button
                    type="submit"
                    class="bg-gray-300 hover:bg-gray-200 w-full rounded py-2 disabled:opacity-50" disabled={isLoading}>
                    {#if isLoading}
                    <div class="flex items-center justify-center space-x-2">
                        <svg class="h-5"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M13.6 10.8L12 12l-1.6-1.2A6 6 0 018 6V3h8v3a6 6 0 01-2.4 4.8zM13.6 13.2L12 12l-1.6 1.2A6 6 0 008 18v3h8v-3a6 6 0 00-2.4-4.8zM6 21h12M6 3h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                        loading
                    </div>
                    {:else}
                    <span>SIGN IN</span>
                    {/if}
                </button>
            </div>
        </form>
    </div>
</div>
