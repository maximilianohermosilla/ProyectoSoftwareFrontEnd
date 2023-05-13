let orden = 'ASC';
let tipo= '';
let nombre = document.getElementById("txtSearch");
let mercaderia;
let listaMercaderias = [];



const getMercaderias = async() => {
    let urlMercaderias = `https://localhost:7017/api/v1/Mercaderia?tipo=${tipo}&nombre=${nombre.value}&orden=${orden}`;
    let response = await fetch(urlMercaderias, {});
    if(response.ok){
        listaMercaderias = await response.json();
    }
    return listaMercaderias;
}

async function getMercaderiaById(id) {
    let urlMercaderiaById = `https://localhost:7017/api/v1/mercaderia/${id}`;
    let response = await fetch(urlMercaderiaById, {});
    if(response.ok){
        mercaderia = await response.json();
    }
    return mercaderia;
}

const apiMercaderias = { Get: getMercaderias, GetById: getMercaderiaById };

export default apiMercaderias;




