<script>
    export let promp = "no promp"
    export let num = 0
    
</script>

<div class="w-1/2 bg-blue-801 rounded-xl flex flex-col items-center py-5 shadow-md">
    <p class="text-xl text-gray-300">{promp}</p>
    <h1 class="text-5xl font-semibold text-white">{num === 0 ? '-' : num === "Q-0"? '-' : num}</h1>
</div>