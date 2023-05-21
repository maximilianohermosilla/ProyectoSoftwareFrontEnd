export default function RenderComanda(comanda){
    return `
    <div class="comanda">        
        <div class="row">
            <div class="div-body flex-center comanda-title">
                <h6 class="comanda-guid card-text">
                    <span class="title">Comanda: ${comanda.id}</span>
                </h6>
            </div>
            <div class="comanda-body flex-center comanda-title">
                <div class="div-body">
                    <span class="card-title card-text">${comanda.formaEntrega.descripcion}</span>
                </div>
                <div class="div-fecha">
                    <span class="card-title card-fecha card-text">${comanda.fecha.substr(0,10)}</span>     
                </div>                
            </div>            
        </div>
        <div class="row comanda-body comanda-title comanda-mercaderias overflow-auto" id="comandaMercaderias_${comanda.id}">
        </div>
        <div class="row flex-center comanda-body ">
            <div class="carrito-precio col-lg-2 col-3 flex-center">
            <span class="card-title card-fecha card-text">Total: </span>      
                <span class="span-precio">$${comanda.total}</span>
            </div>
        </div>
    </div>
    `;
}