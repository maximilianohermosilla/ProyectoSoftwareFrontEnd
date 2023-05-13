import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/views/cardMercaderia.js'
import RenderDetalle from '/src/views/detalleMercaderia.js'

let modalHtml = '/pages/modalMercaderiaDetalle.html';
let listaMercaderias = [];
let mercaderia;

loadHTML(modalHtml);

const getMercaderias = async () => {
    listaMercaderias = await apiMercaderias.Get();
    renderCards();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    console.log(mercaderia);
    renderDetalle(mercaderia);
}

getMercaderias();

function renderCards(){
    let cardsContainer = document.getElementById("cardContainer");
    listaMercaderias.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCard(mercaderia);
    })    
    onListItemClick(document.querySelectorAll(".card-img-top"));
}

function renderDetalle(mercaderia){
    let detalleMercaderia = document.getElementById("modalMercaderiaBody");
    let mercaderiaTitle = document.getElementById("modalMercaderiaTitle");
    modalMercaderiaTitle.innerHTML = mercaderia.nombre;
    detalleMercaderia.innerHTML = RenderDetalle(mercaderia);
}

const searchButton = document.getElementById("btnSearch");
searchButton.addEventListener('click', () =>{
    getMercaderias();      
})

const onClickElement = (id) => {
    getMercaderiaById(id);
}

function onListItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            onClickElement(element.id);
        })
    });
}

function loadHTML(html){
    fetch(html)
    .then(response=> response.text())
    .then(text=> document.getElementById('cardContainer').innerHTML = text);
}


