export default function RenderCard(mercaderia){
    return `
    <div class="card">
        <img id="${mercaderia.id}" src="${mercaderia.imagen}" class="card-img-top" alt="..." data-bs-toggle="modal" data-bs-target="#modalMercaderia">
        <div class="card-body">
            <h5 class="card-title">${mercaderia.nombre}</h5>
            <p class="card-text">${mercaderia.tipo.descripcion}</p>
            <span class="card-text">$${mercaderia.precio}</span>
            <div>
                <div class="flex-end">                    
                    <select id="select-cantidad_${mercaderia.id}" class="select-cantidad" aria-label="select-cantidad">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <a id="${mercaderia.id}" class="btn btn-success card-button"><i class="bi bi-cart-plus"></i>Agregar</a>
                </div>
            </div>
        </div>
    </div>    
    `;
}