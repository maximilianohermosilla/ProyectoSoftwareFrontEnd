import loaderHtml from '/src/services/loaderHtml.js'
import carritoService from '/src/services/carritoService.js'

let pages = [];
pages.push({ html: '/pages/carritoDetalle.html', into: 'carrito-container'});
loaderHtml.Get(pages);

//Variables
let carritoStorage = await carritoService.GetCarrito();

//Functions
function checkCarrito(){    
    if (!carritoStorage.length > 0){
        var carritoContainer = document.getElementById("carrito-container");
        carritoContainer.style.display = "none";
        
        var titleEmpty = document.getElementById("title-empty");
        if(titleEmpty){
            titleEmpty.textContent = "  El carrito está vacío";
            titleEmpty.className = "bi bi-cart-dash title divTituloCarrito";
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
        carritoService.ClearCarrito();
        window.location.reload();
    })
}

setTimeout(() => {    
    //carritoService.RenderCarritoView();
    domSettings();
    checkCarrito();    
}, 500);



