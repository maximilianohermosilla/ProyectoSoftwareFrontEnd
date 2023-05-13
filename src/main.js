import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/views/card.js'

let listaMercaderias = [];
let mercaderia;


const getMercaderias = async () => {
    listaMercaderias = await apiMercaderias.Get();
    renderCards();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    console.log(mercaderia);
}

getMercaderias();

function renderCards(){
    let cardsContainer = document.getElementById("cardContainer");
    listaMercaderias.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCard(mercaderia);
    })    
    onListItemClick(document.querySelectorAll(".card-img-top"));
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


