let init = false;

let pessoa = {
    name: 'SOCORRO PFV'
}

let lastTime = '00:00:00';

function writeMessege(getMesseges) {

    if (init === true) {
        let ultimo = document.querySelectorAll('section');
        lastTime = ultimo[ultimo.length - 1].querySelector('.time').innerHTML;
    }

    msg = document.querySelector('main');

    for (let i = 0; i < getMesseges.length; i++) {
        let obj = {
                from: getMesseges[i].from,
                to: getMesseges[i].to,
                text: getMesseges[i].text,
                type: getMesseges[i].type,
                time: getMesseges[i].time
            }
            // -- condição pra evitar mensagens antigas ----
        if (getMesseges[i].time > lastTime) {
            if (obj.type == 'status') {
                msg.innerHTML += `
                        <section class="online-offline">
                        <div>
                            <span class="time">${obj.time}</span>
                            <strong class="from">${obj.from}</strong>
                            <span class="to">para ${obj.to}:</span>
                            <p class="text">${obj.text}</p>
                        </div>
                    </section>`;
            } else if (obj.type == 'message') {
                msg.innerHTML += `
                    <section class="message">
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

    init = true;
}

function getParticipantes() {
    let participantes = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    participantes.then(ProcessaResposta);
}

function ProcessaResposta(resposta) {
    let pessoas = resposta.data;
    listPersons(pessoas);
}

function listPersons(resposta) {
    let person = document.querySelector('.contacts');
    for (let i = 0; i < resposta.length; i++) {
        person.innerHTML += `<div onclick="selectPerson(this)">
    <div>
        <ion-icon from="people"></ion-icon>
        <p class="from">${resposta[i].name}</p>
    </div>
    <div>
        <ion-icon class="check" name="checkmark-outline"></ion-icon>
    </div>
    </div>`
    }
}

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

function isOnline() {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", pessoa);
}

function deuCerto(resposta) {
    writeMessege(resposta.data);
}

function sendMessage() {
    let msgWrite = document.querySelector('footer input').value;
    let obj = {
        from: pessoa.name,
        to: "Todos",
        text: msgWrite,
        type: "message"
    }
    axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", obj);
    document.querySelector('footer input').value = '';
}

setInterval(get, 3000);
entrarSala();
setInterval(isOnline, 5000);
getParticipantes();