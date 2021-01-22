<script>
    import {Router} from 'svelte-routing'
    import DropDown from './DropDown.svelte'
    import {fade} from 'svelte/transition'
    
    let openSearch = false
    
    export let url = ""
</script>


<Router url="{url}" >
    <header class="flex flex-col">
        <div class=" h-12 text-white w-full mt-10">
          {#if openSearch}
            <div 
              class="w-full flex items-center justify-center" 
              in:fade={{ duration: 100}}>
              <div class=" flex items-center justify-between w-full lg:w-1/2 px-4">
                <input type="text" class="bg-transparent focus:border-gray-300 focus:outline-none border-b border-gray-600 w-full placeholder-gray-400 text-white mr-5" placeholder="Cari..">
                <button on:click="{() => openSearch = !openSearch}" class="bg-transparent rounded hover:text-white text-gray-400 focus:ring-0 focus:outline-none">
                  <svg class="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19L5 5M19 5L5 19"/>
                  </svg>
                </button>
              </div>
            </div>
          {:else}
          <div class=" flex items-center px-4 justify-between  w-full">
            <h1 class="font-semibold text-xl text-white">Queue Apps</h1>
            <div class="flex flex-row">
              <div class="mr-2" on:click={() => openSearch = !openSearch}>
                <svg class="h-6" viewBox="0 0 24 24"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6"/></svg>
              </div>
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
          {/if}
        </div>
    </header>
    <slot />
</Router>


