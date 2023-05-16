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
    await renderCarrito();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    renderDetalle(mercaderia);
}

const onClickElement = (id) => {
    //getMercaderiaById(id);
    var tooltip = document.getElementById("cantidad-tooltip");
    tooltip.style.display = "flex";
}

//Functions
async function renderCarrito(){
    let cardsContainer = document.getElementById("carritoContainer");
    cardsContainer.innerHTML = '';
    carritoStorage.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCarrito(mercaderia);
    })    
    onButtonItemClick(document.querySelectorAll(".span-cantidad"));
}

function renderDetalle(mercaderia){
    let detalleMercaderia = document.getElementById("modalMercaderiaBody");
    let mercaderiaTitle = document.getElementById("modalMercaderiaTitle");
    modalMercaderiaTitle.innerHTML = mercaderia.nombre;
    detalleMercaderia.innerHTML = RenderDetalle(mercaderia);
}

function onButtonItemClick(elements){
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
    //console.log(resultado);
}

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

const btnConfirmar = document.getElementById("btnConfirmarPedido");
btnConfirmar.addEventListener('click', () =>{
    var checked = document.querySelector('input[name="check-entrega"]:checked').id;
    console.log(checked);
})



//onload
getMercaderias();