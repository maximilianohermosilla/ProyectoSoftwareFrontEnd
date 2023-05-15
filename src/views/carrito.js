import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCarrito from '/src/components/carritoMercaderia.js'
import loaderHtml from '/src/services/loaderHtml.js'

let pages = [];

let modalHtml = '/pages/modalMercaderiaDetalle.html';
//pages.push({ html: modalHtml, into: 'modalContainer'});
const loadHtml = async (pages) => {
    await loaderHtml.Get(pages);}

loadHtml(pages);

//Variables
let mercaderia;
let listaMercaderias = [];
let carritoStorage = localStorage.getItem("mercaderias")? JSON.parse(localStorage.getItem("mercaderias")): [];

console.log(carritoStorage)

//Consts
const getMercaderias = async () => {      
    let tipo = '';
    let orden = 'ASC';
    let nombre = '';
    tipo = tipo == '0'? '': tipo;
    listaMercaderias = await apiMercaderias.Get(tipo, nombre, orden);
    // localStorage.setItem("mercaderias", btoa(JSON.stringify(listaMercaderias)));
    // var listaSession = atob(localStorage.getItem("mercaderias"));
    // console.log(JSON.parse(listaSession))    
    await renderCarrito();
    groupProducts();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    renderDetalle(mercaderia);
}

const onClickElement = (id) => {
    getMercaderiaById(id);
}

//Functions
async function renderCarrito(){
    let cardsContainer = document.getElementById("carritoContainer");
    cardsContainer.innerHTML = '';
    carritoStorage.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCarrito(mercaderia);
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

function groupProducts(){
    const resultado = listaMercaderias.reduce((group, product) => {
        const {tipo} = product;
        group[tipo.id] = group[tipo.id] ?? [];
        group[tipo.id].push(product);
        return group;
        }, {});
    console.log(resultado);
}

// //Actions DOM
// const searchButton = document.getElementById("btnSearch");
// searchButton.addEventListener('click', () =>{
//     console.log("click")
//     getMercaderias();      
// })

// const selectOrden = document.getElementById("select-orden")
// selectOrden.addEventListener('change', () =>{
//     getMercaderias();
// })

// const selectCategoria = document.getElementById("select-categoria");
// selectCategoria.addEventListener('change', () =>{
//     getMercaderias();
// })

// const inputSearch = document.getElementById("txtSearch");
// inputSearch.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       getMercaderias();
//     }
// })

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