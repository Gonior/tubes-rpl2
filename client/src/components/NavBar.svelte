<script>
    import {Router} from 'svelte-routing'
    import DropDown from './DropDown.svelte'
    
   
    export let url = ""
</script>

<div class="bg-blue-803 min-h-screen">
<Router url="{url}" >
    <header class="flex flex-col">
        <div class=" h-12 flex text-white items-center px-4 justify-between mt-10">
          <div class="" >
            <h1 class="font-semibold text-xl text-white">Puskesmas</h1>
          </div>
          <div class="flex flex-row ">
            <div class="mr-2">
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
    </header>
    <slot />
</Router>

</div>
