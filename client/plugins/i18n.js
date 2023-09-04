import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import am from '../locales/am.json'

export default defineNuxtPlugin(nuxtApp => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en',
        messages: {
            en,
            am
        }
    })
    nuxtApp.vueApp.use(i18n)
})