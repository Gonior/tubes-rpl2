<script>
    import {fly} from 'svelte/transition'
    import {createEventDispatcher} from 'svelte'
    export let showModal = false;
    let confrim =false;
    let dispatch = createEventDispatcher()
    
    const handleClose = () => {
        showModal = !showModal
        dispatch("confirm", {
            showModal : false,
            confirm : confrim
        })
    }
    const handleConfirm = () => {
        confirm = true
        showModal = !showModal
        dispatch("confirm", {
            showModal : false,
            confirm : confirm
        })
    }
    
</script>
{#if showModal}
    <div class="bg-gray-600 px-5 bg-opacity-90 min-h-screen w-full absolute flex justify-center items-center inset-0 z-20" on:click|self={handleClose}>
        <div class="bg-blue-803 h-1/3 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded shadow-lg p-5"  in:fly={{y :-100 ,duration : 200}} out:fly={{y : -100, duration : 200}}  >
            <div class="flex flex-col w-full justify-around h-full">
                <div class="flex items-center justify-between -mt-5">
                    <h1 class="text-xl tracking-wider text-white"> Konfirmasi antrean </h1>
                    <button on:click="{handleClose}" class="bg-transparent rounded hover:text-white text-gray-400 focus:ring-0 focus:outline-none">
                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19L5 5M19 5L5 19"/>
                        </svg>
                      </button>
                </div>
                <div>
                    <h3  class="text-gray-400 text-xl">Sudah Selesai?</h3>
                </div>
                    
                <div class="w-full -mb-3">
                    <button on:click={handleConfirm} class="py-2 rounded-xl w-full bg-gray-300 hover:bg-gray-100 uppercase shadow">ya</button>
                </div>
            </div>
            
        </div>
    </div>
{/if}
