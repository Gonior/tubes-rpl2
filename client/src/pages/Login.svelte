<script>
    import BackButton from "../components/BackButton.svelte";
    import NavLink from "../components/NavLink.svelte";
    import {fly} from "svelte/transition"
</script>

<div
    in:fly={{x :300, duration:300}} 
    out:fly={{x : -300, duration:300}}
    class="flex flex-col justify-between sm:px-32 md:px-48 lg:px-72 h-full bg-blue-803 absolute inset-0 z-10">
    <div class="mt-20 ">
        <div class="px-3 mb-7">
            <h1 class="text-white text-3xl font-light">Sign In</h1>
            <h3 class="text-gray-300 text-xl mt-2">Wellcome Back!</h3>
        </div>
        <form action="">
            <div class="bg-blue-801 rounded-3xl py-3 px-6 mb-3">
                <label for="" class="text-gray-400">NIK</label><br />
                <input
                    type="number"
                    class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                    placeholder="32144165231678" />
            </div>
            <div class="bg-blue-801 rounded-3xl py-3 px-6 mb-3">
                <label for="" class="text-gray-400">Password</label><br />
                <input
                    type="password"
                    class="bg-transparent text-gray-50 placeholder-gray-400 w-full focus:outline-none focus:text-white"
                    placeholder="*******" />
            </div>
            <div class="text-center mt-5">
                <NavLink to="/">
                    <span class="text-gray-400 hover:text-white uppercase">
                        Forget Password
                    </span>
                </NavLink>
            </div>
            <div class="text-center px-3 mt-10">
                <button
                    type="submit"
                    class="bg-gray-300 hover:bg-gray-50 w-full rounded-2xl py-3">
                    <span> SIGN IN </span>
                </button>
            </div>
        </form>
    </div>
    <div class="mb-10 flex justify-center">
        <NavLink to="/">
            <BackButton promp="Lihat Daftar Puskemas"/>
        </NavLink>
    </div>
</div>
