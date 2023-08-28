import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })
export const cartStore = defineStore({
    id: "CartStore",
    state: () => ({
        carts: [],
        carts_current_page: 1,
        carts_total_pages: 0,
        carts_page_limit: 5,
        cart: [],
        errors: [],
        cart_is_loading: false,
        single_cart_is_loading: false,
        cart_network_error: false,
        single_cart_network_error: false,
        total_users_cart_count: document.cookie.split(';').find(c => c.trim().startsWith(`carts=`)) ? JSON.parse(decodeURIComponent(document.cookie.split(';').find(c => c.trim().startsWith(`carts=`)).split('=')[1])).length : 0,
    }),
    actions: {
        async addToCart() {
            this.cart_item_count++
        },
        addToCookieCart(payload) {
            try {
                this.cart_is_loading = true
                const name = 'carts'
                const expires = new Date()
                const duration = 1 * 24 * 60 * 60 * 1000
                expires.setTime(expires.getTime() * duration)
                const cookie = this.isThereCartInCookie()
                if (cookie) {
                    this.carts = [...cookie, payload]
                } else {
                    this.carts.push(payload)
                }
                if (location.protocol !== 'https:') {
                    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(this.carts))};expires=${expires.toUTCString()};path=/;SameSite=None`
                } else {
                    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(this.carts))};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`
                }
                this.cart_is_loading = false
                this.total_users_cart_count = this.total_users_cart_count + 1
                return true
            } catch (error) {
                console.log(error)
                this.cart_is_loading = false
            }
        },
        removeCookieCarts() {
            if (location.protocol !== 'https:') {
                document.cookie = 'carts=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None';
            } else {
                document.cookie = 'carts=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None;Secure';
            }
        },
        resetUsersCartCount() {
            if (document.cookie.split(';').find(c => c.trim().startsWith(`carts=`))) {
                this.total_users_cart_count = document.cookie.split(';').find(c => c.trim().startsWith(`carts=`)).split('=')[0].length
            } else {
                this.total_users_cart_count = 0
            }
        },
        isThereCartInCookie() {
            const name = 'carts'
            const cookie = document.cookie.split(';').find(c => c.trim().startsWith(`${name}=`))
            if (cookie) {
                return JSON.parse(decodeURIComponent(cookie.split('=')[1]))
            } else {
                return null
            }
        },
        resetCartItemCount() {
            this.cart_item_count = 0
        },
        async fetchAllCarts(payload) {
            try {
                this.cart_is_loading = true
                this.carts = []
                const responce = await axiosInstance.get('cart/?q=' + payload + '&page=' + this.carts_current_page + '&limit=' + this.carts_page_limit)
                this.carts = await responce.data.carts
                this.total_users_cart_count = await responce.data.cart_counts
                this.carts_total_pages = await responce.data.total_pages
                this.carts_current_page = await responce.data.current_page
                this.cart_is_loading = false
                return true
            } catch (error) {
                this.cart_is_loading = false
                console.log(error)
                this.errors = error.response.data
                if (error.code == 'ERR_NETWORK') {
                    this.cart_network_error = true
                }
                return false
            }
        },
        async fetchCart(payload) {
            try {
                this.single_cart_is_loading = true
                this.cart = []
                const responce = await axiosInstance.get('cart/' + payload)
                this.cart = await responce.data.cart
                this.single_cart_is_loading = false
                return true
            } catch (error) {
                this.single_cart_is_loading = false
                console.log(error)
                this.errors = error.response.data
                if (error.code == 'ERR_NETWORK') {
                    this.single_cart_network_error = true
                }
                return false
            }
        },
        setCartsCurrentPage(payload) {
            this.carts_current_page = payload
        },
        setCartsTotalPage(payload) {
            this.carts_total_pages = payload
        },
        setCartPageLimit(payload) {
            this.carts_page_limit = payload
        },
        resetCartError() {
            this.errors = []
        },
        resetCartsNetworkError() {
            this.cart_network_error = false
        },
        resetSingleCartNetworkError() {
            this.single_cart_network_error = false
        }
    },
    getters: {
        getCartItemCount: (state) => {
            return state.total_users_cart_count + state.carts.length
        },
        getCarts: (state) => {
            return state.carts
        },
        getCart: (state) => {
            return state.cart
        },
        getCartsCurrentPage: (state) => {
            return state.carts_current_page
        },
        getCartsTotalPage: (state) => {
            return state.carts_total_pages
        },
        getCartsPageLimit: (state) => {
            return state.carts_page_limit
        },
        getErrors: (state) => {
            return state.errors
        },
        getCartIsLoading: (state) => {
            return state.cart_is_loading
        },
        getSingleCartIsLoading: (state) => {
            return state.single_cart_is_loading
        },
        getCartsNetworkError: (state) => {
            return state.cart_network_error
        },
        getSingleCartNetworkError: (state) => {
            return state.single_cart_network_error
        },
        getTotalUsersCartCount: (state) => {
            return state.total_users_cart_count
        }
    }
})



if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(cartStore,
        import.meta.hot))
}