import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'


const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })


export const orderStore = defineStore({
    id: "OrderStore",
    state: () => ({
        user_orders: [],
        is_user_orders_loading: false,
        user_order: [],
        orders_total_page: 0,
        orders_current_page: 1,
        orders_page_limit: 5,
        is_user_order_loading: false,
        is_user_initializing_order: false,
        orders_network_error: false,
        order_network_error: false,
        initializing_order_network_error: false,
        the_initialized_user_order: [],
        initializing_order_payment_url: '',
        errors: [],
        error_message: '',
        success_message: ''
    }),
    actions: {
        async getOrders(payload) {
            try {
                this.is_user_orders_loading = true
                const responce = await axiosInstance.get('/order')
                if (responce.status == 200 || responce.status == 201) {
                    this.user_orders = await responce.data.orders
                    this.orders_current_page = await responce.data.current_page
                    this.orders_total_page = await responce.data.total_pages
                    this.is_user_orders_loading = false
                    if (await responce.data.message) {
                        this.success_message = await responce.data.message
                    }
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_user_orders_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.orders_network_error = true
                }
                return false
            }
        },
        async getOrder(payload) {
            try {
                this.is_user_order_loading = true
                const responce = await axiosInstance.get('/order/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.user_order = await responce.data.order
                    this.is_user_order_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_user_order_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') this.order_network_error = true
                return false
            }
        },
        async initializeOrder() {
            try {
                this.is_user_initializing_order = true
                const responce = await axiosInstance.post('/order/init')
                if (responce.status == 201 || responce.status == 200) {
                    this.the_initialized_user_order = await responce.data.theOrder
                    this.initializing_order_payment_url = await responce.data.paymentUrl
                    this.is_user_initializing_order = false
                    return true
                }

            } catch (error) {
                console.log(error)
                this.is_user_initializing_order = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.initializing_order_network_error = true
                }
                return false
            }
        },
        async deleteOrder(payload) {
            try {
                this.is_user_order_loading = true
                const responce = await axiosInstance.delete('/delete/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.success_message = await responce.data.message
                    this.is_user_order_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_user_order_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.order_network_error = true
                }
                return false
            }
        },
        async complteOrderPayment(payload) {
            try {
                this.is_user_order_loading = true
                const responce = await axiosInstance.post('/order/complete/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.success_message = await responce.data.message
                    this.the_initialized_user_order = await responce.data.updatedOrder
                    this.is_user_order_loading = false
                    return true
                }

            } catch (error) {
                console.log(error)
                this.is_user_order_loading = true
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.order_network_error = true
                }
                return false
            }
        },
        resetErrors() {
            this.errors = []
        },
        resetOrderNetworkError() {
            this.order_network_error = false
        },
        resetInitializingNetworkError() {
            this.initializing_order_network_error = false
        },
        resetOrdersNetworkError() {
            this.orders_network_error = false
        },
        resetSuccessMessage() {
            this.success_message = ''
        },
        resetErrorMessage() {
            this.success_message = ''
        },
        setPageLimit(payload) {
            this.orders_page_limit = payload
        },
        setCurrentPage(payload) {
            this.orders_current_page = payload
        },
        resetOrdersPageInformation() {
            this.orders_current_page = 1
            this.orders_page_limit = 5
        },
        resetOrderPaymentUri() {
            this.initializing_order_payment_url = ''
        },
        resetInitializedPaymentOrder() {
            this.the_initialized_user_order = []
        },
    },
    getters: {

    }
})


if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(orderStore,
        import.meta.hot))
}