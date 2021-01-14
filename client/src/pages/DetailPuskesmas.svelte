<script>
    import BackButton from '../components/BackButton.svelte'
    import NavLink from "../components/NavLink.svelte"
    import { fly } from 'svelte/transition'
</script>

<div
    in:fly={{x :300, duration:300}} 
    out:fly={{x : -300, duration:300}}
    class="flex flex-col h-screen bg-blue-803 absolute inset-0 z-10 sm:px-7 md:px-14">
    <div class="h-12 flex text-white items-center px-4 mt-2">
        <NavLink to="/">
            <BackButton promp="Kembali"/>
        </NavLink>
    </div>
    <div class="flex flex-col md:flex-row h-full md:h-1/2 md:mt-20">
        <div class="w-full h-1/3 md:h-full p-1">
            <img class="rounded shadow-lg h-44 md:h-full w-full object-cover" src="https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/12/97f282254599a12b9a94652e1b59686b.jpg" alt="puskesmas">
        </div>
        <div class="flex flex-col h-full justify-between md:w-full mt-5 px-2 md:mt-0 ">
            <div class="flex flex-col text-xs sm:text-md lg:text-base space-y-1 md:space-y-0">
                <!-- <h1 class="text-gray-300 font-semibold text-xl">Informasi Puskemas</h1> -->
                <div class="flex">
                    <div class="w-1/3 text-gray-400 flex-none px-2">Kode Puskesmas</div>
                    <div class="text-white">123124125151</div>
                </div>
                <div class="flex">
                    <div class="w-1/3 text-gray-400 flex-none px-2">Nama Puskesmas</div>
                    <div class="text-white"> Puskemas Padasuka</div>
                </div>
                <div class="flex">
                    <div class="w-1/3 text-gray-400 flex-none px-2">Alamat</div>
                    <div class="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quas quo accusantium incidunt repellat, repudiandae adipisci laudantium ratione quaerat, reiciendis voluptate eius corporis, suscipit sapiente ullam sint quos asperiores illum! </div>
                </div>
                <div class="flex">
                    <div class="w-1/3 text-gray-400 flex-none px-2">Email</div>
                    <div class="text-white">example@mail.com</div>
                </div>
                <div class="flex">
                    <div class="w-1/3 text-gray-400 flex-none px-2">Jumlah Antrean</div>
                    <div class="text-white">x orang sedang mengantre</div>
                </div>
                
            </div>
            <div class="mb-5">
                <NavLink to="/queue">
                    <div class="w-full py-4 md:mb-0 mb-4 text-center rounded-full shadow-lg bg-blue-801 hover:bg-blue-800 text-gray-300 hover:text-white">Daftar Antrean</div>
                </NavLink>
            </div>
        </div>
    </div>
</div>