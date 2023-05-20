import loaderHtml from '/src/services/loaderHtml.js'
import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/components/cardMercaderia.js'
import RenderDetalle from '/src/components/detalleMercaderia.js'
import carritoService from '/src/services/carritoService.js'

let pages = [];
pages.push({ html: '/pages/modalMercaderiaDetalle.html', into: 'modalContainer'});
pages.push({ html: '/pages/carritoDetalle.html', into: 'carrito-container'});
loaderHtml.Get(pages);

//Variables
let elementTipo= document.getElementById("select-categoria");
let elementOrden = document.getElementById("select-orden");
let elementNombre = document.getElementById("txtSearch");
let mercaderia;
let listaMercaderias = [];
let carritoStorage = await carritoService.GetCarrito();

//Consts
const getMercaderias = async () => {
    let tipo = elementTipo.options[elementTipo.selectedIndex].value;
    let orden = elementOrden.options[elementOrden.selectedIndex].value;
    let nombre = elementNombre.value;
    tipo = tipo == '0'? '': tipo;
    listaMercaderias = await apiMercaderias.Get(tipo, nombre, orden);
    await renderCards();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    renderDetalle(mercaderia);
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

//Functions
async function renderCards(){
    let cardsContainer = document.getElementById("cardContainer");
    cardsContainer.innerHTML = '';
    listaMercaderias.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCard(mercaderia);
    })    
    onImageItemClick(document.querySelectorAll(".card-img-top"));
    onButtonItemClick(document.querySelectorAll(".card-button"));
}

function renderDetalle(mercaderia){
    let detalleMercaderia = document.getElementById("modalMercaderiaBody");
    let mercaderiaTitle = document.getElementById("modalMercaderiaTitle");
    let mercaderiaButton = document.getElementsByName("buttonAdd");
    
    mercaderiaTitle.innerHTML = mercaderia.nombre;
    detalleMercaderia.innerHTML = RenderDetalle(mercaderia);
    mercaderiaButton[0].id = mercaderia.id
}

function onImageItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            getMercaderiaById(element.id);
        })
    });
}

function onButtonItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            agregarProducto(element.id);
        })
    });
}

function agregarProducto(id){
    const product = listaMercaderias.find((element) => id == element.id);
    carritoService.SaveProduct(product);
    showCarrito();
}

function checkCarrito(){    
    if (carritoStorage.length > 0){        
        setTimeout(() => {
            showCarrito();
        }, 500);        
    }
}

function showCarrito(){
    const carritoLista =  document.getElementById("carrito-lista");
    carritoLista.classList = 'col-12';

    const carritoConfirmacion =  document.getElementById("carrito-confirmacion");
    carritoConfirmacion.classList = 'col-12';
    
    const pedidoContainer = document.getElementById("carrito-container");
    pedidoContainer.style.display = "block";
    
    const mercaderiasContainer = document.getElementById("cardContainer");
    mercaderiasContainer.className = 'col-lg-9 col-12 row flex-center';

    const carritoTitulo = document.getElementById("tituloCarrito");
    carritoTitulo.textContent = "Detalle"
    carritoTitulo.classList = 'flex-center title div-confirmar';
}

//onload
getMercaderias();
checkCarrito();