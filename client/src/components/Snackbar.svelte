<script>
    import {fly} from 'svelte/transition'
    export let message = "This is Message"
    export let success = false
</script>

<div class="absolute min-w-min flex items-center justify-center inset-x-0 top-5 z-10" in:fly={{y : -100, duration:300}} out:fly={{y : -100, duration:500}}>
    <div class=" {!success ? 'bg-red-400' : 'bg-green-400'} px-4 py-2 text-gray-100 rounded min-w-min">
        <p class="text-sm">{message}</p>
    </div>
    
</div>