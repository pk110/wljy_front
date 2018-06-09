import axios from 'axios'

// 根地址https://m.yanss.cn   http://192.168.11.168:8080
const BASE_URL = 'https://m.yanss.cn';  
export function url(){
    return BASE_URL
}

// get方法
export function fetch(url,params = {})  {
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(response => {
            if(response.data.code == 0){
              delCookie('userLogin')
              delCookie('username')
              document.location.reload()
              alert('账号失效，请重新登陆')
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
                if(response.data.code == 0){
                  delCookie('userLogin')
                  delCookie('username')
                  document.location.reload()
                  alert('账号失效，请重新登陆')
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