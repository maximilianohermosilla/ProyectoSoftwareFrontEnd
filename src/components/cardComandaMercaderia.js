export default function RenderComandaMercaderia(mercaderia){
    return `
        <div class="div-body flex-center">
            <h6 class="comanda-guid card-text">
                <span class="card-title">${mercaderia.nombre} - $${mercaderia.precio}</span>
            </h6>
        </div>
    `;
}