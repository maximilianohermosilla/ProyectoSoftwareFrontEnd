import loaderHtml from '/src/services/loaderHtml.js'

let pages = [];

let navbarHtml = '/pages/navbar.html';
pages.push({ html: navbarHtml, into: 'navbar'});

const loadHtml = async (pages) => {
    await loaderHtml.Get(pages);
}

loadHtml(pages);