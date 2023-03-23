let cards = document.getElementById('card-group');
let fragment = document.createDocumentFragment();

//URL de la API de donde se van a obtener los eventos
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
//Creo un arreglo vacio para guardar las categorias sin repetir
let categories = [];
//Guardo en una variable el elemento HTML que contiene los checkbox
let categoryContainer = document.querySelector(".category-check");
//Variable que almacena la cantidad de eventos encontrados
let eventsCount = 0;
let checkedInput = [];
let inputSearch = document.getElementById('search-input');

///////////////////////////////////////////////////

//Función asincrona que trae los eventos desde la API
async function getDataFromApi() {
  try {
    const response = await fetch(urlAPI);
    const data = await response.json();
    let events = data.events;
    pastEvents = events.filter(evt => evt.date < data.currentDate);
    renderCategories(events);
    renderCards(pastEvents);
    //Agrego Listeners a los input checkbox
    let categoryCheckboxes = document.querySelectorAll("input[type=checkbox]");
    categoryCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', () =>
    {
      //Convierto la NodeList en un array
      checkedInput = Array.from(categoryCheckboxes).filter(checkbox => checkbox.checked).map( ele => ele.value);
      renderCards(filterByAll(pastEvents, checkedInput));
    }
    ));
    //Agrego el listener al input search
    inputSearch.addEventListener("keyup", () => {
      renderCards(filterByAll(pastEvents, checkedInput));
    });

  }
  catch (error) {
      console.log(error);
  }
}

//Función que imprime las categorias que estan en la API
function renderCategories(events){
  //recorro el arreglo de eventos y guardo las categorias que no esten repetidas
  let arrayCategories = events.map( eventData => {
    if(!categories.includes(eventData.category)){
      categories.push(eventData.category)
    }
  });
  let categoryFragment = document.createDocumentFragment();
  for(let category of categories){
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="individual-check">
          <label for="category1" class="mx-2">${category}</label>
          <input type="checkbox" name="category" class="category-checkbox" value="${category}" id="${category}">
        </div>
    `;
    categoryFragment.appendChild(div);
  }
  categoryContainer.appendChild(categoryFragment);
}
//Funcion que renderiza las cards de acuerdos a los checkbox seleccionados
function renderCards(events, checkedInput){
  // spinner.removeAttribute('hidden');
  // spinner.setAttribute('hidden', '');
  eventsCount = 0;
  cards.innerHTML = "";
  for (let event of events){
    eventsCount++;
    let card = document.createElement('div');
    card.className = "d-flex justify-content-center col-md-6 col-lg-4 py-5";
    card.innerHTML = `
    <div class="card flex-column justify-content-between col-md-6 col-lg-4">
      <div class="card-image">
        <img class="card-img-top" src="${event.image}" alt="Food Fair Image">
      </div>
      <div class="card-body  overflow-hidden">
        <h5 class="card-title text-center">${event.name}</h5>
        <h6 class="card-subtitle mb-2 text-center p-3">${event.description}</h6>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center py-1">
        <span>Price:$ ${event.price}</span>
        <a href="./details.html?id=${event._id}" class="btn">See More</a>
      </div>
    </div>`;
    fragment.appendChild(card);
  }
  cards.appendChild(fragment);
    //Si no se encontraron eventos se imprime un mensaje en pantalla
  if(eventsCount == 0){
    let card = document.createElement('div');
    card.className = "d-flex justify-content-center align-items-center  h-100 w-100";
    card.innerHTML = `<div class="alert alert-primary" role="alert">
    Events not found
  </div>`;
    fragment.appendChild(card);
    cards.appendChild(fragment);
  }     
}
//Funcion que filtra los eventos de la API de acuerdo a los checkbox seleccionados
function filterByCheckbox(checkBoxesArray, events){
  if(checkBoxesArray != 0){
    return events.filter(evt => checkBoxesArray.includes(evt.category));
  }else{
    return events;
  }
}
//Funcion que filtra los eventos de la API de acuerdo al texto ingresado en el input search
function filterBySearch(searchValue, events){
  if(searchValue != ""){
    return events.filter(evt => evt.name.toLowerCase().includes(searchValue.toLowerCase().trim()));
  }else{
    return events;
  }
}
//Función que filtra los eventos por dos criterios(de acuerdo al los chechbox seleccionados y por lo escrito en en input search)
function filterByAll(events, checkboxArray){
  let checkboxFiltered = filterByCheckbox(checkboxArray, events);
  let eventsFiltered = filterBySearch(inputSearch.value, checkboxFiltered);
  return eventsFiltered;
}

//Llamo a la función encargada de traer los datos de la API y mostrarlos en pantalla
getDataFromApi()