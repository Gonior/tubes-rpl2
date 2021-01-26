import {writable,readable} from 'svelte/store'
import axios from 'axios'
let url = "http://localhost:3000"
export const baseURL= readable(url)

export const logged = writable(false)

export const loggedAdmin = writable(false)
export const queued = writable(false)
export const cekLogin = async (token) => {
    if (localStorage.length !== 0) {
        try {
            let response = await axios.get(url+'/login/verify', {
                headers : { 
                    Authorization: token
                } 
            })
            return response.data.verified
        } catch (error) {
            console.log('err karena : '+error)
            return false
        }
    } else return false   
}
export const cekStatus = async () => {
    if (localStorage.length !== 0) {
        try {
            let response = await axios.get(url+'/q/status', {
                headers : { 
                    Authorization: localStorage.getItem('token')
                } 
            })
            return response.data
        } catch (error) {
            console.log('err karena : '+error)
            return null
        }
    } else return null
}