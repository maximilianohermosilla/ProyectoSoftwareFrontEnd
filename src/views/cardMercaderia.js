export default function RenderCard(mercaderia){
    return `
    <div class="card">
        <img id="${mercaderia.id}" src="${mercaderia.imagen}" class="card-img-top" alt="..." data-bs-toggle="modal" data-bs-target="#modalMercaderia">
        <div class="card-body">
        <h5 class="card-title">${mercaderia.nombre}</h5>
        <p class="card-text">${mercaderia.tipo.descripcion}</p>
        <span class="card-text">$${mercaderia.precio}</span>
        <div>
            <a href="#" class="btn btn-success">+ Agregar</a>
        </div>
        </div>
    </div>    
    `;
}