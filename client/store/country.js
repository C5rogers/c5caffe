import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from "axios";

const REQUEST_ROOT_PATH = 'https://restcountries.com/v3.1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH })

export const countryStore = defineStore({
    id: 'CountryStore',
    state: () => ({
        loading: false,
        countrys: [],
        country: [],
        citys: [],
        city: [],
        errors: [],
        regine: ''
    }),
    actions: {
        async getCountrys() {
            try {
                this.loading = true
                const responce = await axiosInstance.get('independent?status=true')
                console.log(responce.data)
                this.countrys = responce.data
                this.loading = false
            } catch (error) {
                console.log(error)
                this.errors = error
            }
        },
        async getCountry(countryName) {
            try {
                this.loading = true
                const responce = await axiosInstance.get('name/' + countryName)
                console.log(responce.data)
                    //must update the regine here
                this.loading = false
            } catch (error) {
                console.log(error)
                this.errors = error
            }
        }
    }
})

if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(authStore,
        import.meta.hot))
}