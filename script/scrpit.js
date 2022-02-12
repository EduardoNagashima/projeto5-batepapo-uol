let init = false;

let pessoa = {
    name: 'Eduardo'
}

let selected = 'Todos';

// USAR ESSA FUNÇÃO PRIMEIRO DE TUDO, DEPOIS DELA PODER FAZER TUDO O RESTO!
// function pegarNome() {
//     pessoa.name = document.querySelector('.login input').value;
//     document.querySelector('.login').classList.add('hide');
// }

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
                            <span class="time">(${obj.time})</span>
                            <strong class="from">${obj.from}</strong>
                            <p class="text"> ${obj.text}</p>
                        </div>
                    </section>`;
            } else if (obj.type == 'message') {
                msg.innerHTML += `
                    <section class="message" data-identifier="message">
                    <div>
                        <span class="time">(${obj.time})</span>
                        <strong class="from"> ${obj.from}</strong>
                        <span class="to">para <b>${obj.to}</b>: </span>
                        <p class="text"> ${obj.text}</p>
                    </div>
                </section>`;
            } else if (obj.type == "private_message" && (getMesseges[i].to == pessoa.name || getMesseges[i].from == pessoa.name)) {
                msg.innerHTML += `
                    <section class="private-message" data-identifier="message">
                    <div>
                        <span class="time">(${obj.time})</span>
                        <strong class="from"> ${obj.from}</strong>
                        <span class="to">para <b>${obj.to}</b>: </span>
                        <p class="text"> ${obj.text}</p>
                    </div>
                </section>`;
            }
        }
    }
    init = true;
    scrollar();
}

function getParticipantes() {
    let participantes = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    participantes.then(processaResposta);
}

function processaResposta(resposta) {
    let pessoas = resposta.data;
    listPersons(pessoas);
}

function listPersons(resposta) {
    let person = document.querySelector('.contacts');
    for (let i = 0; i < resposta.length; i++) {
        person.innerHTML += `<div onclick="selectPerson(this)">
    <div>
        <ion-icon name="person-circle-sharp"></ion-icon>
        <p class="from">${resposta[i].name}</p>
    </div>
    <div class="checkmark">
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
    atualizarEnvio(el)
}

function atualizarEnvio(el) {
    let from = el.querySelector('.from').innerHTML;
    let p = document.querySelector('footer div p');
    let privateMessage = document.querySelector('.visibility .selected p').innerHTML;
    p.innerHTML = `Enviando para ${from} (${privateMessage})`;
    p.classList.remove('hide');
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

    let from = document.querySelector('.selected .from').innerHTML;
    let p = document.querySelector('footer div p');
    let privateMessage = document.querySelector('.visibility .selected p').innerHTML;
    p.innerHTML = `Enviando para ${from} (${privateMessage})`;
    p.classList.remove('hide');
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
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", pessoa);
    promisse.catch(deuRuim);
}

function deuRuim(erro) {
    if (erro.response.status === 400) {
        alert('Nome já em uso! Tente novamente.');
    };
    window.location.reload();
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

    let toPessoa = document.querySelector('.selected .from').innerHTML;

    let privateMessage = document.querySelector('.visibility .selected p').innerHTML;

    if (privateMessage == 'Reservadamente') {
        let obj = {
            from: pessoa.name,
            to: toPessoa,
            text: msgWrite,
            type: "private_message"
        }
        axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", obj);
        document.querySelector('footer input').value = '';
    } else {
        let obj = {
            from: pessoa.name,
            to: toPessoa,
            text: msgWrite,
            type: "message"
        }
        axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", obj);
        document.querySelector('footer input').value = '';
    }

}

function scrollar() {
    const main = document.querySelectorAll('section');
    main[main.length - 1].scrollIntoView();
}

function pegarNome() {
    pessoa.name = document.querySelector('.login input').value;
    let load = document.querySelector('.nomeinput');
    load.innerHTML = `<img src="images/loading.gif" alt="loading">`
    setTimeout(loadScreen, 500);
    entrarSala();
}

function loadScreen() {
    let login = document.querySelector('.login');
    login.classList.toggle('invisivel');
    login.classList.toggle('login');
}
getParticipantes();

setInterval(get, 5000);
setInterval(isOnline, 5000);