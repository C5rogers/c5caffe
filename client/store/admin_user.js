import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })

export const adminUsersStore = defineStore({
    id: 'AdminUsersStore',
    state: () => ({
        users: [],
        user: [],
        errors: [],
        users_current_page: 1,
        users_total_page: 0,
        users_page_limit: 10,
        is_users_loading: false,
        is_user_loading: false,
        users_network_error: false,
        user_network_error: false,
        error_message: '',
        success_message: '',
        total_users: 0,
    }),
    actions: {
        resetUsersNetworkError() {
            this.users_network_error = false
        },
        setCurrentPage(payload) {
            this.users_current_page = payload
        },
        resetUsersError() {
            this.errors = []
        },
        setUsersPageLimit(payload) {
            this.users_page_limit = payload
        },
        async getUsers(payload) {
            try {
                this.is_users_loading = true
                const responce = await axiosInstance.get('/auth/users/?q=' + payload + '&limit=' + this.users_page_limit + '&page=' + this.users_current_page)
                if (responce.status == 200 || responce.status == 201) {
                    this.users = await responce.data.users
                    this.total_users = await responce.data.total_users
                    this.users_total_page = await responce.data.total_users_page
                    this.users_current_page = await responce.data.current_page
                    this.is_users_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_users_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.users_network_error = true
                }
                return false
            }
        }
    }
})


if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(adminUsersStore,
        import.meta.hot))
}