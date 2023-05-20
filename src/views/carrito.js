import loaderHtml from '/src/services/loaderHtml.js'
import carritoService from '/src/services/carritoService.js'
import RenderConfirmModal from '/src/components/confirmModal.js'

let pages = [];
let precio = 0;
pages.push({ html: '/pages/carritoDetalle.html', into: 'carrito-container'});
loaderHtml.Get(pages);

//Variables
let carritoStorage = await carritoService.GetCarrito();

//Functions
function checkCarrito(){    
    if (!carritoStorage.length > 0){
        const carritoContainer = document.getElementById("carrito-container");                
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
        var formaChecked = document.querySelector('input[name="check-entrega"]:checked').id;
        let title = "Confirmar Pedido";
        let text = "Usted está a punto de confirmar el pedido. ¿Desea continuar?";
        showConfirmModal(title, text, confirmCarrito);
    })    
    
    btnCancelar.addEventListener('click', () =>{   
        let title = "Cancelar Pedido";
        let text = "Usted está a punto de cancelar el pedido. ¿Desea continuar?";
        showConfirmModal(title, text, clearCarrito);
    })
}

function showConfirmModal(title, text, callback){
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.innerHTML = RenderConfirmModal(title, text);    
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    
    confirmModal.show();
    const confirmModalButton = document.getElementById("confirmModalButton");
    
    confirmModalButton.addEventListener('click', () =>{
        callback();
    })
}

function confirmCarrito(){
    
}

function clearCarrito(){ 
    carritoService.ClearCarrito();
    window.location.reload();
}

setTimeout(() => {  
    domSettings();
    checkCarrito();    
}, 500);



