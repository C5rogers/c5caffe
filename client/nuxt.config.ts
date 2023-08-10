// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  css:['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app:{
    head:{
      title:'C5 Caffe',
      meta:[
        {
          name:"description",
          content:"This is the C5 Online caffe used to shop online based on real life scenario"
        }
      ],
      link:[
        {
          rel:"stylesheet",
          href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        }
      ]
    }
  }
})
