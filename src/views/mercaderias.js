import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/components/cardMercaderia.js'
import RenderDetalle from '/src/components/detalleMercaderia.js'
import loaderHtml from '/src/services/loaderHtml.js'
import renderCounter from '/src/services/renderCounter.js'

let pages = [];
pages.push({ html: '/pages/modalMercaderiaDetalle.html', into: 'modalContainer'});
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
let carritoStorage = localStorage.getItem("mercaderias")? JSON.parse(localStorage.getItem("mercaderias")): [];

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

const onClickElement = (id) => {
    getMercaderiaById(id);
}

const onClickButton = (id) => {
    const product = listaMercaderias.find((element) => id == element.id);
    agregarProducto(product);
}

//Functions
async function renderCards(){
    let cardsContainer = document.getElementById("cardContainer");
    cardsContainer.innerHTML = '';
    listaMercaderias.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCard(mercaderia);
    })    
    onListItemClick(document.querySelectorAll(".card-img-top"));
    onButtonItemClick(document.querySelectorAll(".card-button"));
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

function onButtonItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            onClickButton(element.id);
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
    //cantidadCarrito.style.display = "block";    
    console.log(carritoStorage.length);    
    const carritoLength = carritoStorage.length;
}

//const total = carrito.reduce((acc, el) => acc + el.precio * cantidad, 0);

function agregarProducto(product){
    const repeat = carritoStorage.some((repeatProduct) => repeatProduct.id === product.id);
    console.log(product);
    if(repeat){
        carritoStorage.map((prod) => {
            if (prod.id == product.id){
                prod.cantidad++;
            }            
        });
    } else{
        carritoStorage.push({
            id: product.id,
            imagen: product.imagen,
            nombre: product.nombre,
            descripcion: product.tipo.descripcion,
            precio: product.precio,
            cantidad: 1
        });
    }
    localStorage.setItem("mercaderias", JSON.stringify(carritoStorage));
    carritoCounter();
    renderCounter.Show();
}



//onload
getMercaderias();