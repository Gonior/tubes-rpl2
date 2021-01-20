<script>
  import {navigate} from "svelte-routing"
  import BackButton from "../components/BackButton.svelte"
  import DropDown from '../components/DropDown.svelte'
  import NavLink from "../components/NavLink.svelte"
  import CardQueue from "../components/CardQueue.svelte"
  import {fly} from "svelte/transition"
  import { onMount } from "svelte";

  export let id;
  onMount(()=>{
    if (localStorage.length === 0) {
      navigate("/login", {replace : true})
    }
  })
  
  console.log(id)
</script>

<div
    in:fly={{x :300, duration:300}} 
    out:fly={{x : -300, duration:300}}
    class="flex flex-col h-full bg-blue-803 absolute inset-0 z-10 sm:px-32 md:px-48 lg:px-72">
    <div class="mt-20">
        <div class=" h-12 flex text-white items-center px-4 justify-between mt-10">
            <NavLink to="/">
                <BackButton promp="Kembali"/>
            </NavLink>
            <div class="flex flex-row ">
              <DropDown>
                <svg 
                  class="h-6 text-gray-300 hover:text-white "
                  viewBox="0 0 24 24"
                >
                <circle cx="12" cy="5" r="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="12" r="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="19" r="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </DropDown>
            </div>
          </div>
    </div>
    <div class="mt-16 flex flex-col">
        <div class="flex space-x-2 px-2 mb-4">
            <CardQueue promp="Sisa antrean" num=20/>
            <CardQueue promp="Total Antrean" num=100/>
        </div>
        <div class="w-full bg-blue-802 rounded-xl flex flex-col items-center py-10 shadow-md">
            <h1 class="text-5xl font-semibold text-white">20</h1>
            <p class="text-2xl text-gray-300">Sisa Antrean</p>
        </div>
    </div>
</div>
