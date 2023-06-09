import apiComandas from '/src/services/apiComandas.js'
import RenderComanda from '/src/components/cardComanda.js'
import RenderComandaMercaderia from '/src/components/cardComandaMercaderia.js'
import spinnerService from '/src/services/spinnerService.js'

let comandasStorage = [];

initialConfig();
await getComandas();

function initialConfig(){
  flatpickr("#fechaComanda", {
    maxDate: "today",
    defaultDate: "today",
    locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
          longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],         
        }, 
        months: {
          shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
          longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
      },
  });

  const buttonBuscar = document.getElementById("btnBuscar");
  buttonBuscar.addEventListener("click", async() => { await getComandas();} )
}

async function getComandas(){
    spinnerService.Show();
    const fechaInput = document.getElementById("fechaComanda");
    comandasStorage = await apiComandas.Get(fechaInput.value);    
    spinnerService.Hide();
    renderComandas();
}

async function renderComandas(){
    checkComandas();
    let comandasContainer = document.getElementById("comandasContainer");
    comandasContainer.innerHTML = '';
    comandasStorage.forEach(comanda =>{ 
        comandasContainer.innerHTML += RenderComanda(comanda);

        let mercaderias = groupProducts(comanda.mercaderias);
        let mercaderiaContainer = document.getElementById(`comandaMercaderias_${comanda.id}`);
        
        for (let mercaderia in mercaderias){
          mercaderiaContainer.innerHTML += RenderComandaMercaderia(mercaderias[mercaderia]);
        }
    })  
}

function groupProducts(mercaderias){
  const resultado = mercaderias.reduce((group, product) => {
      const {id} = product;
      group[id] = group[id] ?? [];
      group[id].push(product);
      return group;
      }, {});
  return resultado;
}

function checkComandas(){    
  const comandasContainer = document.getElementById("comandas-empty");                
  if (!comandasStorage.length > 0){
    comandasContainer.style.display = "block";
    
    var titleEmpty = document.getElementById("title-empty");
    if(titleEmpty){
      titleEmpty.textContent = "  No existen comandas en la fecha seleccionada";
      titleEmpty.className = "bi bi-calendar-x title divTituloCarrito";
    }
  }
  else{
    comandasContainer.style.display = "none";
  }
}