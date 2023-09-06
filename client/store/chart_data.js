import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";

const REQUEST_ROOT_PATH = 'http://localhost:4000/api/v1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH, withCredentials: true })

export const chart_dataStore = defineStore({
    id: 'chart_dataStore',
    state: () => ({
        product_uploading_rate: [],
        users_signedup_perweek: [],
        orders_per_week: [],
        cart_usage: [],
        product_rating_rate: [], //have datasets and sub data
        product_catagory_rating_rate: [], //also have datasets and sub data
        selled_order_report: [],
        is_chart_data_loading: false,
        chart_data_network_error: false,
        error: []
    }),
    actions: {
        async getChartData() {
            try {
                this.is_chart_data_loading = true
                const responce = await axiosInstance.get('/chart/data')
                if (responce.status == 200 || responce.status == 201) {
                    this.product_uploading_rate = await responce.data.product_uploading_rate
                    this.users_signedup_perweek = await responce.data.users_signedup_perweek
                    this.orders_per_week = await responce.data.orders_per_week
                    this.cart_usage = await responce.data.cart_usage
                    this.product_rating_rate = await responce.data.product_rating_rate
                    this.product_catagory_rating_rate = await responce.data.product_catagory_rating_rate
                    this.selled_order_report = await responce.data.selled_order_report
                    this.is_chart_data_loading = false
                    return true
                }
            } catch (error) {
                console.log(error)
                this.is_chart_data_loading = false
                if (error.response) {
                    this.error.response.data
                }
                if (error.code == 'ERR_NETWORK') {
                    this.chart_data_network_error = true
                }
                return false
            }
        },
        resetChartNetworkError() {
            this.chart_data_network_error = false
        },
        resetChartError() {
            this.error = []
        }
    }

})

if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(chart_dataStore,
        import.meta.hot))
}