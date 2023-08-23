import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })

export const productStore = defineStore({
    id: 'ProductStore',
    state: () => ({
        products: [],
        productRatings: [],
        singleProductRating: [],
        totalProductPages: 0,
        current_page: 1,
        selled_order_count: 0,
        users_count: 0,
        product_limit: 15,
        product: [],
        isProductsLoading: false,
        isSearchingProductsLoading: false,
        isProductLoading: false,
        network_error: false,
        searchedProducts: [],
        searchProductRatings: [],
        searchTotalProductPages: 0,
        searchCurrentPage: 1,
        serchProductLimit: 15,
        searchSelledOrderCount: 0,
        searchUsersCount: 0,
        searchNetworkError: false,
        errors: []
    }),
    actions: {
        async fetchProducts(payload) {
            try {
                this.isProductsLoading = true
                const responce = await axiosInstance('product/?page=' + this.current_page + '& limit=' + this.product_limit)
                this.products = await responce.data.products
                this.productRatings = await responce.data.product_ratings
                this.totalProductPages = await responce.data.total_pages
                this.current_page = await responce.data.current_page
                this.selled_order_count = await responce.data.selled_order_count
                this.users_count = await responce.data.users_count
                this.isProductsLoading = false
            } catch (error) {
                this.isProductsLoading = false
                console.log(error)
                this.errors = error.response.data
                if (error.code == 'ERR_NETWORK') {
                    this.network_error = true
                }
            }
        },
        async fetchProduct(payload) {
            try {
                this.isProductLoading = true
                const responce = await axiosInstance('product/' + payload)
                this.product = await responce.data.product
                this.singleProductRating = await responce.data.product_rating
                this.isProductLoading = false
            } catch (error) {
                this.isProductLoading = false
                console.log(error)
                this.errors = error.response.data
                if (error.code == 'ERR_NETWORK') {
                    this.network_error = true
                }
            }
        },
        resetNetworkError() {
            this.network_error = false
        },
        async searchProduct(payload) {
            try {
                this.isSearchingProductsLoading = true
                const responce = await axiosInstance('product/?q=' + payload + '&page=' + this.searchCurrentPage + '&limit=' + this.serchProductLimit)
                this.searchedProducts = await responce.data.products
                this.searchProductRatings = await responce.data.product_ratings
                this.searchTotalProductPages = await responce.data.total_pages
                this.searchCurrentPage = await responce.data.current_page
                this.searchSelledOrderCount = await responce.data.selled_order_count
                this.searchUsersCount = await responce.data.users_count
                this.isSearchingProductsLoading = false
            } catch (error) {
                this.isSearchingProductsLoading = false
                console.log(error)
                this.errors = error.responce.data
                if (error.code == 'ERR_NETWORK') {
                    this.searchNetworkError = true
                }
            }
        },
        setProductCurrentPage(payload) {
            this.current_page = payload
        },
        setProeductPageLimit(payload) {
            this.product_limit = payload
        },
        setSearchingProductCurrentPage(payload) {
            this.searchCurrentPage = payload
        },
        setSearchProductPageLimit(payload) {
            this.serchProductLimit = payload
        }
    },
    getters: {
        getIsSearchingProductLoading: (state) => {
            return state.isSearchingProductsLoading
        },
        getSingleProductRatings: (state) => {
            return state.singleProductRating
        },
        getProductRatings: (state) => {
            return state.productRatings
        },
        getProductTotalPages: (state) => {
            return state.totalProductPages
        },
        getCurrentProductPage: (state) => {
            return state.current_page
        },
        getSelledOrdersCount: (state) => {
            return state.selled_order_count
        },
        getUsersCount: (state) => {
            return state.users_count
        },
        getProducts: (state) => {
            return state.products
        },
        getProduct: (state) => {
            return state.product
        },
        getSearchedProducts: (state) => {
            return state.searchedProducts
        },
        getSearchProductCurrentPage: (state) => {
            return state.searchCurrentPage
        },
        getSearchProductLimit: (state) => {
            return state.serchProductLimit
        },
        getSearchProductRatings: (state) => {
            return state.searchProductRatings
        },
        getSearchTotalProductPages: (state) => {
            return state.searchTotalProductPages
        },
        getSearchSelledOrdersCount: (state) => {
            return state.searchSelledOrderCount
        },
        getSearchUsersCount: (state) => {
            return state.searchUsersCount
        }
    }

})



if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(productStore,
        import.meta.hot))
}