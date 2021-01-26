<script>
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import NavLink from './NavLink.svelte'
    import {cekLogin, logged, cekStatus, queued} from '../store/store.js'
    import Snackbar from './Snackbar.svelte'
  import { navigate } from 'svelte-routing';

    let showSnackbar = false
    let message = ""
    let data
    let show = false; // menu state
    let menu = null; // menu wrapper DOM reference
    const showNotif = (msg, time) => {
        if (time === undefined) time = 2000
        message = msg
        showSnackbar = true
        setTimeout(() => {
            showSnackbar = false            
        }, time)
    }
    onMount(async () => {
      if (localStorage.getItem("token") == null) $logged = false
      else {
        $logged = await cekLogin(localStorage.getItem("token"))  
        if ($logged) {
            data = await cekStatus()
            $queued = await data.queued
        }
      }
      
      const handleOutsideClick = (event) => {
        if (show && !menu.contains(event.target)) {
          show = false;
        }
      };
  
      const handleEscape = (event) => {
        if (show && event.key === 'Escape') {
          show = false;
        }
      };
  
      // add events when element is added to the DOM
      document.addEventListener('click', handleOutsideClick, false);
      document.addEventListener('keyup', handleEscape, false);
  
      // remove events when element is removed from the DOM
      return () => {
        document.removeEventListener('click', handleOutsideClick, false);
        document.removeEventListener('keyup', handleEscape, false);
      };
    });
    
    const handleLogout = async () => {
      try {
        show = !show
        localStorage.removeItem('token')  
        $logged = false
        showNotif('Berhasil Log Out', 2000)
      } catch (error) {
        
      }
      
    }
    const handleNavigate = async () => {
      try {
        if ($queued) {
          show = !show
          navigate(`/queue/${data.on}`, {replace : true})
        }
        
      } catch (error) {
        
      }
      
    }
  </script>
{#if showSnackbar}
<Snackbar message={message} success={true}/>
{/if}
  <div class="relative" bind:this={menu}>
    <div>
      <button
        on:click={() => (show = !show)}
        class="menu focus:outline-none focus:shadow-solid"
      >
        <slot/>
      </button>
  
      {#if show}
        <div
          in:scale={{ duration: 100, start: 0.95 }}
          out:scale={{ duration: 75, start: 0.95 }}
          class="origin-top-right absolute right-0 w-48 py-2 px-1 mt-1 bg-gray-800
            rounded shadow-md">
            {#if $logged}
            
            <div disabled={$queued} on:click={handleNavigate} class="w-full {$queued ? 'text-gray-400 hover:text-white hover:bg-blue-500' : 'text-gray-600'} disabled:opacity-50  py-2 px-3   rounded flex justify-between items-center">
                <span class="font-sm">Antrean Anda</span>
            </div>
            
              <button on:click={handleLogout} class="w-full text-gray-400 hover:bg-red-400 py-2 px-3  hover:text-white rounded flex justify-between items-center">
                Log Out
              </button>
            {:else}
            <NavLink to='/login'> 
              <div on:click={() => show = !show}  class="w-full text-gray-400 hover:bg-blue-500 py-2 px-3  hover:text-white rounded flex justify-between items-center">
                  <span class="font-sm">Login</span>
                </div>
            </NavLink>
            {/if}
        </div>
      {/if}
    </div>
  </div>