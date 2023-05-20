let url = 'https://localhost:7017/api/v1/Comanda'
let comanda;
let listaComandas = [];

const getComandas = async(fecha) => {
    let urlComandas = `${url}?fecha=${fecha}`;
    let response = await fetch(urlComandas, {});
    if(response.ok){
        listaComandas = await response.json();
    }  
    return listaComandas;
}

const insertComanda = async(_mercaderias, _formaEntrega) => {
    var comanda = { mercaderias: _mercaderias, formaEntrega: _formaEntrega };

    fetch(url, {
    method: 'POST', 
    body: JSON.stringify(comanda), 
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}


const apiComandas = { Get: getComandas, InsertComanda: insertComanda };

export default apiComandas;
