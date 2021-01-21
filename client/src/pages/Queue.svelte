<script>
  import {navigate} from "svelte-routing"
  import BackButton from "../components/BackButton.svelte"
  import NavLink from "../components/NavLink.svelte"
  import CardQueue from "../components/CardQueue.svelte"
  import Modal from "../components/Modal.svelte"
  import {fly} from "svelte/transition"
  import {cekLogin} from "../store/store.js"
  import { onMount } from "svelte";

  export let id;
  let showModal = false
  let confirmQueueMode = true

  onMount(async ()=>{
    let log = await cekLogin()
    if (!log) navigate('/login', {replace : true})
    else {
      console.log(localStorage.getItem('token'))
      console.log(id)
    }
  })
  
  const handleCloseModal = (e) => {
    showModal = e.detail.showModal
  }
  
</script>



<div
    in:fly={{x :300, duration:300}} 
    out:fly={{x : -300, duration:300}}
    class="flex flex-col h-full bg-blue-803 absolute inset-0 z-10 sm:px-32 md:px-48 lg:px-72">
    <Modal {showModal} {confirmQueueMode} on:showModal={handleCloseModal}/>    
    <div class="mt-10">
        <div class=" h-12 flex text-white items-center px-4 justify-start mt-10">
            <NavLink to="/">
                <BackButton promp="Kembali"/>
            </NavLink>
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
    <div class="w-full px-3 mt-5">
      <button class="py-2 rounded-xl w-full bg-red-600 text-white hover:bg-red-700 uppercase shadow">batalkan antrean</button>
      <button on:click={() => showModal = !showModal} class="py-2 rounded-xl w-full bg-gray-300 hover:bg-gray-100 uppercase shadow focus:ring-0 focus:outline-none">register antrean</button>
    </div>
</div>
