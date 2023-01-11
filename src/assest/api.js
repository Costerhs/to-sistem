import axios from "axios"
import { getCookie, getData, setCookie } from "./defFunction"
import { default as modal } from 'sweetalert2';
/*
user+
token+
todo get all+
todo get 1+
t delete+
t updeta+
t post*/
let accessToken = getCookie('token')?.access
const instance = axios.create({
    baseURL: `https://todolistapi.pythonanywhere.com/api/`
});
const header = { 'Authorization': `Bearer ${accessToken}` }
const userId = getCookie('user')?.id;
// console.log(accessToken)
export const userApi = {
    registration(data, func) {
        return instance.post('user/', data)
            .then(res => {
                func(false);
                return modal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Успешно зарегистрированы.Теперь вы можете войти',
                    showConfirmButton: true
                })
            })
    },
    setUserData(name, setIsLoad) {
        return instance.get('user/')
            .then(res => {
                setIsLoad(false)
                let userData = res.data.find(el => el.username === name)
                setCookie('user', userData)
            })
    },
    getToken(name, password) {
        return instance.post('token/', { username: name, password: password })
    }
}

export const todoApi = {
    getTodos() {
        return instance.get('todo/', { headers: header })
            .then(res => {
                return res.data
            })
            .catch(res => {
                if (res.response.status === 401) {
                    handleAuthError()
                }
            })
    },
    getTodo(id) {
        return instance.get(`todo/${id}/`, { headers: header })
            .then(res => res.data).catch(res => {
                if (res.response.status === 401) {
                    handleAuthError()
                }
            })
    },
    delTodo(id) {
        return instance.delete(`todo/${id}/`, { headers: header }).catch(res => {
            if (res.response.status === 401) {
                handleAuthError()
            }
        })
    },
    postTodo(data) {
        let todo = { ...data, user: userId, date: getData() }
        console.log(todo)
        return instance.post(`todo/`, todo, { headers: header }).catch(res => {
            if (res.response.status === 401) {
                handleAuthError()
            }
        })
    },
}

function handleAuthError() {
    if (getCookie('user')) {
        userApi.getToken(getCookie('user').username, getCookie('password'))
            .then(res => {
                setCookie('token', res.data)
                accessToken = getCookie('token').access
                console.log(this)
            })
    }

}