<script>
    import BackButton from "../components/BackButton.svelte";
    import NavLink from "../components/NavLink.svelte";
    import {fly, slide} from "svelte/transition"
    
    export let signIn = true
    let nama = ""
    let nope = ""
    let password1 = ""
    let password2 = ""
    const handleSubmit = () => {

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
                    type="number"
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
                    placeholder="******" />
            </div>
            {/if}
            <div class="text-center px-3 {signIn ? 'mt-10' : 'mt-5'}">
                <button
                    type="submit"
                    class="bg-gray-300 hover:bg-gray-50 w-full rounded-2xl py-3">
                    <span> {signIn ? 'SIGN IN' : 'SIGN UP'}</span>
                </button>
            </div>
            <div class="text-center mt-5">
                <span class="text-gray-400">
                    {signIn ? 'Belum mempunyai akun?' : 'Sudah mempunyai akun?'} <span class="text-gray-300 font-semibold cursor-pointer" on:click={changeMode}> {signIn ? 'Sign Up':'Sign in'}</span>
                    
                </span>
            </div>
        </form>
    </div>
    <div class="mb-10 flex justify-center">
        <NavLink to="/">
            <BackButton promp="Lihat Daftar Puskemas"/>
        </NavLink>
    </div>
</div>
