import RenderCarrito from '/src/components/carritoMercaderia.js'
import loaderHtml from '/src/services/loaderHtml.js'

let pages = [];

let modalHtml = '/pages/modalMercaderiaDetalle.html';
pages.push({ html: '/pages/carritoDetalle.html', into: 'carrito-container'});
//pages.push({ html: modalHtml, into: 'modalContainer'});
const loadHtml = async (pages) => {
    await loaderHtml.Get(pages);}

loadHtml(pages);

//Variables
let listaMercaderias = [];
let carritoStorage = localStorage.getItem("mercaderias")? JSON.parse(localStorage.getItem("mercaderias")): [];

console.log(carritoStorage)

//Consts
const onClickElement = (id) => {
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

function domSettings(){
    const pedidoContainer = document.getElementById("carrito-container");
    const btnConfirmar = document.getElementById("btnConfirmarPedido");
    const btnCancelar = document.getElementById("btnCancelarPedido");
    pedidoContainer.style.display = "block";

    renderCarrito();

    btnConfirmar.addEventListener('click', () =>{
        var checked = document.querySelector('input[name="check-entrega"]:checked').id;
        console.log(checked);
    })    
    
    btnCancelar.addEventListener('click', () =>{
        localStorage.removeItem("mercaderias");
        
        window.location.reload();
    })    
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

function checkCarrito(){    
    if (!carritoStorage.length > 0){
        var carritoContainer = document.getElementById("carrito-container");
        var titleEmpty = document.getElementById("title-empty");
        carritoContainer.style.display = "none";    
        titleEmpty.textContent = "El carrito está vacío";
        titleEmpty.className = "title divTituloCarrito";
    }
}


setTimeout(() => {
    domSettings();
    checkCarrito();
}, 1000);



//onload
//getMercaderias();
