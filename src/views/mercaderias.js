import loaderHtml from '/src/services/loaderHtml.js'
import apiMercaderias from '/src/services/apiMercaderias.js'
import RenderCard from '/src/components/cardMercaderia.js'
import RenderDetalle from '/src/components/detalleMercaderia.js'
import carritoService from '/src/services/carritoService.js'
import spinnerService from '/src/services/spinnerService.js'

let pages = [];
pages.push({ html: '/pages/components/modalMercaderiaDetalle.html', into: 'modalContainer'});
pages.push({ html: '/pages/components/carritoDetalle.html', into: 'carrito-container'});
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
    spinnerService.Show();
    let tipo = elementTipo.options[elementTipo.selectedIndex].value;
    let orden = elementOrden.options[elementOrden.selectedIndex].value;
    let nombre = elementNombre.value;
    tipo = tipo == '0'? '': tipo;
    listaMercaderias = await apiMercaderias.Get(tipo, nombre, orden);
    spinnerService.Hide();
    await renderCards();
}

const getMercaderiaById = async (id) => {  
    mercaderia = await apiMercaderias.GetById(id);
    renderDetalle(mercaderia);
}

//Actions DOM
const searchButton = document.getElementById("btnSearch");
searchButton.addEventListener('click', () =>{
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

    if(!listaMercaderias.length > 0){
        cardsContainer.innerHTML =
        `<h3 class="title bi bi-x-circle" id="title-empty"> No se encontraron resultados para la búsqueda</h3>`
    }

    listaMercaderias.forEach(mercaderia =>{ 
        if (mercaderia.imagen != undefined){
            mercaderia.imagen = validateUrlImagen(mercaderia.imagen);
        }
        
        cardsContainer.innerHTML += RenderCard(mercaderia);
    })

    onImageItemClick(document.querySelectorAll(".card-img-top"));
    onButtonItemClick(document.querySelectorAll(".card-button"));
}

function renderDetalle(mercaderia){
    let detalleMercaderia = document.getElementById("modalMercaderiaBody");
    let mercaderiaTitle = document.getElementById("modalMercaderiaTitle");
    mercaderiaTitle.innerHTML = mercaderia.nombre;
    detalleMercaderia.innerHTML = RenderDetalle(mercaderia);
}

function onImageItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{            
            getMercaderiaById(element.id);
        });

        element.addEventListener('error', () =>{
            element.src = '../images/notfound.png';
        });
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
    let elementCantidad = document.getElementById("select-cantidad_"+id); 
    let cantidad = parseInt(elementCantidad.options[elementCantidad.selectedIndex].value);
    
    carritoService.SaveProduct(product, cantidad);
    //showCarrito();
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
    mercaderiasContainer.className = 'col-xl-8 col-12 row flex-center';

    const carritoTitulo = document.getElementById("tituloCarrito");
    carritoTitulo.textContent = "Detalle"
    carritoTitulo.classList = 'flex-center title div-confirmar';
}

function getParamsFromHref(){
    var href = window.location.href;
    var paramstr = href.split('?')[1];
    if (paramstr != undefined && paramstr > 0 && paramstr < 11){
        selectCategoria.value = paramstr;               
    }
}

function validateUrlImagen(imagen){
    let imagenUrl = imagen;

    let imagenParts = imagen.split('/');  
    if (imagenParts[2] == 'drive.google.com' && imagenParts[imagenParts.length -1] == 'view'){
        //imagenUrl = `https://www.googleapis.com/drive/v3/files/${imagenParts[5]}?alt=media&key=AIzaSyBY5G5xHHpWM8DlcK6Xqh4WqIHmkqvSDXc`
        imagenUrl = `https://drive.google.com/uc?id=${imagenParts[5]}`
    }
    else{
        let imageId = imagen.split('id=')[1];
        //imagenUrl = `https://www.googleapis.com/drive/v3/files/${imageId}?alt=media&key=AIzaSyBY5G5xHHpWM8DlcK6Xqh4WqIHmkqvSDXc`
    }

    return imagenUrl;
}

//onload
getParamsFromHref();
//checkCarrito();
setTimeout(() => {
    getMercaderias();
}, 500); 