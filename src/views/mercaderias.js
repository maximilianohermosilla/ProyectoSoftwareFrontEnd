import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/components/cardMercaderia.js'
import RenderDetalle from '/src/components/detalleMercaderia.js'
import loaderHtml from '/src/services/loaderHtml.js'

let pages = [];

let modalHtml = '/pages/modalMercaderiaDetalle.html';
pages.push({ html: modalHtml, into: 'modalContainer'});

const loadHtml = async (pages) => {
    await loaderHtml.Get(pages);
}

loadHtml(pages);
//Variables
let elementTipo= document.getElementById("select-categoria");
let elementOrden = document.getElementById("select-orden");
let elementNombre = document.getElementById("txtSearch");
let mercaderia;
let listaMercaderias = [];


sessionStorage.setItem("id", btoa("1"));
var idUsuario = atob(sessionStorage.getItem("id"));

console.log(idUsuario);

//Consts
const getMercaderias = async () => {      
    let tipo = elementTipo.options[elementTipo.selectedIndex].value;
    let orden = elementOrden.options[elementOrden.selectedIndex].value;
    let nombre = elementNombre.value;
    tipo = tipo == '0'? '': tipo;
    listaMercaderias = await apiMercaderias.Get(tipo, nombre, orden);
    localStorage.setItem("mercaderias", btoa(JSON.stringify(listaMercaderias)));
    var listaSession = atob(localStorage.getItem("mercaderias"));
    console.log(JSON.parse(listaSession))
    await renderCards();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    renderDetalle(mercaderia);
}

const onClickElement = (id) => {
    getMercaderiaById(id);
}

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

//Actions DOM
const searchButton = document.getElementById("btnSearch");
searchButton.addEventListener('click', () =>{
    console.log("click")
    getMercaderias();      
})

const selectOrden = document.getElementById("select-orden")
selectOrden.addEventListener('change', () =>{
    getMercaderias();
})

const selectCategoria = document.getElementById("select-categoria");
selectCategoria.addEventListener('change', () =>{
    getMercaderias();
})

const inputSearch = document.getElementById("txtSearch");
inputSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getMercaderias();
    }
})

const eliminarProducto = () => {
    const productoId = carrito.find((element) => element.MercaderiaId);

    carrito = carrito.filter((carrito) => {
        return carritoId !== productoId;
    });

    carritoCounter();
    saveLocalStorage();
    renderCarrito();
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;


}

//onload
getMercaderias();