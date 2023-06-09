const circle = document.getElementById('circle');

function show(){
    circle.style.display = 'block';
}

function hide(){
    circle.style.display = 'none';
}

const spinnerService = { Show: show, Hide: hide };

export default spinnerService;

