import axios from 'axios'
import store from './../store/store'
// 根地址https://m.yanss.cn   http://192.168.42.2:3000
const BASE_URL = 'http://192.168.42.2:3000';  
export default{  
    BASE_URL  
}  

// get方法
export function fetch(url,params = {})  {
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(response => {
            if(response.data.code == 400){
                store.state.error = 0    
            }else if(response.data.code == 200){
                store.state.error = 1  
            }
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}


// post方法
export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                if(response.data.code == 400){
                    store.state.error = 0
                }else if(response.data.code == 200){
                    store.state.error = 1  
                }
                resolve(response.data);
            },err => {
                reject(err);
            })
    })
}

// patch方法
export function patch(url,data ={}) {
    return new Promise ((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err);
            })
    })
}

// put方法
export function put(url,data ={}) {
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err);
            })
    })
}