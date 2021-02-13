<svelte:head>
    <title>Puskesmas Admin</title>
</svelte:head>
<script>
    import {cekLogin, baseURL} from '../store/store.js'
    import ModalQueueManagement from "../components/ModalQueueManagement.svelte"
    import Snackbar from '../components/Snackbar.svelte'
    import QMU from '../components/QMU.svelte'
    import {fly} from "svelte/transition"
    import { onMount } from "svelte";
    import {navigate}  from 'svelte-routing'
    import axios from 'axios'
    export let id;
    let showModal = false
    let showListQueuedModal = false
    let showSnackbar = false
    let msg = ""
    let success = false
    const getQueue = async () => {
        if (id != "") {
            let url = $baseURL+"/q/"+id
            let res = await axios.get(url)
            
            return res.data
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
        showListQueuedModal = e.detail.showModal
        if (e.detail.confirm) {
            let data = await getQueue()
            let current = data.queue.find(q => q.done === false && q.current === true && q.cancel === false);
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
      let temp = arr.filter(q => q.done === false && q.current === false && q.cancel === false);
      let sisa = temp.length
      return sisa
    }
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
  const getCurrentQueues = (arr) => {
    
    if (arr.length === 0) return 0
    else {
      let temp = arr.find(q => q.done === false && q.current === true && q.cancel === false);
      let nomor = 0
      let user_id;
      if (temp !== undefined) {
        nomor = temp.nomor
        user_id = temp.user_id
      }

      return {nomor, user_id }
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
      <div class='mt-5 px-2 flex justify-between'>
        <h1 class="text-white text-2xl">Queue Management</h1>
        <button on:click={() => showListQueuedModal = true} class="text-white px-4 py-2 rounded outline-none bg-blue-500 hover:bg-blue-801">Lihat Data Pengantre</button>
      </div>
      <div class="mt-7 flex flex-col">
        {#await antrean}
        <p class="animate-pulse text-center text-white text-2xl">Loading ...</p>
        {:then value}
        <ModalQueueManagement {showModal} data={getCurrentQueues(value.queue)} on:confirm={handleCloseModal}/>    
        <QMU showModal={showListQueuedModal} data={value.queue} on:showModal={handleCloseModal}/>
        <div class="w-full px-2 flex flex-col mb-2">
          <h1 class="text-white text-2xl">{value.puskesmas.nama}</h1>  
          <h1 class="text-gray-300 text-sm md:text-base">{value.puskesmas.alamat}</h1>  
        </div>
        <div class="px-2 mb-2">
          <div class="w-full bg-blue-801 rounded-xl flex justify-between items-center py-2 px-4 shadow-md cursor-pointer" on:click={() => showListQueuedModal = true} >
            <span class="text-gray-300">Total Antrean ({value.tgl})</span> 
            <span class="font-bold text-white">{value.queue.length}</span>
          </div>
        </div>
        <div class="flex space-x-2 px-2 mb-4">
          <div class="w-1/2 bg-blue-801 rounded-xl flex flex-col items-start px-4 py-2 shadow-md">
            {#await getUser(getCurrentQueues(value.queue).user_id)}
              <p class="text-center text-gray-400 px-8">getting data..</p>
            {:then userCurrent} 
            <h1 class="text-gray-300">Antrean saat ini</h1>  
            <h1 class="text-gray-50 font-semibold text-lg">{userCurrent.nama}</h1>
            <p class="text-gray-400">{userCurrent.nope}</p>
            {/await}
            </div>
            <div class="w-1/2 bg-blue-801 rounded-xl flex flex-col items-center py-5 shadow-md" >
              <p class="text-xl text-gray-300">Sisa Antrean</p>
              <h1 class="text-5xl font-semibold text-white">{getSisa(value.queue) === 0 ? '-' : getSisa(value.queue)}</h1>
            </div>
            
        </div>
        <div class="w-full bg-blue-802 rounded-xl flex flex-col items-center py-10 shadow-md " >
          <p class="text-xl text-gray-300">No antrean Saat Ini</p>
            <h1 class="text-5xl font-semibold text-white">{getCurrentQueues(value.queue).nomor === 0 ? '-' : `Q-${getCurrentQueues(value.queue).nomor}`}</h1>
            
        </div>
        <button class="w-full mt-2 py-2 bg-gray-300 disabled:opacity-50  hover:bg-white rounded-2xl shadow" on:click={() => showModal = true}>
          Done?
        </button>
        {:catch error}
        <p class="text-red-500">{error}</p>
        {/await}
          
          
      </div>
  </div>
  

