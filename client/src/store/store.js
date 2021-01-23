import {writable,readable} from 'svelte/store'
import axios from 'axios'
let url = "http://localhost:3000"
export const baseURL= readable(url)

export const logged = writable(false)

export const loggedAdmin = writable(false)

export const cekLogin = async (token) => {
    if (localStorage.length !== 0) {
        try {
            let response = await axios.post(url+'/login/verify', "", {
                headers : { 
                    Authorization: token
                } 
            })
            return response.data.verified
        } catch (error) {
            return false
        }
    } else return false   
}