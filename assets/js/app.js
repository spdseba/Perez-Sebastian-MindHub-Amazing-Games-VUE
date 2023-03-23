const { createApp } = Vue
//URL de la API de donde se van a obtener los eventos
const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
console.log(createApp)
createApp({
  data() {
    return {
      events: undefined,
      categories: undefined,
      filteredEvents: undefined,
      searchValue: '',
      categoryChecked: []
    }
  },
  created(){
    fetch(urlAPI)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        const fn = evt => evt.category
        this.events = data.events.filter( fn)
        this.categories = [ ... new Set(this.events.map(fn))]
        this.filteredEvents = this.events
    })
    .catch(err => console.log(err))
  },
  methods: {
    filterByAll(){
        this.filteredEvents = this.events.filter( evt => {
            return (this.categoryChecked.includes(evt.category) || this.categoryChecked.length === 0) && evt.name.toLowerCase().includes(this.searchValue.toLowerCase())
        })
    }
  }
}).mount('#app')