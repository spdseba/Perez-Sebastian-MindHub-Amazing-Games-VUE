
/*
let table = document.getElementById("table");
//URL de la API de donde se van a obtener los eventos
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
let fragment = document.createDocumentFragment();
//Funcion asincrona que obtiene los eventos de la API y los muestra en pantalla
async function getDataFromApi(urlAPI) {
  try {
      const response = await fetch(urlAPI)
      const data = await response.json();
      evtMaxAtt_evtMinAtt_evtMaxCap(data);
      upcomingEvt_by_category(data);
      pastEvt_by_category(data);

  }
  catch(error){
      console.error('Error: '+error);
  }    
}
//Función que muestra en pantalla la primer tabla 
function renderTableEvtStatistics(evtMaxAtt, evtMinAtt, evtMaxCapacity){
  let card = document.createElement('div');
  card.className = "";
  card.innerHTML = `
  <h2 class="table-title py-1">Events Statistics</h2>
  <table class="table">
    <thead class="">
        <tr>
            <th scope="col">Event with the highest percentage of attendance</th>
            <th scope="col">Event with the lowest percentage of attendance</th>
            <th scope="col">Event with larger capacity</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>${evtMaxAtt.name} (${evtMaxAtt.maxAtt.toFixed(2)}%)</td>
        <td>${evtMinAtt.name} (${evtMinAtt.minAtt.toFixed(2)}%)</td>
        <td>${evtMaxCapacity.name} (${evtMaxCapacity.maxCapacity})</td>
      </tr>
    </tbody>
  </table>`;
  fragment.appendChild(card);
  table.appendChild(fragment);
}
//Función que obtiene el evento con mayoy y menor Attendance y con maxima capacidad 
//Y luego llama a la función que muestra la tabla en pantalla
function evtMaxAtt_evtMinAtt_evtMaxCap(data){
  let maxAtt = 0;
  let attendance = 0;
  let minAtt = 100;
  let maxCapacity = 0;
  let evtMaxAtt = {};
  let evtMinAtt = {};
  let evtMaxCapacity = {};
    for(let evt of data.events){
      if(evt.assistance){
        attendance = (parseInt(evt.assistance) * 100) / parseInt(evt.capacity);
        if(attendance >= maxAtt){
          maxAtt = attendance;
          evtMaxAtt = evt;
          evtMaxAtt["maxAtt"] = attendance;
        }
        if(attendance <= minAtt){
          minAtt = attendance
          evtMinAtt = evt;
          evtMinAtt["minAtt"] = attendance
        }
      }
      if(evt.capacity > maxCapacity){
        maxCapacity = evt.capacity;
        evtMaxCapacity = evt;
        evtMaxCapacity["maxCapacity"] = maxCapacity;
      }
    }
    renderTableEvtStatistics(evtMaxAtt, evtMinAtt, evtMaxCapacity);
}
//Función que muestra en pantalla la Tabla de eventos por venir ordenados por categoría
function renderTableUpEvtByCategory(categories){
  let card = document.createElement('div');
  card.className = "";
  let template2 = "";
  let keysCat = Object.keys(categories);
  for(let i = 0; i < keysCat.length ; i++){
    if(categories[keysCat[i]].revenue > 0){
      template2 +=
      `<tr>
        <td>${keysCat[i]}</td>
        <td>$ ${categories[keysCat[i]].revenue}</td>
        <td>${((categories[keysCat[i]].attendance * 100) / categories[keysCat[i]].count).toFixed(2)} %</td>
      </tr>`
    }
  }
  let template = `
  <h2 class="table-title py-1">Upcoming events statistics by category</h2>
  <table class="table">
    <thead class="">
        <tr>
        <th scope="col">Categories</th>
        <th scope="col">Revenues</th>
        <th scope="col">Percentage of attendance</th>
        </tr>
    </thead>
    <tbody>
      ${template2}
    </tbody>
  </table>`
  card.innerHTML = template;
  fragment.appendChild(card);
  table.appendChild(fragment);
}
//Función que obtiene las categorias de los eventos de la API y les agrega un objeto con las keys para guardar los valores
function generateCategoryObject(data){
  let categories = {}
  for(let evt of data.events){
    if(!categories.hasOwnProperty(evt.category)){
      categories[evt.category] = {
        "revenue" : 0,
        "estimate" : 0,
        "capacity" : 0,
        "assistance" : 0,
        "attendance" : 0,
        "count": 0
       }
    }
  }
  return categories;
}
//Función que obtiene los eventos por venir con sus datos para luego llamar a la función que los muestra en una tabla
function upcomingEvt_by_category(data){
  upcomingEvents = data.events.filter(evt => evt.date >= data.currentDate);
  let categoriesData = generateCategoryObject(data);
  currentDate = data.currentDate;
  //let currentDate = new Date(data.currentDate);
  
  for(let evt of upcomingEvents){
    if(evt.date > currentDate){
      categoriesData[evt.category].revenue += evt.estimate * evt.price
      categoriesData[evt.category].estimate += evt.estimate
      categoriesData[evt.category].capacity += evt.capacity
      categoriesData[evt.category].attendance += (evt.estimate / evt.capacity);
      categoriesData[evt.category].count += 1;
    }

  }
  console.log(categoriesData)
  renderTableUpEvtByCategory(categoriesData);

}
//Función que genera una tabla en pantalla con los eventos pasados ordenados por categorias 
function renderTablePastEvtByCategory(categories){
  let card = document.createElement('div');
  card.className = "";
  let template2 = "";
  let keysCat = Object.keys(categories);
  for(let i = 0; i < keysCat.length ; i++){
    if(categories[keysCat[i]].revenue > 0){
      template2 +=
      `<tr>
        <td>${keysCat[i]}</td>
        <td>$ ${categories[keysCat[i]].revenue}</td>
        <td>${((categories[keysCat[i]].attendance * 100) / categories[keysCat[i]].count).toFixed(2)} %</td>
      </tr>`
    }
  }
  let template = `
  <h2 class="table-title py-1">Past events statistics by category</h2>
  <table class="table">
    <thead class="">
        <tr>
        <th scope="col">Categories</th>
        <th scope="col">Revenues</th>
        <th scope="col">Percentage of attendance</th>
        </tr>
    </thead>
    <tbody>
      ${template2}
    </tbody>
  </table>`
  card.innerHTML = template;
  fragment.appendChild(card);
  table.appendChild(fragment);
}
//Función que obtiene los eventos pasados con sus datos para luego llamar a la función que los muestra en una tabla
function pastEvt_by_category(data){
  let categoriesData = generateCategoryObject(data);
    currentDate = data.currentDate;
    //let currentDate = new Date(data.currentDate);
    for(let evt of data.events){
      if(evt.date < currentDate){
        categoriesData[evt.category].revenue += parseInt(evt.assistance) * parseInt(evt.price);
        categoriesData[evt.category].assistance += parseInt(evt.assistance);
        categoriesData[evt.category].capacity += parseInt(evt.capacity);
        categoriesData[evt.category].attendance += (evt.assistance / evt.capacity);
        categoriesData[evt.category].count += 1;
    }
  }
  renderTablePastEvtByCategory(categoriesData);
}



//Funcion que obtiene los eventos de la API y los muestra en tablas en pantalla
getDataFromApi(urlAPI);
*/

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