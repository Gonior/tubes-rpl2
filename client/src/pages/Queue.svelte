<script>
  import {navigate} from "svelte-routing"
  import BackButton from "../components/BackButton.svelte"
  import NavLink from "../components/NavLink.svelte"
  import CardQueue from "../components/CardQueue.svelte"
  import Modal from "../components/Modal.svelte"
  import {fly} from "svelte/transition"
  import {cekLogin, baseURL} from "../store/store.js"
  import { onMount } from "svelte";
  import axios from 'axios'

  export let id;
  let showModal = false
  let confirmQueueMode = true

  onMount(async ()=>{
    if (localStorage.getItem('token') == null) navigate('/login', {replace : true})
    else {
      let log = await cekLogin(localStorage.getItem('token'))
      if (!log) navigate('/login', {replace : true})
    }
  })
  
  const handleCloseModal = (e) => {
    showModal = e.detail.showModal
  }

  const getData = async () => {
    let url = $baseURL+'/q/'+id
    let res = await axios.get(url);
    return res.data.queue
  }
  
  let data = getData()
  
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
      {#await data}
        <h1 class="text-white text-2xl text-center">loading ...</h1>  
      {:then value} 
        <div class="flex space-x-2 px-2 mb-4">
          <CardQueue promp="Sisa antrean" num={value.length}/>
          <CardQueue promp="Antrean Saat ini" num={value.length}/>
      </div>
      <div class="w-full bg-blue-802 rounded-xl flex flex-col items-center py-10 shadow-md">
          <h1 class="text-5xl font-semibold text-white">x</h1>
          <p class="text-2xl text-gray-300">Antrean Anda</p>
      </div>
      {/await}
      
        
    </div>
    <div class="w-full px-3 mt-5">
      <button class="py-2 rounded-xl w-full bg-red-600 text-white hover:bg-red-700 uppercase shadow">batalkan antrean</button>
      <button on:click={() => showModal = !showModal} class="py-2 rounded-xl w-full bg-gray-300 hover:bg-gray-100 uppercase shadow focus:ring-0 focus:outline-none">register antrean</button>
    </div>
</div>
