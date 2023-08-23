import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })
export const cartStore = defineStore({
    id: "CartStore",
    state: () => ({
        cart_item_count: 0,
        carts: [],
    }),
    actions: {
        addToCart() {
            this.cart_item_count++
        },
        resetCartItemCount() {
            this.cart_item_count = 0
        },
        async getAllCarts() {

        }
    },
    getters: {
        getCartItemCount: (state) => {
            return state.cart_item_count
        },
        getCarts: (state) => {
            return state.carts
        }
    }
})



if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(cartStore,
        import.meta.hot))
}