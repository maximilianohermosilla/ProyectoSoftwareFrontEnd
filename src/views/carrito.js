import loaderHtml from '/src/services/loaderHtml.js'
import carritoService from '/src/services/carritoService.js'
import RenderConfirmModal from '/src/components/confirmModal.js'
import RenderPopUp from '/src/components/popup.js'

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

async function confirmCarrito(){
    let mercaderias = [];
    let formaEntrega = document.querySelector('input[name="check-entrega"]:checked').id;
    carritoStorage = await carritoService.GetCarrito();

    carritoStorage.map((prod) => {
        for (let index = 0; index < prod.cantidad; index++) {
            mercaderias.push(prod.id);        
        }
    });

    showPopUp("Confirmación", "Pedido guardado con éxito", clearCarrito);
    apiComandas.InsertComanda(mercaderias, formaEntrega);
    showPopUp();
    
}

function clearCarrito(){ 
    carritoService.ClearCarrito();
    window.location.reload();
}

function showPopUp(title, text, callback){
    const popUpContainer = document.getElementById("popUpContainer");
    popUpContainer.innerHTML = RenderPopUp(title, text);    

    const popupModal = new bootstrap.Modal(document.getElementById('popupModal'));    
    popupModal.show();        
    
    const popup = document.getElementById('popupModal');        
    popup.addEventListener('hidden.bs.modal', function (event) {
        clearCarrito();
    })
}

setTimeout(() => {  
    domSettings();
    checkCarrito();    
}, 500);



