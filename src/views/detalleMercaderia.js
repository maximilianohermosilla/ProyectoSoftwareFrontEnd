export default function RenderDetalle(mercaderia){
    return `
    <div class="row mercaderia-detalle">
        <div class="col-xs-12 col-sm-8">
            <img id="${mercaderia.id}" src="${mercaderia.imagen}" class="mercaderia-imagen" alt="..." data-bs-toggle="modal" data-bs-target="#modalMercaderia">
        </div>
        <div id="detalle-body" class="col-xs-12 col-sm-4">
            <h2 class="mercaderia-title">${mercaderia.nombre}</h2>
            <hr class="hr" />
            <h4 class="detalle-categoria">${mercaderia.tipo.descripcion}</h4>
            <hr class="hr" />
            <button disabled class="detalle-precio btn btn-warning">$${mercaderia.precio}</button><br>
            <hr class="hr" />
            <h3>Ingredientes:</h3>
            <h4 class="detalle-categoria">${mercaderia.ingredientes}</h4>
        </div>
        <hr class="hr" />
        <div id="detalle-body" class="col-12">
            <h3>Preparación:</h3>
            <h5 class="detalle-categoria">${mercaderia.preparacion}</h5>
        </div>
        </div>
    </div>    
    `;
}