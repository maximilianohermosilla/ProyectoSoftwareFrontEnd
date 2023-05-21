import apiComandas from '/src/services/apiComandas.js'
import RenderComanda from '/src/components/cardComanda.js'
import RenderComandaMercaderia from '/src/components/cardComandaMercaderia.js'

let comandasStorage = await apiComandas.Get('2023-05-20');
console.log(comandasStorage);
renderComandas();

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

function getDate(){
    const fechaInput = document.getElementById("fechaComanda");
    console.log(fechaInput.value);
}

const buttonBuscar = document.getElementById("btnBuscar");
buttonBuscar.addEventListener("click", () => {getDate();})


async function renderComandas(){
    let comandasContainer = document.getElementById("comandasContainer");
    comandasContainer.innerHTML = '';
    comandasStorage.forEach(comanda =>{ 
        comandasContainer.innerHTML += RenderComanda(comanda);

        let mercaderiaContainer = document.getElementById(`comandaMercaderias_${comanda.id}`);
        comanda.mercaderias.forEach(mercaderia =>{ 
            mercaderiaContainer.innerHTML += RenderComandaMercaderia(mercaderia);
        })
    })    
    //onImageItemClick(document.querySelectorAll(".card-img-top"));
}