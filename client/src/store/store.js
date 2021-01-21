import {writable,readable} from 'svelte/store'
import axios from 'axios'
let url = "http://localhost:3000"
export const baseURL= readable(url)

export const logged = writable(false)

export const cekLogin = async () => {
    if (localStorage.length !== 0) {
        try {
            let token = localStorage.getItem('token')
            let response = await axios.post(url+'/login/verify', "", {
                headers : { 
                    Authorization: token} 
            })
            return response.data.verified
        } catch (error) {
            return false
        }
    } else return false
    
}