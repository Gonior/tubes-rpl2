<script>
    import NavLink from "./NavLink.svelte"
</script>
<div class="bg-blue-801 h-32 rounded-3xl flex text-white py-2 px-5 items-center justify-between mb-4 shadow-md space-x-2">
    <div class="flex items-center space-x-3">
        <div class="h-16 w-16 bg-white rounded-lg">
        
        </div>
        <div>
            <h1 class="truncate text-2xl font-semibold">Puskesmas Padasuka</h1>
            <p class="text-sm truncate text-gray-300">Jl. Padasuka no. 12</p>
            <p class="text-xl truncate text-white">28 orang dalam antrean</p>
        </div>
    </div>
    
    <div>
        <NavLink to="/queue/ajksdkjabsdasdak"> 
        <button class="h-10 w-10 text-gray-400 hover:text-white">
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l3-3-3-3"/>
            </svg> 
        </button>
    </NavLink>
    </div>
</div>