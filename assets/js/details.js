
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"
//Busco en el Json de eventos el que posea el id obtenido anteriomente

async function findData(){
    try{
        const response = await fetch(urlAPI);
        const data = await response.json();
        let events = data.events;
        //Guardo en una constante el valor de la URI
        const queryString = location.search;
        //Creo un objeto URLSearchParams con la URL obtenida y obtengo el id
        const params = new URLSearchParams(queryString);
        const id = params.get("id");
        const evt = events.find( evt => evt._id  == id);
        renderCard(evt);
    }catch(error){

    }

}
function renderCard(evt){
    console.log("render");
    //Obtengo el elemento html y le agrego dinamicamente los valores obtenidos
    const div = document.querySelector(".individual-card");
    div.innerHTML = `
    <div class="card-image-left">
        <img class="card-img-top" src="${evt.image}" alt="${evt.name}">
    </div>
    <div class="card-body-right">
        <div class="card-title d-flex justify-content-center align-items-center"><h5 class="pb-3 ">${evt.name}</h5></div>
        <div class="card-description d-flex justify-content-center align-items-center"><h6 class="p-2">${evt.description}</h6></div>
        <div class="card-place d-flex justify-content-center align-items-center"><h6 class="py-1"><span>Place:</span> ${evt.place}</h6></div>
        <div class="card-category d-flex justify-content-center align-items-center"><h6 class="py-1"><span>Category:</span> ${evt.category}</h6></div>
        <div class="card-capacity d-flex justify-content-center align-items-center"><h6 class="py-1"><span>Capacity:</span> ${evt.capacity}</h6></div>
        <div class="card-estimate d-flex justify-content-center align-items-center"><h6 class="py-1">${evt.estimate ? '<span>Estimate: '  + evt.estimate + ' </span>' :  '<span>Assistance: '  + evt.assistance + ' </span>'}</h6></div>
        <div class="card-date d-flex justify-content-center align-items-center"><h6 class="py-1"><span>Date:</span> ${evt.date}</h6></div>
        <div class="card-price d-flex justify-content-center align-items-center bg-success"><h6 class="py-1"><span>Price: </span> $${evt.price}</h6></div>
    </div>
    `;
}


findData();
