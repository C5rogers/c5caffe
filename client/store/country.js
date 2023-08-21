import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from "axios";

const REQUEST_ROOT_PATH = 'https://restcountries.com/v3.1'
const axiosInstance = axios.create({ baseURL: REQUEST_ROOT_PATH })

export const countryStore = defineStore({
    id: 'CountryStore',
    state: () => ({
        mainLoading: false,
        loading: false,
        countrys: [],
        citys: [],
        errors: [],
        regine: '',
        selectedCountry: [],
        selectedCity: ''
    }),
    actions: {
        async getCountrys() {
            try {
                this.mainLoading = true
                const responce = await axiosInstance.get('independent?status=true')
                this.countrys = await responce.data
                this.mainLoading = false
            } catch (error) {
                console.log(error)
                this.errors = error
            }
        },
        async getCountry(countryName) {
            try {
                this.loading = true
                const responce = await axiosInstance.get('name/' + countryName)
                this.selectedCountry = await responce.data
                this.loading = false
            } catch (error) {
                console.log(error)
                this.errors = error
            }
        },
    },
    getters: {
        getSelectedCountry: (state) => {
            return state.selectedCountry
        },
        getFetchedCountrys: (state) => {
            return state.countrys
        }
    }
})

if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(countryStore,
        import.meta.hot))
}