<style global>
    @import 'filepond-plugin-image-preview.css';
</style>
<svelte:head>
    <title>Admin</title>
</svelte:head>
<script>
    import {beforeUpdate, afterUpdate, onMount} from 'svelte'
    import FilePond, { registerPlugin, supported } from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
    import {navigate} from 'svelte-routing'
    import axios from 'axios'
    import {baseURL, cekLogin} from '../store/store.js'
    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
    

    // pond.getFiles() will return the active files

    // the name to use for the internal file input
    function handleInit() {
        logs = [...logs, {err : false, message : `${timeString} - init a file`}]
    }

    function handleAddFile(err, fileItem) {
        if (err) logs = [...logs, {err : false, message : `${timeString} - ${err}`}]
        else logs = [...logs, {err : false, message : `${timeString} - ${fileItem.id} has been added`}]
    }

    let name = 'filepond';
    let pond;
    let logs = []
    let puskesmas = []
    let div;
    let autoscroll;
    let nama;
    let kode;
    let alamat
    let isLoading = false
    let time = new Date()
    let timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} `
    
    onMount(async () => {
        kode = `PK-${makeid(7)}`
        if (localStorage.getItem('token admin') == null) navigate('/authadmin', {replace : true})
        else {
            let log = await cekLogin(localStorage.getItem('token admin'))
            if (!log) navigate('/authadmin', {replace : true})
            else {
                puskesmas = [... await getData()]
            }
        }
    
    }) 
    beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
	});

	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });
    
    const getData = async () => {
        try {
            let url = $baseURL+'/pk'
            let res = await axios.get(url)
            return res.data.puskesmas
        } catch (error) {
            
        }
    }

    const handleSubmit = async (e) => {
        
        isLoading = true
        logs = [...logs, {err : false, message : `${timeString} - set loading to true`}]
        let acceptExt =['jpeg', 'jpg', 'png']
        
        try {
            let file = pond.getFiles()[0].file
            let ext = file ? file.type.split('/')[1] : ""
            if (acceptExt.filter(e => e === ext).length == 0) {
                isLoading = false
                logs = [...logs, {err : true, message : `${timeString} - Format Tidak diterima`}]    
                logs = [...logs, {err : false, message : `${timeString} - set loading to false`}]
            } else {
                if (file.size >= 800000) {
                    isLoading = false
                    logs = [...logs, {err : true, message : `${timeString} - file to large (max) < 800KB`}]    
                    logs = [...logs, {err : false, message : `${timeString} - set loading to false`}]
                } else {
                    let fotoName = makeid(12)+'.'+ext
                    let fd = new FormData()
                    fd.append('foto', file, fotoName)
                    fd.append('nama', nama)
                    fd.append('kode', kode)
                    fd.append('alamat', alamat)
                    fd.append('fotoName', fotoName)
                    try {
                        let url = $baseURL+"/pk/add"
                        let response = await axios.post(url, fd, {
                            headers : {
                                "Content-Type": "multipart/form-data",
                                Authorization : localStorage.getItem('token admin')
                            }
                        })
                        if (response.data) {
                            
                            isLoading = false
                            logs = [...logs, {err : false, message : `${timeString} - set loading to false`}]
                            logs = [...logs, {err : true, message : `${timeString} - ${response.data.message}`}]
                            nama = ""
                            alamat =""
                            kode = 'PK-'+makeid(7)
                            pond.removeFile(file.id)
                            puskesmas = [... await getData()]
                        } else {
                            isLoading = false
                            logs = [...logs, {err : false, message : `${timeString} - set loading to false`}]
                            logs = [...logs, {err : true, message : `${timeString} - error while uploading`}]
                        }
                        
                    } catch (err) {
                        let msg;
                        if (err.response) msg = err.response.message
                        else msg = err
                        isLoading = false
                        logs = [...logs, {err : true, message : `${timeString} - ${msg}`}]
                        logs = [...logs, {err : false, message : `${timeString} - set loading to false`}]            
                    }
                }
                
            }
        } catch (error) {
            isLoading = false
            logs = [...logs, {err : true, message : `${timeString} - Photo is required`}]
            logs = [...logs, {err : false, message : `${timeString} - set loading to false`}]
            
        }        
       
    }

    function makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const removePk = async (id) => {
        let url = $baseURL+"/pk/"+id
        try {
            let res = await axios.delete(url, {
                headers : {            
                    Authorization : localStorage.getItem('token admin')
                }
            })
            logs = [...logs, {err : false, message : `${timeString} - ${res.data.message}`}]
            puskesmas = [... await getData()]
        } catch (error) {
            let msg
            error.response ? msg = error.response.message : msg = error
            logs = [...logs, {err : true, message : `${timeString} - ${msg}`}]
        }
        

    }
</script>

<div class="flex w-full bg-gray-100 h-full absolute inset-0 z-10"> 
    <div class="w-1/2 p-2 flex flex-col justify-between">
        <div class="h-3/4 bg-gray-200 shadow-lg p-1">
            <form on:submit|preventDefault={handleSubmit}  class="h-full ">
                <div class="flex flex-col">
                    <div class="flex flex-row py-1">
                        <div class="w-2/5 ">
                            <FilePond bind:this={pond} {name} server="/" class="filepond" allowMultiple={false} oninit={handleInit} onaddfile={handleAddFile}/>

                        </div>
                        <div class="w-3/5 ml-2">
                            <div>
                                <label for="" class="text-md font-semibold text-gray-500">Nama Puskesmas</label>
                                <input type="text" class="block py-2 px-4 rounded placeholder-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-800" required placeholder="Puskesmas Sehat" bind:value={nama}>
                            </div>
                            <div class="mt-2">
                                <label for="" class="text-md font-semibold text-gray-500">Kode Puskesmas</label>
                                <input readonly type="text" class="block py-2 px-4 rounded placeholder-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-800" bind:value={kode}>
                            </div>
                            
                        </div>
                    </div>    
                </div>
                <div class="mt-1">
                    <div>
                        <textarea placeholder="Alamat" class="resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-800 rounded py-2 px-4 w-full" required bind:value={alamat}></textarea>
                    </div>
                    <div class="flex justify-end mt-1 items-center">
                        <button type="submit" disabled={isLoading} class="bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-50 py-1 px-4 rounded">Save</button>
                    </div>
                </div>
            </form>
        </div>
        
        <div bind:this={div} class="h-36 flex-none bg-gray-400 mt-2 overflow-y-auto p-2 text-sm">       
            <h1 class="font-semibold">Log</h1> 
            {#each logs as log}
                <p class="{log.err ? 'text-red-600 font-bold' : ''}"><code>{log.message}</code></p>        
            {/each}
            
        </div>
        
    </div>
    <div class="w-1/2 p-4">
        <div class="h-24 ">
            {#await puskesmas}
                <p>loading ...</p>
            {:then value}
                {#each value as pk}
                <div class="bg-gray-200 rounded flex py-4 px-5 items-center justify-between mb-4 shadow-md space-x-2">
                    <div class="flex items-center space-x-3">
                        <div class="">
                            <img class="object-cover h-16 rounded" src="{$baseURL+'/pk/photo/'+pk.fotoName}" alt="{pk.nama}">
                        </div>
                        <div>
                            <code><p class="text-sm font-semibold text-gray-700">{pk.kode}</p></code>
                            <h1 class="text-xl">{pk.nama}</h1>
                            <p class="text-sm text-gray-700">{pk.alamat}</p>
                        </div>
                    </div>
                    
                    <div>
                        <button class="h-5 w-5 text-gray-400 hover:text-black" on:click={removePk(pk._id)}>
                            <svg viewBox="0 0 24 24">
                                <path d="M4 7h16m-4 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M6 7h12v13a1 1 0 01-1 1H7a1 1 0 01-1-1V7h0z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            </svg> 
                        </button>
                    </div>
                </div>
                    
                {/each}
            {/await}
        </div>
        
    </div>
</div>