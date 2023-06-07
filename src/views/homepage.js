import loaderHtml from '/src/services/loaderHtml.js'

let pages = [];
pages.push({ html: '/pages/components/categorias.html', into: 'categoriasContainer'});
pages.push({ html: '/pages/components/homepage.html', into: 'homepageContainer'});
loaderHtml.Get(pages);

const loadMercaderias = async (id) => {  
    location.href = '/pages/mercaderias.html?' + id;
}

function onImageItemClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{            
            loadMercaderias(element.id);
        });
    });
}
setTimeout(() => {
    onImageItemClick(document.querySelectorAll(".categoria-container"));    
}, 500);