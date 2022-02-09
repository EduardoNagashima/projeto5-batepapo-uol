let selectedPerson = '';

function sendMessage() {
    alert('Enviar mensagem');
}

function refresh() {

}

function selectPerson(el) {
    let selected = document.querySelector('.selected');
    if (selected !== null) {
        selected.classList.remove('selected');
    }
    el.classList.add('selected');
    console.log(el);
}

function selectVisibility(el) {
    let selected = document.querySelector('.selected');
    if (selected !== null) {
        selected.classList.remove('selected');
    }
    el.classList.add('selected');
    console.log(el);
}


function show(element) {
    let el = document.querySelector('.hide');
    let body = document.querySelector('body')
    if (el !== null) {
        el.classList.toggle('hide');
        body.classList.toggle('body-fixed');
    } else {
        element.parentNode.classList.toggle('hide');
        body.classList.toggle('body-fixed');
    }
}