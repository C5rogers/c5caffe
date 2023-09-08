import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })

export const adminProductAndCatagoryStore = defineStore({
    id: 'AdminProductAndCatagoryStore',
    state: () => ({
        product: [],
        products: [],
        catagorys: [],
        catagory: [],
        products_current_page: 1,
        products_total_page: 0,
        products_page_limit: 5,
        is_catagory_loading: false,
        is_catagorys_loading: false,
        catagory_network_error: false,
        catagorys_network_error: false,
        errors: [],
        is_product_loading: false,
        is_products_loading: false,
        product_network_error: false,
        products_network_error: false,
        error_message: '',
        success_message: ''
    }),
    actions: {
        resetErrors() {
            this.errors = []
        },
        resetSuccessMessage() {
            this.success_message = ''
        },
        resetErrorMessage() {
            this.error_message = ''
        },
        resetProductNetworkError() {
            this.product_network_error = false
        },
        resetCatagoryNetworkError() {
            this.catagory_network_error = false
        },
        resetCatagorysNetworkError() {
            this.is_catagorys_loading = false
        },
        resetProductsNetworkError() {
            this.is_products_loading = false
        },
        setProductsPageLimit(payload) {
            this.products_page_limit = payload
        },
        async getProducts(payload) {
            try {
                this.is_products_loading = true
                const responce = await axiosInstance.get('/product/?q=' + payload + '&page=' + this.products_current_page + '&limit=' + this.products_page_limit)
                if (responce.status == 200 || responce.status == 201) {
                    this.products = await responce.data.products
                    this.products_current_page = await responce.data.current_page
                    this.products_total_page = await responce.data.total_pages
                    this.is_products_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_products_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.product_network_error = true
                }
                return false
            }
        },
        async getProduct(payload) {
            try {
                this.is_product_loading = true
                const responce = await axiosInstance.get('/product/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.product = await responce.data.product
                    this.is_product_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_product_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.product_network_error = true
                }
                return false
            }
        },
        async createProduct(payload) {
            try {
                this.is_product_loading = true
                const responce = await axiosInstance.post('/product/create', payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.product = await responce.data.newProduct
                    this.is_product_loading = false
                }
                return true
            } catch (error) {
                console.log(error)
                this.is_product_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.product_network_error = true
                }
                return false
            }
        },
        async editProduct(payload) {
            try {
                this.is_product_loading = true
                const responce = await axiosInstance.put('/product/update/' + payload.product_id, payload.form)
                if (responce.status == 200 || 201) {
                    this.success_message = await responce.data.message
                    this.product = await responce.data.product
                    this.is_product_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_product_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.product_network_error = true
                }
                return false
            }
        },
        async deleteProduct(payload) {
            try {
                this.is_product_loading = true
                const responce = await axiosInstance.delete('/product/delete/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.success_message = await responce.data.message
                    this.is_product_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_product_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.product_network_error = true
                }
                return false
            }
        },
        async getCatagory(payload) {
            try {
                this.is_catagory_loading = true
                const responce = await axiosInstance.get('/catagory/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.catagory = await responce.data.catagory
                    this.is_catagory_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_catagory_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.catagory_network_error = true
                }
                return false
            }
        },
        async getCatagorys() {
            try {
                this.is_catagorys_loading = true
                const responce = await axiosInstance.get('/catagory')
                if (responce.status == 200 || responce.status == 201) {
                    this.catagorys = await responce.data.catagorys
                    this.is_catagorys_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_catagorys_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.catagorys_network_error = true
                }
                return false
            }
        },
        async createCatagorys(payload) {
            try {
                this.is_catagory_loading = true
                const responce = await axiosInstance.post('/catagory/create', payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.catagory = await responce.data.new_catagory
                    this.success_message = await responce.data.message
                    this.is_catagory_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_catagory_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.catagory_network_error = true
                }
                return false
            }
        },
        async editCatagorys(payload) {
            try {
                this.is_catagory_loading = true
                const responce = await axiosInstance.put('/catagory/' + payload.catagory_id, payload.form)
                if (responce.status == 201 || responce.status == 200) {
                    this.catagory = await responce.data.updated_catagory
                    this.success_message = await responce.data.message
                    this.is_catagory_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_catagory_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.catagory_network_error = true
                }
                return false
            }
        },
        async deleteCatagory(payload) {
            try {
                this.is_catagory_loading = true
                const responce = await axiosInstance.delete('/catagory/' + payload)
                if (responce.status == 200 || responce.status == 201) {
                    this.success_message = responce.data.message
                    this.is_catagory_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_catagory_loading = false
                if (error.response) {
                    this.errors = error.response.data
                    if (error.response.data.message) {
                        this.error_message = error.response.data.message
                    }
                }
                if (error.code == 'ERR_NETWORK') {
                    this.catagory_network_error = true
                }
                return false
            }
        }
    }
})


if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(adminProductAndCatagoryStore,
        import.meta.hot))
}