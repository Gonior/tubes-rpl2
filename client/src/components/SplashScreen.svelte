<script>
    import {fly} from 'svelte/transition'
</script>
<div class="h-screen flex justify-center items-center bg-blue-802" out:fly={{x : -300, duration:300}}>
    <div class="p-2 text-center text-white font-light text-3xl md:text-5xl">
        <div class="flex justify-center w-full">
            <img class="h-20" src="/assets/logo.png" alt="Logo Queue" />
        </div>
        <p class="animate-pulse">#Deadline</p>
    </div>
</div>