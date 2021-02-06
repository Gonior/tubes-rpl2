<script>
    import {fly} from 'svelte/transition'
    import {baseURL} from '../store/store.js'
    import Snackbar from './Snackbar.svelte'
    import {createEventDispatcher} from 'svelte'
    import FilePond, { registerPlugin } from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
    import axios from 'axios';
    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
    export let showModal = false;
    export let _id;
    export let nama;
    export let kode;
    export let fotoName;
    export let alamat;
    let beforeUpdate = {nama,fotoName, alamat}
    $: afterUpdate = {nama,fotoName,alamat}
    $: ableToEdit = JSON.stringify(afterUpdate) === JSON.stringify(beforeUpdate)
    let msg;
    let showEditPhoto = false
    let success = false
    let showSnackbar = false
    let isLoading = false
    let edited = false;
    let pond
    let name;
    const dispatch = createEventDispatcher()
    function makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const handleClose = () => {
        showModal = !showModal
        dispatch("close", {
            edited : edited,
            showModal : false
        })
        
    }
    const handleAddFile = (err, item) => {
        if (item && showEditPhoto) {
            let file = pond.getFiles()[0].file
            let ext = file ? file.type.split('/')[1] : ""
            fotoName = `${makeid(12)}.${ext}`

        }
    }
    const handleSubmit = async () => {
        isLoading = true
        let fd;
        let ok = true
        if (showEditPhoto) {
            let file = pond.getFiles()
            if (file.length > 0 ) {
                fd = new FormData()
                fd.append('foto', file[0].file, fotoName)
                fd.append('nama', nama)
                fd.append('alamat', alamat)
                fd.append('fotoName', fotoName)
            } else {
                ok = false
                msg = 'Silakan Masukan Foto'
                success = false
                isLoading = false
                showSnackbar = true
                setTimeout(() => {
                    showSnackbar = false
                }, 2000)
            }
            
        } else {
            fd = {
                nama : nama,
                alamat : alamat,
                fotoName : fotoName
            }
        }
        if (ok) {
            try {
                let url = $baseURL+'/pk/edit/'+_id
                let req = await axios.post(url,fd,{
                    headers : {
                        Authorization : localStorage.getItem('token admin')
                    }
                })
                msg = req.data.message
                success = true
                isLoading = false
                showSnackbar = true
                setTimeout(() => {
                    showSnackbar = false
                    edited = true
                    handleClose()

                }, 2000)
                isLoading = false
                
            } catch (error) {
                if (error.response) msg = error.response.data.message
                else msg = error
                isLoading = false
                success = false
                showSnackbar = true
                setTimeout(() => {
                    showSnackbar = false
                }, 2000)
                isLoading = false
            }   
        }
        
    }
    const toggleEditPhoto = () => {
        showEditPhoto = !showEditPhoto
        if (showEditPhoto === false) fotoName = beforeUpdate.fotoName
    }
    
</script>

{#if showModal}
    <div class="bg-gray-600 px-5 bg-opacity-90 min-h-screen w-full absolute flex justify-center items-center inset-0 z-20" on:click|self={handleClose}>
        {#if isLoading}
        <div class="bg-gray-600 px-5 bg-opacity-50 min-h-screen w-full absolute flex justify-center items-center inset-0 z-30" ></div>
        {/if}
        {#if showSnackbar}
        <Snackbar message="{msg}" {success}/>
        {/if}
        <div class="bg-blue-803 w-full md:w-4/6 lg:w-3/4 rounded shadow-lg p-5" in:fly={{y :-100 ,duration : 200}} out:fly={{y : -100, duration : 200}}>
            <div class="flex flex-col w-full h-full">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl tracking-wider text-white">Edit <code>{kode}</code> </h1>
                    <button on:click="{handleClose}" class="bg-transparent rounded hover:text-white text-gray-400 focus:ring-0 focus:outline-none">
                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19L5 5M19 5L5 19"/>
                        </svg>
                    </button>
                </div>
                <form on:submit|preventDefault={handleSubmit}  class="h-full ">
                    <div class="flex flex-col">
                        <div class="flex flex-row py-1">
                            <div class="w-2/5 space-y-2">
                                {#if !showEditPhoto}
                                <div class="flex flex-col items-center" >
                                    <img class="object-cover h-32 rounded" src="{$baseURL+'/pk/photo/'+fotoName}" alt="{nama}">
                                    <button class=" text-gray-300 w-1/2 py-2 rounded hover:text-white" on:click={toggleEditPhoto}>
                                        Ganti Foto
                                    </button>
                                </div>
                                {:else}
                                <div >
                                    <FilePond bind:this={pond} server="/" {name} class="filepond" allowMultiple={false} onaddfile={handleAddFile}/>
                                    <div class="flex flex-col items-center w-full">
                                        <button class=" text-gray-300 w-1/2 py-2 rounded hover:text-white" on:click={toggleEditPhoto}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                {/if}
                            </div>
                            <div class="w-3/5 ml-2">
                                <div>
                                    <label for="" class="text-md font-semibold -mt-2 text-gray-300">Nama Puskesmas</label>
                                    <input type="text" class="block py-2 px-4 rounded placeholder-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-800" required placeholder="Puskesmas Sehat" bind:value={nama}>
                                </div>
                                <div>
                                    <label for="" class="text-md font-semibold text-gray-300">Alamat</label>
                                    <textarea placeholder="Alamat" class="resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-800 rounded py-2 px-4 w-full" required bind:value={alamat}></textarea>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="mt-1">
                        <div class="flex justify-end mt-1 items-center space-x-2">
                            <button on:click="{handleClose}"  class="disabled:opacity-50 py-2 px-3 bg-white rounded-xl uppercase shadow">cancel</button>
                            <button type="submit" disabled={ableToEdit} class="disabled:opacity-50 py-2 px-3 bg-blue-801 rounded-xl text-white uppercase shadow">Update</button>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
{/if}
