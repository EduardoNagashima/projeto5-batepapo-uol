let selectedPerson = '';

let pessoa = {
    name: 'JOÃO CARAI'
}


function writeMessege(getMesseges) {
    msg = document.querySelector('main');
    for (let i = 0; i < getMesseges.length; i++) {
        let obj = {
            from: getMesseges[i].from,
            to: getMesseges[i].to,
            text: getMesseges[i].text,
            type: getMesseges[i].type,
            time: getMesseges[i].time
        }
        if (obj.text == 'sai da sala...' || obj.text == 'entra na sala...') {
            msg.innerHTML += `
                <section class="isOnline-offline">
                <div>
                    <span class="time">${obj.time}</span>
                    <strong class="from">${obj.from}</strong>
                    <p class="text">${obj.text}</p>
                </div>
            </section>`;
        } else {
            msg.innerHTML += `
            <section class="">
            <div>
                <span class="time">${obj.time}</span>
                <strong class="from"> ${obj.from}</strong>
                <span class="to">para ${obj.to}:</span>
                <p class="text">${obj.text}</p>
            </div>
        </section>`;
        }
    }

}

// function listPersons(getMesseges) {
//     console.log(getMesseges)
//     let person = document.querySelector('contacts');
//     for (let i = 0; i < getMesseges.length; i++) {
//         person.innerHTML += `<div onclick="selectPerson(this)">
//     <div>
//         <ion-icon from="people"></ion-icon>
//         <p class="from">${getMesseges[i].from}</p>
//     </div>
//     <div>
//         <ion-icon class="check" name="checkmark-outline"></ion-icon>
//     </div>
//     </div>`
//     }
// }

function selectPerson(el) {
    let selected = document.querySelector('.contacts .selected');
    let check = document.querySelector('.contacts .mark');
    if (selected !== null) {
        selected.classList.remove('selected');
    }
    if (check !== null) {
        check.classList.remove('mark');
    }
    el.querySelector('.check').classList.add('mark');
    el.classList.add('selected');
}

function selectVisibility(el) {
    let selected = document.querySelector('.visibility .selected');
    let check = document.querySelector('.visibility .mark');
    if (selected !== null) {
        selected.classList.remove('selected');
    }
    if (check !== null) {
        check.classList.remove('mark');
    }
    el.querySelector('.check').classList.add('mark');
    el.classList.add('selected');
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

function entrarSala() {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", pessoa);
}

function get() {
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(deuCerto);
}

function deuCerto(response) {
    writeMessege(response.data);
    // listPersons(response.data);
}

function isOnline() {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", pessoa);
}


function sendMessage() {
    let msgWrite = document.querySelector('footer input').value;
    pessoa = {
        text: msgWrite
    }
    document.querySelector('footer input').value = '';
}

function promessaFeita(resposta) {
    console.log(resposta.data);
}

function promessaFalhou(erro) {
    console.log(erro.response.status);
}

setInterval(get, 3000);
entrarSala();
setInterval(isOnline, 5000);