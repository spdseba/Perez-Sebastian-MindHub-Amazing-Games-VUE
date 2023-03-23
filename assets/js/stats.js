const { createApp } = Vue
//URL de la API de donde se van a obtener los eventos
const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
console.log(createApp)
createApp({
  data() {
    return {

    }
  },
  created(){
    fetch(urlAPI)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)

    })
    .catch(err => console.log(err))
  },
  methods: {

    
  }
}).mount('#app')