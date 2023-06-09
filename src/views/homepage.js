import loaderHtml from '/src/services/loaderHtml.js'
import RenderPopUp from '/src/components/popup.js'

let pages = [];
pages.push({ html: '/pages/components/categorias.html', into: 'categoriasContainer'});
loaderHtml.Get(pages);

const loadMercaderias = async (id) => {  
    location.href = '/pages/mercaderias.html?' + id;
}

function onImageItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{            
            loadMercaderias(element.id);
        });
    });
}

const productosDiv = document.getElementById("productos-div");
productosDiv.addEventListener('click', () =>{
    location.href = '/pages/mercaderias.html';    
})

const comandasDiv = document.getElementById("comandas-div");
comandasDiv.addEventListener('click', () =>{
    location.href = '/pages/comandas.html';    
})

const pedidoDiv = document.getElementById("pedido-div");
pedidoDiv.addEventListener('click', () =>{
    location.href = '/pages/carrito.html';    
})

const ayudaLink = document.getElementById("ayuda-link");
ayudaLink.addEventListener('click', () =>{
    showPopUp("Ayuda", "Para consultas, observaciones o reclamos, dirigirse al administrador del sistema a través del correo: maximiliano_hermosilla@hotmail.com", null);
})

const acercaLink = document.getElementById("acerca-link");
acercaLink.addEventListener('click', () =>{
    showPopUp("Acerca de", "La aplicación web RestaurantePS fue desarrollada como parte del trabajo práctico individual de la materia Proyecto Software en la Universidad Nacional Arturo Jauretche.", null);
})

const contactoLink = document.getElementById("contacto-link");
contactoLink.addEventListener('click', () =>{
    showPopUp("Contacto", "Contáctese con el administrador del sistema. Correo: maximiliano_hermosilla@hotmail.com", null);
})


function showPopUp(title, text, callback){
    const popUpContainer = document.getElementById("popUpContainer");
    popUpContainer.innerHTML = RenderPopUp(title, text);    

    const popupModal = new bootstrap.Modal(document.getElementById('popupModal'));    
    popupModal.show();     
}

setTimeout(() => {
    onImageItemClick(document.querySelectorAll(".categoria-container"));        
}, 500);