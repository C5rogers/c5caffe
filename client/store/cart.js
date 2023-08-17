import { acceptHMRUpdate, defineStore } from 'pinia'

export const cartStore = defineStore({
    id: "CartStore",
    state: () => ({
        cart_item_count: 0
    })
})