import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/views/cardMercaderia.js'
import RenderDetalle from '/src/views/detalleMercaderia.js'

//Variables
let listaMercaderias = [];
let mercaderia;

//Consts
const getMercaderias = async () => {  
    let tipo= '';
    let nombreElement = document.getElementById("txtSearch");
    let nombre = nombreElement.value;
    let orden = 'ASC';
    listaMercaderias = await apiMercaderias.Get(tipo, nombre, orden);
    await renderCards();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    renderDetalle(mercaderia);
}

const onClickElement = (id) => {
    getMercaderiaById(id);
}

const searchButton = document.getElementById("btnSearch");
searchButton.addEventListener('click', () =>{
    console.log("click")
    getMercaderias();      
})

//Load const
setTimeout(() => {
    getMercaderias();
    
}, 0);


//Functions
async function renderCards(){
    let cardsContainer = document.getElementById("cardContainer");
    cardsContainer.innerHTML = '';
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

function onListItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            onClickElement(element.id);
        })
    });
}