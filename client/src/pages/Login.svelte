<svelte:head>
    <title>Login</title>
</svelte:head>
<script>
    import BackButton from "../components/BackButton.svelte";
    import NavLink from "../components/NavLink.svelte";
    import axios from "axios"
    import {fly, slide} from "svelte/transition"
    import Snackbar from "../components/Snackbar.svelte";
    import {navigate} from 'svelte-routing'
    import {baseURL, logged, queued} from '../store/store.js'
    
    export let signIn = true    
    let showSnackbar = false
    let isLoading = false
    let success = false
    let nama = ""
    let nope = ""
    let password1 = ""
    let password2 = ""
    let message = ""
    const handleSubmit = async () => {
        
        if (signIn) {
            isLoading = !isLoading
            let url = $baseURL+'/login'
            try {
                const resp = await axios.post(url, {password1, nope})
                localStorage.clear()
                localStorage.setItem("token", resp.data.token)
                message = resp.data.message
                success = true
                isLoading = !isLoading
                showNotif(message, 2000, () => {
                    let cek = await cekStatus()
                    $queued = await cek.queued
                    navigate('/', {replace : true})
                    $logged = true
                })
                

            } catch (error) {
                if (error.response) message = error.response.data.message
                else message = error
                success = false
                isLoading = !isLoading
                showNotif(message, 3000, null)
            }
            
        } else {
            if (nama.trim() === "" || nope.trim() === "" || password1.trim() === "" || password1.trim() === "") {
                success = false
                showNotif("Data Tidak Lengkap", 2000, null)
            } else {
                if (password1.length < 6) {
                    success = false
                    showNotif("Password minimal terdiri dari 6 huruf", 2000, null)
                } else {
                    if (password1 !== password2) {
                        success = false
                        showNotif('Konfirmasi password tidak cocok', 2000, null)
                    } else {
                        let regexPhone = /^0(\d{4}){2}(\d{1,4})$/g
                        if (!regexPhone.test(nope)) {
                            success = false
                            showNotif("Nomor HP tidak Valid ", 2000, null)
                        } else {
                            isLoading = true 
                            let url = $baseURL+'/login/signup'
                            try {
                                let response = await axios.post(url, {nama, nope, password : password1})
                                message = response.data.message
                                success = true
                                isLoading = !isLoading
                                
                                showNotif(message, 2000, () => {
                                    changeMode()
                                })

                            } catch (error) {
                                if (error.response) message = error.response.data.message
                                else message = error
                                success = false
                                isLoading = !isLoading
                                showNotif(message, 3000, null)
                            }
                        }
                    }
                }
            }
            
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

    

    const changeMode = () => {
        signIn = !signIn
        nama = ""
        nope = ""
        password1 = ""
        password2 = ""
    }
    
</script>


<div
    in:fly={{x :300, duration:300}} 
    out:fly={{x : -300, duration:300}}
    class="flex flex-col justify-between sm:px-32 md:px-48 lg:px-72 h-full bg-blue-803 absolute inset-0 z-10">
    {#if showSnackbar}
    <Snackbar message="{message}" success={success}/>
    {/if}
    <div transition:slide class="{signIn ? 'mt-20' : 'mt-5' }">
        <div class="px-3 mb-7">
            <h1 class="text-white text-3xl font-light">{signIn?'Sign In' : "Sign Up"}</h1>
            <h3 class="text-gray-300 text-xl mt-2">{signIn ? 'Selamat Datang di Queue Apps' : "Lengkapi Data di Bawah Ini"}</h3>
        </div>
        <form on:submit|preventDefault={handleSubmit}>
            {#if !signIn}
            <div 
            transition:slide
                class="bg-blue-801 rounded-3xl py-3 px-6 mb-3">
                <label for="" class="text-gray-400">Nama</label><br />
                <input
                    type="text"
                    required
                    bind:value={nama}
                    class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                    placeholder="John Doe" />
            </div>
            {/if}
            <div class="bg-blue-801 rounded-3xl py-3 px-6 mb-3">
                <label for="" class="text-gray-400">Nomor HP</label><br />
                <input
                    type="text"
                    required
                    bind:value={nope}
                    class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                    placeholder="08123456789" />
            </div>
            <div class="bg-blue-801 rounded-3xl py-3 px-6 mb-3">
                <label for="" class="text-gray-400">Password</label><br />
                <input
                    required
                    type="password"
                    bind:value="{password1}"
                    class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                    placeholder="*******" />
            </div>
            {#if !signIn}
            <div 
            transition:slide
                class="bg-blue-801 rounded-3xl py-3 px-6 mb-3">
                <label for="" class="text-gray-400">Konfirmasi Password</label><br />
                <input
                    type="password"
                    required
                    bind:value="{password2}"
                    class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                    placeholder="*******" />
            </div>
            {/if}
            <div class="text-center px-3 {signIn ? 'mt-10' : 'mt-5'}">
                <button
                    type="submit"
                    class="bg-gray-300 hover:bg-gray-50 w-full rounded-2xl py-3 disabled:opacity-50" disabled={isLoading}>
                    {#if isLoading}
                    <div class="flex items-center justify-center space-x-2">
                        <svg class="h-5"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M13.6 10.8L12 12l-1.6-1.2A6 6 0 018 6V3h8v3a6 6 0 01-2.4 4.8zM13.6 13.2L12 12l-1.6 1.2A6 6 0 008 18v3h8v-3a6 6 0 00-2.4-4.8zM6 21h12M6 3h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                        loading
                    </div>
                    {:else}
                    <span> {signIn ? 'SIGN IN' : 'SIGN UP'}</span>
                    {/if}
                    
                </button>
            </div>
            <div class="text-center mt-5">
                <span class="text-gray-400">
                    {signIn ? 'Belum mempunyai akun?' : 'Sudah mempunyai akun?'} <span class="text-gray-300 font-semibold cursor-pointer" on:click={changeMode}> {signIn ? 'Sign Up':'Sign in'}</span>
                </span>
            </div>
        </form>
    </div>
    {#if signIn}
    <div class="mb-10 flex justify-center">
        <NavLink to="/">
            <BackButton promp="Lihat Daftar Puskemas"/>
        </NavLink>
    </div>
    {/if}
</div>
