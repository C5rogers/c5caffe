import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        counter: 0
    }),
    actions: {
        incriment_counter() {
            this.counter++;
        }
    },
    getters: {
        get_counter() {
            return this.counter
        }
    }
})