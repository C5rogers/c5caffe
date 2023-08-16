// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },  
  dev:true,
  postcss:{
    plugins:{
      tailwindcss:{},
      autoprefixer: {},
    }
  },
  app:{
    head:{
      title:'C5 Online Caffe',
      link:[
        {
          rel:'stylesheet',
          href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
          crossorigin:'anonymous'
        }
      ]
    }
  },
  // plugins:['~/plugins/pinia.js'],
})
