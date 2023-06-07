export default function RenderCarrito(mercaderia){
    return `
    <div class="row carrito">
        <div class="carrito-img col-2 flex-center">
            <img id="${mercaderia.id}" src="${mercaderia.imagen}" class="img-carrito" onerror="this.src='../images/notfound.png'">
        </div>
        <div class="carrito-body col-lg-5 col-4 flex-center">
            <div class="div-body">
                <h5 class="card-title">${mercaderia.nombre}
                <h6 class="card-text">${mercaderia.descripcion}</h6>
            </div>
        </div>
        <div class="carrito-cantidad col-2 flex-center">
            <div class="div-cantidad flex-center">
                <span id="${mercaderia.id}" class="span-cantidad btn btn-danger btnQuitarCantidad">-</span>            
                <span class="cantidad-value">${mercaderia.cantidad}</span>            
                <span id="${mercaderia.id}" class="span-cantidad btn btn-success btnAgregarCantidad">+</span>            
            </div>
        </div>
        <div class="carrito-precio col-lg-2 col-3 flex-center">
            <button class="span-precio btn btn-warning" disabled>$${mercaderia.precio * mercaderia.cantidad}</button>
        </div>
        <div class="carrito-cantidad col-1">
            <i id="${mercaderia.id}" class="btn-close delete-icon"></i></h5>
        </div>
    </div>
    `;
}