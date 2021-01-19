<script>
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import NavLink from './NavLink.svelte'
  
    let show = false; // menu state
    let menu = null; // menu wrapper DOM reference
  
    onMount(() => {
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
  </script>
  
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
            <NavLink to='/login'> 
                <div on:click={() => show = !show}  class="w-full text-gray-400 hover:bg-blue-500 py-2 px-3  hover:text-white rounded flex justify-between items-center">
                    <span class="font-sm">Login</span>
                  </div>
            </NavLink>
        </div>
      {/if}
    </div>
  </div>