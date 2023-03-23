const { createApp } = Vue
//URL de la API de donde se van a obtener los eventos
const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
console.log(createApp)
createApp({
  data() {
    return {
      events: [],
      categories: [],
      filteredEvents: [],
      searchValue: '',
      categoryChecked: []
    }
  },
  created(){
    fetch(urlAPI)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        
        if(document.title.includes("Upcoming")){
          console.log("Upcoming")

          this.events = data.events.filter(evt => evt.date >= data.currentDate);
          console.log(this.events)
          this.filteredEvents = this.events
        }else if(document.title.includes("Past")){
          console.log("Past")

          this.events = data.events.filter(evt => evt.date < data.currentDate);
          console.log(this.events)
          this.filteredEvents = this.events
        }else{
          this.events = data.events.filter(evt => evt.category)

          this.filteredEvents = this.events
        }
        this.categories = [ ... new Set(this.filteredEvents.map(evt => evt.category))]
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