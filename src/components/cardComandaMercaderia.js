export default function RenderComandaMercaderia(mercaderia){
    return `
        <div class="div-body flex-space">
            <h6 class="comanda-guid card-text"><span class="">${mercaderia.length} x ${mercaderia[0].nombre}</span></h6>
            <h6 class="comanda-guid card-text">$${mercaderia.length * mercaderia[0].precio}</h6>            
        </div>
    `;
}