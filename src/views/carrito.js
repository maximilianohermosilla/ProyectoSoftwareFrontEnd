import RenderCarrito from '/src/components/carritoMercaderia.js'
import renderCounter from '/src/services/renderCounter.js'
import loaderHtml from '/src/services/loaderHtml.js'

let pages = [];

let modalHtml = '/pages/modalMercaderiaDetalle.html';
pages.push({ html: '/pages/carritoDetalle.html', into: 'carrito-container'});
//pages.push({ html: modalHtml, into: 'modalContainer'});
const loadHtml = async (pages) => {
    loaderHtml.Get(pages);}

loadHtml(pages);

//Variables
let listaMercaderias = [];
let carritoStorage = localStorage.getItem("mercaderias")? JSON.parse(localStorage.getItem("mercaderias")): [];

console.log(carritoStorage)

//Consts
const onClickAdd = (id) => {
    agregarProducto(id);
}
const onClickRemove = (id) => {
    quitarProducto(id);
}
const onClickDeleteElement = (id) => {
    eliminarProducto(id);
}

//Functions
function renderCarrito(){
    let cardsContainer = document.getElementById("carritoContainer");
    cardsContainer.innerHTML = '';
    carritoStorage.forEach(mercaderia =>{ 
        cardsContainer.innerHTML += RenderCarrito(mercaderia);
    })
    onButtonAddClick(document.querySelectorAll(".btnAgregarCantidad"));
    onButtonRemoveClick(document.querySelectorAll(".btnQuitarCantidad"));
    onButtonDeleteElementClick(document.querySelectorAll(".delete-icon"));
}

function onButtonAddClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            onClickAdd(element.id);
        })
    });
}

function onButtonRemoveClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            onClickRemove(element.id);
        })
    });
}

function onButtonDeleteElementClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            onClickDeleteElement(element.id);
        })
    });
}

function agregarProducto(id){ 
    const product = carritoStorage.find((element) => id == element.id);
    const repeat = carritoStorage.some((repeatProduct) => repeatProduct.id === product.id);
    //console.log(product);
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
    
    renderCarrito();
    saveLocalStorage(carritoStorage);
}

function quitarProducto(id){
    carritoStorage.map((prod) => {
        if(prod.cantidad == 1 && prod.id == id){
            console.log(prod);
            eliminarProducto(id);
        }
        if (prod.id == id && prod.cantidad > 1){
            console.log(prod);
            prod.cantidad--;
        }            
    });
    saveLocalStorage(carritoStorage);
    renderCarrito();
}

const eliminarProducto = (id) => {
    const productoId = carritoStorage.find((element) => element.id == id);

    carritoStorage = carritoStorage.filter((carrito) => {
        return carrito !== productoId;
    });

    //carritoCounter();
    saveLocalStorage(carritoStorage);
    if (!carritoStorage.length > 0){ 
        window.location.reload();
    }
    renderCarrito();
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
}

function saveLocalStorage(carritoStorage){
    
    localStorage.setItem("mercaderias", JSON.stringify(carritoStorage));    
    renderCounter.Show();
}

function checkCarrito(){    
    if (!carritoStorage.length > 0){
        var carritoContainer = document.getElementById("carrito-container");
        var titleEmpty = document.getElementById("title-empty");
        carritoContainer.style.display = "none";    
        if(titleEmpty){
            titleEmpty.textContent = "El carrito está vacío";
            titleEmpty.className = "title divTituloCarrito";
        }
    }
}

function domSettings(){
    const pedidoContainer = document.getElementById("carrito-container");
    const btnConfirmar = document.getElementById("btnConfirmarPedido");
    const btnCancelar = document.getElementById("btnCancelarPedido");
    pedidoContainer.style.display = "block";    

    btnConfirmar.addEventListener('click', () =>{
        var checked = document.querySelector('input[name="check-entrega"]:checked').id;
        console.log(checked);
    })    
    
    btnCancelar.addEventListener('click', () =>{
        localStorage.removeItem("mercaderias");
        
        window.location.reload();
    })
}

setTimeout(() => {    
    renderCarrito();
    domSettings();
    checkCarrito();    
}, 500);




function groupProducts(){
    const resultado = listaMercaderias.reduce((group, product) => {
        const {tipo} = product;
        group[tipo.id] = group[tipo.id] ?? [];
        group[tipo.id].push(product);
        return group;
        }, {});
    //console.log(resultado);
}