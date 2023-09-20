import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })


export const adminSelledOrderStore = defineStore({
    id: 'AdminSelledOrderStore',
    state: () => ({
        selled_order: [],
        selled_orders: [],
        selled_orders_count: 0,
        selled_orders_total_page: 0,
        selled_orders_current_page: 1,
        selled_orders_page_limit: 5,
        is_selled_order_loading: false,
        is_selled_orders_loading: false,
        selled_order_network_error: false,
        selled_orders_network_error: false,
        errors: [],
        error_message: '',
        success_message: ''
    }),
    actions: {
        resetErrors() {
            this.errors = []
        },
        resetErrorMessage() {
            this.error_message = ''
        },
        resetSuccessMessage() {
            this.success_message = ''
        },
        resetSelledOrderNetworkError() {
            this.selled_order_network_error = false
        },
        resetSelledOrdersNetworkError() {
            this.selled_orders_network_error = false
        },
        setSelledOrderPageLimit(payload) {
            this.selled_orders_page_limit = payload
        },
        setSelledOrderCurrentPage(payload) {
            this.selled_orders_current_page = payload
        },
        async getSelledOrders(payload) {
            try {
                this.is_selled_orders_loading = true
                const responce = await axiosInstance.get('/selled_order/?q=' + payload + '&page=' + this.selled_orders_current_page + '&limit=' + this.selled_orders_page_limit)
                if (responce.status == 200 || responce.status == 201) {
                    this.selled_orders = await responce.data.selled_orders
                    this.selled_orders_count = await responce.data.selled_order_counts
                    this.selled_orders_total_page = await responce.data.total_pages
                    this.selled_orders_current_page = await responce.data.current_page
                    this.is_selled_orders_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_selled_orders_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.selled_orders_network_error = true
                }
                return false
            }
        },
        async getSelledOrder(payload) {
            try {
                this.is_selled_order_loading = true
                const responce = await axiosInstance.get('/selled_order/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.selled_order = await responce.data.selled_order
                    this.is_selled_order_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_selled_order_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.selled_order_network_error = true
                }
                return false
            }
        },
        async deleteSelledOrder(payload) {
            try {
                this.is_selled_order_loading = true
                const responce = await axiosInstance.delete('/selled_order/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.success_message = await responce.data.message
                    this.is_selled_order_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_selled_order_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.selled_order_network_error = true
                }
            }
        }
    },
    getters: {

    }
})
if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(adminSelledOrderStore,
        import.meta.hot))
}