<svelte:head>
    <title>Queue Apps - Informasi Antrean</title>
</svelte:head>
<script>
  import { navigate } from "svelte-routing";
  import BackButton from "../components/BackButton.svelte";
  import NavLink from "../components/NavLink.svelte";
  import CardQueue from "../components/CardQueue.svelte";
  import Modal from "../components/Modal.svelte";
  import { fly } from "svelte/transition";
  import { cekLogin, baseURL } from "../store/store.js";
  import { onMount } from "svelte";
  import axios from "axios";

  export let id;
  let showModal = false;
  let user = {};
  let queue = []
  let isloading = true
  $: registered = false

  onMount(async () => {  
    if (localStorage.getItem("token") == null)
      navigate("/login", { replace: true });
    else {
      let log = await cekLogin(localStorage.getItem("token"));
      if (!log) navigate("/login", { replace: true });
      else {
        let dataMaster = await getData()
        queue = [...dataMaster.queue]
        user = {...dataMaster.user}
        
        registered = queue.filter(q => q.user_id === user.id && q.cancel === false && q.done === false).length > 0
        if (registered) user.nomor = queue.find(q => q.user_id === user.id && q.cancel === false && q.done === false).nomor
        
        isloading = false
      }
    }
  });

  const handleCloseModal = async (e) => {
    showModal = e.detail.showModal;
    if (e.detail.success) {
      data = await getData();
      queue = [...data.queue]
      user = {...data.user}
      registered = queue.filter(q => q.user_id === user.id && q.cancel === false).length > 0
      console.log(queue.find(q => q.user_id === user.id && q.cancel === false))
      if (registered) user.nomor = queue.find(q => q.user_id === user.id && q.cancel === false).nomor

      isloading = false
    }
  };

  const getData = async () => {
    isloading = true
    let url = $baseURL + "/q/pk/" + id;
    let res = await axios.get(url, {
      headers : {
        Authorization : localStorage.getItem('token')
      }
    });
    return res.data;
  };

  let data = getData();
  const getSisa = (arr) => {
    if (arr.length === 0) return 0
    else {
      let temp = arr.filter(q => q.done === false && q.current === false && q.cancel === false);
      let sisa = temp.length
      return sisa
    }
  }
  const getCurrentQueues = (arr) => {
    
    if (arr.length === 0) return 0
    else {
      let temp = arr.find(q => q.done === false && q.current === true && q.cancel === false);
      let nomor = 0
      if (temp !== undefined) nomor = temp.nomor
      return nomor
    }
    
  }
  
</script>

<div
  in:fly={{ x: 300, duration: 300 }}
  out:fly={{ x: -300, duration: 300 }}
  class="flex flex-col h-full bg-blue-803 absolute inset-0 z-10 sm:px-32 md:px-48 lg:px-72"
>
  <Modal {showModal} register={!registered} on:showModal={handleCloseModal} pkid={id} usid={user.id}/>
  <div class="mt-1 md:mt-3 lg:mt-5 ">
    <div class=" h-12 flex text-white items-center px-4 mt-1 md:mt-5 lg:mt-7 ">
      <NavLink to="/">
        <BackButton promp="Kembali" />
      </NavLink>
    </div>
  </div>
  {#await data}
      <h1 class="text-white text-2xl text-center">loading ...</h1>
    {:then value}
  <div class="mt-2 flex flex-col">
    <div class="w-full px-2 flex flex-col mb-2">
      <h1 class="text-white text-2xl">{value.puskesmas.nama}</h1>  
      <h1 class="text-gray-300 text-sm md:text-base">{value.puskesmas.alamat}</h1>  
    </div>
    
    <div class="px-2 mb-2">
      <div class="w-full bg-blue-801 rounded-xl flex justify-between items-center py-2 px-4 shadow-md">
        <span class="text-gray-300">Total Antrean ({value.tgl})</span> 
        <span class="font-bold text-white">{value.queue.length}</span>
      </div>
    </div>
    
      <div class="flex space-x-2 px-2 mb-4">
        <CardQueue promp="Sisa antrean" num={getSisa(value.queue)} />
        <CardQueue promp="No antrean Saat ini" num={`Q-${getCurrentQueues(value.queue)}`} />
      </div>
      <div
        class=" w-full bg-blue-802 rounded-xl flex flex-col justify-between items-center py-10 shadow-md"
      >
      <p class="text-xl text-gray-300 ">No antrean Anda</p>
      {#if isloading}
      <h1 class="text-white text-center">...</h1>
      {:else}
      {#if registered}
        <h1 class="{getCurrentQueues(value.queue) === user.nomor ? 'animate-pulse' : ""} text-5xl font-semibold text-white">{`Q-${user.nomor}`}</h1>
        {:else}
        <h1 class="text-5xl font-semibold text-gray-300">-</h1>
        {/if}
    {/if}
        
        
      </div>
    
  </div>
  <div class="w-full px-3 mt-5">
    {#if isloading}
      <h1 class="text-white text-center">.......</h1>
      {:else}
      {#if registered}
        <button
          on:click={() => (showModal = !showModal)}
          class="py-2 rounded-xl w-full bg-red-600 text-white hover:bg-red-700 uppercase shadow"
          >batalkan antrean
        </button>
        {:else}
        <button
          on:click={() => (showModal = !showModal)}
          class="py-2 rounded-xl w-full bg-gray-300 hover:bg-gray-100 uppercase shadow focus:ring-0 focus:outline-none"
          >register antrean
        </button>
        {/if}
    {/if}
    
  </div>
  {:catch error}
      <h1 class="text-white text-2xl text-center">Puskesmas Tidak Ditemukan</h1>
      <h1 class="text-red-400 text-1xl text-center">{error}</h1>
    {/await}
</div>
