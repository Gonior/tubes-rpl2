<script>
    import {Router} from 'svelte-routing'

    import NavLink from './NavLink.svelte'


    let showSubmenu = false
   
    export let url = ""
</script>

<div class="bg-blue-803 min-h-screen">
<Router url="{url}" >
    <header class="flex flex-col">
        <div class=" h-12 flex text-white items-center px-4 justify-between mt-10">
          <div class="" >
            <h1 class="font-semibold text-md text-white">Puskesmas</h1>
          </div>
          <div class="flex flex-row ">
            <div>
              <svg class="h-6" viewBox="0 0 24 24"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6"/></svg>
            </div>
            <div class="block sm:hidden" on:click ={() => showSubmenu = !showSubmenu }>
              <svg 
                class="h-6 text-gray-300 hover:text-white "
                viewBox="0 0 24 24"
              >
              <circle cx="12" cy="5" r="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="12" r="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="19" r="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="{showSubmenu ? 'flex' : 'hidden'} text-white flex-col space-y-2 my-2 px-1 transition-all duration-1000 ease-in-out">
            <NavLink to="/" >
              <div class="w-full text-gray-400 hover:bg-blue-500 py-1 px-3  hover:text-white rounded flex justify-between items-center">
                <span class="font-sm">Beranda</span>
              </div>
            </NavLink>
            <NavLink to='/temp'> 
              <span class="font-sm text-gray-400 hover:bg-blue-500 py-1 px-3 hover:text-white rounded">Temp</span>
            </NavLink>
        </div>
    </header>
    <slot />
</Router>

</div>
