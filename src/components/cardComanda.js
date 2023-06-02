export default function RenderComanda(comanda){
    return `
    <div class="comanda">        
        <div class="row">
            <div class="div-body flex-center comanda-body comanda-title">
                <h5 class="comanda-guid">
                    <span class="">Comanda: ${comanda.id}</span>
                </h5>
            </div>
            <div class="comanda-body flex-center subtitle">
                <div class="div-body">
                    <h5 class=""><strong>${comanda.formaEntrega.descripcion}</strong></h5>
                </div>
                <div class="div-fecha">
                    <h5 class="card-fecha">${comanda.fecha.substr(0,10)}</h5>     
                </div>                
            </div>            
        </div>
        <div class="comanda-body comanda-mercaderias overflow-auto" id="comandaMercaderias_${comanda.id}">
        </div>
        <div class="row flex-center comanda-title ">
            <div class="precio col-lg-2 col-3 flex-center">
             <span class="card-fecha">Total: </span>      
             <span class="">$${comanda.total}</span>
            </div>
        </div>
    </div>
    `;
}