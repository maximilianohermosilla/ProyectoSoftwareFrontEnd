import loaderHtml from '/src/services/loaderHtml.js'
import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/components/cardMercaderia.js'
import RenderDetalle from '/src/components/detalleMercaderia.js'
import RenderCarrito from '/src/components/carritoMercaderia.js'
import renderCounter from '/src/services/renderCounter.js'

let pages = [];
pages.push({ html: '/pages/modalMercaderiaDetalle.html', into: 'modalContainer'});
pages.push({ html: '/pages/carritoDetalle.html', into: 'carrito-container'});
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


//const total = carrito.reduce((acc, el) => acc + el.precio * cantidad, 0);

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
    modalMercaderiaTitle.innerHTML = mercaderia.nombre;
    detalleMercaderia.innerHTML = RenderDetalle(mercaderia);
}

async function renderCarrito(){
    let cardsContainer = document.getElementById("carritoContainer");
    cardsContainer.innerHTML = '';
    carritoStorage.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCarrito(mercaderia);
    })    
    onButtonItemClick(document.querySelectorAll(".span-cantidad"));
}

function onImageItemClick(elements){
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
    showCarrito();
    renderCarrito()
    saveLocalStorage(carritoStorage);
}

function eliminarProducto(){
    const productoId = carrito.find((element) => element.MercaderiaId);

    carrito = carrito.filter((carrito) => {
        return carritoId !== productoId;
    });

    saveLocalStorage(carritoStorage)
}

function saveLocalStorage(carritoStorage){
    
    localStorage.setItem("mercaderias", JSON.stringify(carritoStorage));    
    renderCounter.Show();
}

function checkCarrito(){    
    if (carritoStorage.length > 0){
        console.log("hay carrito")
        setTimeout(() => {
            showCarrito();
        }, 500);        
    }
}

function showCarrito(){
    const carritoLista =  document.getElementById("carrito-lista");
    const carritoConfirmacion =  document.getElementById("carrito-confirmacion");
    const carritoTitulo = document.getElementById("tituloCarrito");
    const pedidoContainer = document.getElementById("carrito-container");
    const mercaderiasContainer = document.getElementById("cardContainer");
    pedidoContainer.style.display = "block";
    mercaderiasContainer.className = 'col-lg-9 col-12 row flex-center';
    carritoLista.classList = 'col-12';
    carritoConfirmacion.classList = 'col-12';
    carritoTitulo.classList = 'flex-center title div-confirmar';
    carritoTitulo.textContent = "Pedido"
}


//onload
getMercaderias();
checkCarrito();