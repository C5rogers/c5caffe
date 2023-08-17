import { acceptHMRUpdate, defineStore } from 'pinia'

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