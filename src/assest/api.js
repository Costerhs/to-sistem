import axios from "axios"
import { getCookie, getData, setCookie } from "./defFunction"
import { default as modal } from 'sweetalert2';

let accessToken = getCookie('token')?.access
const instance = axios.create({
    baseURL: `https://todolistapi.pythonanywhere.com/api/`
});
let header = { 'Authorization': `Bearer ${accessToken}` }

export const userApi = {
    registration(data, func) {
        return instance.post('users/', data)
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
        return instance.get('users/')
            .then(res => {
                setIsLoad(false)
                let userData = res.data.find(el => el.username === name)
                setCookie('user', userData)
                window.location.reload();
            })
    },
    getToken(name, password) {
        return instance.post('token/', { username: name, password: password })
    },
    refresh() {
        return instance.post('token/refresh/', { "refresh": `${getCookie('token').refresh}` })
            .then(res => res.data.access)
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
                    return handleAuthError(this.getTodos)
                }
            })
    },
    getTodo(id) {
        return instance.get(`todo/${id}/`, { headers: header })
            .then(res => res.data).catch(res => {
                if (res.response.status === 401) {
                    return handleAuthError(this.getTodo, id)
                }
            })
    },
    delTodo(id) {
        return instance.delete(`todo/${id}/`, { headers: header }).catch(res => {
            if (res.response.status === 401) {
                return handleAuthError(this.delTodo, id)
            }
        })
    },
    postTodo(data, getTodos) {
        let todo = { ...data, user: getCookie('user')?.id, date: getData() }
        console.log(getCookie('user'))
        return instance.post(`todo/`, todo, { headers: header }).catch(res => {
            if (res.response.status === 401) {
                return handleAuthError(this.postTodo, data, getTodos)
            }
        })
            .then(() => {
                getTodos()
            })
    },
    editTodo(data, id, getTodos) {
        return instance.patch(`todo/${id}/`, data, { headers: header })
            .catch(res => {
                if (res.response.status === 401) {
                    return handleAuthError(this.editTodo, data, id, getTodos)
                }
            })
    }
}

async function handleAuthError(func, ...atr) {
    if (getCookie('user')) {
        let newToken;
        await userApi.refresh()
            .then(res => newToken = res)
        header = { 'Authorization': `Bearer ${newToken}` }
        return func(...atr)
    }
}