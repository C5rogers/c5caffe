import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";




const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })

export const authStore = defineStore({
    id: 'AuthStore',
    state: () => ({
        user: localStorage.getItem('C5_ONLINE_CAFFE_USER') ? JSON.parse(localStorage.getItem('C5_ONLINE_CAFFE_USER')) : null,
        isAuthed: localStorage.getItem('C5_ONLINE_CAFFE_USER') ? true : false,
        isAdmin: localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') == 'admin' ? true : false,
        roll: localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') ? localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') : 'anonymous',
        protected_pages: ['cart', 'order'],
        attemptErrors: []
    }),
    actions: {
        async login(payload) {
            try {
                const responce = await axiosInstance.post('auth/login', payload)
                if (responce.status == 200) {
                    console.log(responce)
                    this.user = responce.data.user
                    console.log("the responce header" + responce.headers)
                    localStorage.setItem('C5_ONLINE_CAFFE_USER', JSON.stringify(responce.data.user))
                    localStorage.setItem('C5_ONLINE_CAFFE_USER_ROLL', this.user.roll)
                    this.isAuthed = true
                    const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt='));
                    if (jwtCookie) {
                        const jwtToken = jwtCookie.split('=')[1];
                        console.log(jwtToken);
                        localStorage.setItem('C5_ONLINE_CAFFE_TOKEN', jwtToken)
                    }
                    return true
                } else if (responce.status == 400) {
                    this.errors = responce.data
                    return false
                }
                return false
            } catch (error) {
                console.log("the error is:" + error)
                console.log(error.message)
                if (error && error.status == 400) {
                    this.attemptErrors = error.responce.data.errors
                } else if (error.status == 401) {
                    this.attemptErrors = "Server error. Please try again!"
                }
                return false
            }

        },
        async logout(payload) {

        },
        async signup(payload) {

        },
        async log_with_google() {

        },
        isProtectedPage(page) {
            const thePage = this.protected_pages.find(pagename => pagename == page)
            if (thePage) {
                return true
            } else {
                return false
            }
        }
    },
    getters: {
        getUser: (state) => {
            return state.user
        },
        isAuthenticated: (state) => {
            return state.isAuthed
        },
        isUserAdmin: (state) => {
            return state.isAdmin
        },
        getUserRoll: (state) => {
            return state.roll
        },
        getProtectedPageList: (state) => {
            return state.protected_pages
        },
        getErrors: (state) => {
            return state.attemptErrors
        }

    }
})

if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(authStore,
        import.meta.hot))
}