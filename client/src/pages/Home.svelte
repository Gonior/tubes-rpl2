<script>
    import CardPuskesmas from '../components/CardPuskesmas.svelte'
    import {fly} from 'svelte/transition'
</script>
<main class="py-2 px-1 mt-3" in:fly={{x :-300, duration:300}} out:fly={{x : 300, duration:300}}>
    <CardPuskesmas />
    
</main>
    