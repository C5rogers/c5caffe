import { acceptHMRUpdate, defineStore } from "pinia";

export const authStore = defineStore({
    id: 'AuthStore',
    state: () => ({
        user: localStorage.getItem('C5_ONLINE_CAFFE_USER') ? localStorage.getItem('C5_ONLINE_CAFFE_USER') : null,
        isAuthed: localStorage.getItem('C5_ONLINE_CAFFE_TOKEN') ? true : false,
        isAdmin: (localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') == 'admin') ? true : false,
        roll: localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') ? localStorage.getItem('C5_ONLINE_CAFFE_USER_ROLL') : 'anonymous',
        protected_pages: ['cart', 'order']
    }),
    actions: {
        async login(payload) {

        },
        async logout(payload) {

        },
        async signup(payload) {

        },
        async log_with_google() {

        },
        isProtectedPage(page) {
            const thePage = this.protected_pages.find(pagename => pagename == page)
            console.log(thePage)
            if (thePage) {
                return true
            } else {
                return false
            }
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

    }
})

if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(authStore,
        import.meta.hot))
}