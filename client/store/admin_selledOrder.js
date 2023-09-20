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

        },
    },
    getters: {

    }
})