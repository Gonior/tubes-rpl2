<svelte:head>
    <title>Puskesmas Admin</title>
</svelte:head>
<script>
    import {cekLogin, baseURL} from '../store/store.js'
    import CardQueue from "../components/CardQueue.svelte"
    import ModalQueueManagement from "../components/ModalQueueManagement.svelte"
    import Snackbar from '../components/Snackbar.svelte'
    import {fly} from "svelte/transition"
    import { onMount } from "svelte";
    import {navigate}  from 'svelte-routing'
    import axios from 'axios'
    export let id;
    let showModal = false
    let showSnackbar = false
    let msg = ""
    let success = false
    const getQueue = async () => {
        if (id != "") {
            let url = $baseURL+"/q/"+id
            let res = await axios.get(url)
            console.log(res.data.queue)
            return res.data.queue
        }
    }
    let antrean = getQueue()

    
    
  
    onMount(async ()=>{
        if (localStorage.getItem('token pk') == null) navigate('/auth', {replace : true})
        else {
            let log = await cekLogin(localStorage.getItem('token pk'))
            if (!log) navigate('/auth', {replace : true})            
        }
    })
    
    const handleCloseModal = async (e) => {
        showModal = e.detail.showModal
        if (e.detail.confirm) {
            let queue = await getQueue()
            let current = queue.find(q => q.done === false && q.current === true);
            //TODO
            if (localStorage.getItem('token pk') == null) navigate('/auth', {replace : true})
            else {
                let log = await cekLogin(localStorage.getItem('token pk'))
                if (!log) navigate('/auth', {replace : true})
                else {
                  try {
                    let url = $baseURL+"/q/current"
                    
                    let req = await axios.post(url, {current}, {
                      headers : {
                        Authorization : localStorage.getItem('token pk')
                      }
                    })  
                    msg = req.data.message
                    success = true
                    showSnackbar = !showSnackbar
                    antrean = getQueue()
                    setTimeout(()=> {
                      showSnackbar = !showSnackbar
                    }, 2000)
                  } catch (error) {
                    error.response ? msg = error.response.data.message : msg = error
                    showSnackbar = !showSnackbar
                    success = false
                    setTimeout(() => {
                      showSnackbar = !showSnackbar
                    }, 3000)
                  }
                  
                  
                }
            }
        }

    }
    const getSisa = (arr) => {
    if (arr.length === 0) return 0
    else {
      let temp = arr.filter(q => q.done === false && q.current === false);
      let sisa = temp.length
      return sisa
    }
  }
  const getCurrentQueues = (arr) => {
    
    if (arr.length === 0) return 0
    else {
      let temp = arr.find(q => q.done === false && q.current === true);
      let nomor = temp.nomor
      return nomor
    }
    
  }
    
  </script>
  
  
  
  <div
      in:fly={{x :300, duration:300}} 
      out:fly={{x : -300, duration:300}}
      class="flex flex-col h-full bg-blue-803 absolute inset-0 z-10 sm:px-32 md:px-48 lg:px-72">
      {#if showSnackbar}
        <Snackbar message={msg} {success}/>
      {/if}
      <div class='mt-10'>
        <h1 class="text-white text-2xl">Queue Management</h1>
      </div>
      <div class="mt-16 flex flex-col">
        {#await antrean}
        <p class="animate-pulse text-center text-white text-2xl">Loading ...</p>
        {:then value}
        <ModalQueueManagement {showModal} on:confirm={handleCloseModal}/>    
        <div class="flex space-x-2 px-2 mb-4">
            <CardQueue promp="Sisa antrean" num={getSisa(value)}/>
            <CardQueue promp="Total Antrean" num={value.length}/>    
        </div>
        <div class="w-full bg-blue-802 rounded-xl flex flex-col items-center py-10 shadow-md cursor-pointer" on:click={() => showModal = !showModal}>
          <p class="text-xl text-gray-300">No antrean Saat Ini</p>
            <h1 class="text-5xl font-semibold text-white">{getCurrentQueues(value) === 0 ? '-' : getCurrentQueues(value)}</h1>
            
        </div>
        {:catch error}
        <p class="text-red-500">{error}</p>
        {/await}
          
          
      </div>
  </div>
  

