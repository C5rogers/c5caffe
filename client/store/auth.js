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
        anonimous_user_pages: ['index', 'about', 'contact', 'product', 'product-id', 'auth-login', 'auth-signup', 'auth-forgot_password', 'auth-change_password'],
        admin_user_pages: ['admin', 'admin-product', 'admin-product-create', 'admin-product-edit-id', 'admin-user', 'admin-user-edit-id', 'admin-selled_order', 'admin-analisis'],
        attemptErrors: [],
        network_error: false,
        password_reset_success_message: '',
        password_reset_error_message: "",
        password_reset_token: "",
        password_reseted_email_error_message: "",
        password_reset_network_error: false,
    }),
    actions: {
        loadUserInformation() {
            this.user = localStorage.getItem('C5_ONLINE_CAFFE_USER') ? JSON.parse(localStorage.getItem('C5_ONLINE_CAFFE_USER')) : null
            this.isAuthed = localStorage.getItem('C5_ONLINE_CAFFE_USER') ? true : false
            this.isAdmin = localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') == 'admin' ? true : false
            this.roll = localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') ? localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') : 'anonymous'
        },
        async login(payload) {
            try {
                const responce = await axiosInstance.post('auth/login', payload)
                if (responce.status == 200) {
                    this.user = responce.data.user
                    localStorage.setItem('C5_ONLINE_CAFFE_USER', JSON.stringify(responce.data.user))
                    localStorage.setItem('C5_ONLINE_CAFFE_USER_ROLL', this.user.roll)
                    this.isAuthed = true
                    if (this.user.roll == 'admin') {
                        this.isAdmin = true
                    }
                    const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt='));
                    if (jwtCookie) {
                        const jwtToken = jwtCookie.split('=')[1];
                        localStorage.setItem('C5_ONLINE_CAFFE_TOKEN', jwtToken)
                    }
                    if (document.cookie.split(';').find(c => c.trim().startsWith(`carts=`))) {
                        if (location.protocol !== 'https:') {
                            document.cookie = 'carts=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None';
                        } else {
                            document.cookie = 'carts=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None;Secure';
                        }
                    }
                    return true
                } else if (responce.status == 400) {
                    this.errors = responce.data
                    return false
                } else if (responce.status == 401) {
                    this.attemptErrors = responce.data.errors
                }
                return false
            } catch (error) {
                console.log(error)
                if (error.response && error.response.status == 400) {
                    this.attemptErrors = error.response.data.errors
                } else if (error.response && error.response.status == 401) {
                    this.attemptErrors = error.response.data
                }
                if (error.code == 'ERR_NETWORK') {
                    this.network_error = true
                }
                return false
            }

        },
        async logout() {
            try {
                const result = await axiosInstance.post('auth/logout')
                if (result.status == 200) {
                    this.resetAuthInformation()
                    return true
                }
                return false

            } catch (error) {
                console.log(error)
                return false
            }
        },
        async signup(payload) {
            try {
                const responce = await axiosInstance.post('auth/signup', payload)
                this.user = responce.data.user
                localStorage.setItem('C5_ONLINE_CAFFE_USER', JSON.stringify(responce.data.user))
                localStorage.setItem('C5_ONLINE_CAFFE_USER_ROLL', this.user.roll)
                this.isAuthed = true
                if (this.user.roll == 'admin') {
                    this.isAdmin = true
                }
                const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt='));
                if (jwtCookie) {
                    const jwtToken = jwtCookie.split('=')[1];
                    localStorage.setItem('C5_ONLINE_CAFFE_TOKEN', jwtToken)
                }
                if (document.cookie.split(';').find(c => c.trim().startsWith(`carts=`))) {
                    if (location.protocol !== 'https:') {
                        document.cookie = 'carts=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None';
                    } else {
                        document.cookie = 'carts=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None;Secure';
                    }
                }
                return true
            } catch (error) {
                console.log(error)
                if (error.response && error.response.status == 400) {
                    this.attemptErrors = error.response.data
                } else if (error.response && error.response.status == 401) {
                    this.attemptErrors = error.response.data
                }
                if (error.code == 'ERR_NETWORK') {
                    this.network_error = true
                }
                console.log("the error object:")
                console.log(this.attemptErrors)
                return false
            }
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
        },
        isAdminPage(page) {
            const thePage = this.admin_user_pages.find(pagename => pagename == page)
            if (thePage) {
                return true
            } else {
                return false
            }
        },
        resetNetworkError() {
            this.network_error = false
        },
        resetChangePasswordNetworkError() {
            this.password_reset_network_error = false
        },
        resetAuthInformation() {
            localStorage.removeItem('C5_ONLINE_CAFFE_USER')
            localStorage.removeItem('C5_ONLINE_CAFFE_USER_ROLL')
            localStorage.clear()
            this.user = null
            this.isAuthed = false
            this.isAdmin = false
            this.roll = 'anonymous'
        },
        resetAttemptError() {
            this.attemptErrors = []
        },
        getRoll() {
            if (localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL')) {
                this.roll = localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL')
            }
        },
        async PasswordResetRequest(payload) {
            try {
                const responce = await axiosInstance.post('/auth/password/reset', payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.password_reset_success_message = await responce.data.message
                    this.password_reset_token = await responce.data.token
                    return true
                }
            } catch (error) {
                console.log(error)
                if (error.response) {
                    this.attemptErrors = error.response.data
                    if (error.response.data.message) {
                        this.password_reset_error_message = error.response.data.message
                    }
                    if (error.code == 'ERR_NETWORK') {
                        this.password_reset_network_error = true
                    }
                }
                return false
            }
        },
        async changePassword(payload) {
            try {
                const responce = await axiosInstance.post('/auth/password/reset/update', payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.password_reset_success_message = await responce.data.message
                    if (responce.data.error) {
                        this.password_reseted_email_error_message = await responce.data.error
                    }
                    return true
                }
            } catch (error) {
                console.log(error)
                if (error.response) {
                    this.attemptErrors = error.response.data
                    if (error.response.data.message) {
                        this.password_reset_error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.password_reset_network_error = true
                }
                return false
            }
        },
        resetPasswordSuccessMessage() {
            this.password_reset_success_message = ''
        },
        resetPasswordErrorMessage() {
            this.password_reset_error_message = ''
        },
        resetPasswordEmailErrorMessage() {
            this.password_reseted_email_error_message = ''
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