let part, sombra, contatos, nominho, listpartatt, userpm, checkon, checkoff, telalogin, errologin, campologin;
let mensagem = {from:"",to:"Todos", text:"", type:"message"};
const areamsg = document.querySelector('.areademensagens');
let usuario = {name: "",}


let texto = document.querySelector('.cxtexto');// texto da input
sombra = document.querySelector(".cobertura"); //sombreado da tela de participantes
part = document.querySelector(".participantes");//area da lista de participantess
contatos = document.querySelector(".contatos");//participantes
telalogin = document.querySelector(".telainicial");
errologin = document.querySelector(".erronologin");
campologin = document.querySelector(".login");


const promessaparticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
promessaparticipantes.then(exibirParticipantes);

const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');//pega lista de mensagems
promessa.then(exibirMensagens);//recebeu lista de mensagens
promessa.catch(falha);//falhou receber lista de mensagens

atualizarParticipantes(); //atualiza lista de participantes
           
const refreshChat = setInterval(atualizarChat, 3000);
const refreshPart = setInterval(atualizarParticipantes, 10000);

/*
 function qualseunome() {
    usuario.name = prompt("Qual seu nome de usuário?");
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    mensagem.from = usuario.name;
    requisicao.then(sucesso);
    requisicao.catch(falhaUsuario);
}
*/
function fazerlogin() {
    usuario.name = campologin.value;
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    mensagem.from = usuario.name;
    requisicao.then(sucesso);
    requisicao.catch(falhaUsuario);

}
function sucesso() {
    //alert("bem vindo ao xét");
    const manterConec = setInterval(manterConexao, 4000);
    telalogin.classList.add("display");


}
function falhaUsuario(error) {
      console.log(error);
      campologin.innerHTML = "";
      errologin.innerHTML = "Nome de usuário inválido, tente outro.";

  }

function falha(error) {
    console.log(error);
    alert(`O erro ${error} tente novamente mais tarde.`);
    
}
function atualizarChat() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(exibirMensagens);
    promessa.catch(falha);

}

function exibirMensagens(resposta) {
    areamsg.innerHTML = "";
    console.log("atualizou chat");    
      
    for (let i = 0; i < 100; i++) {
        if (resposta.data[i].type === "message" && resposta.data[i].to === "Todos"){
        areamsg.innerHTML += `<div class="mensagens"><p class="formatacaomensagem"><span class="hora">(${resposta.data[i].time})</span> <span class="usermsg">${resposta.data[i].from}</span> <span class="msg">para</span> <span class="usermsg">${resposta.data[i].to}</span> <span class="msg">${resposta.data[i].text}</span></p></div>`;
        }
        else if (resposta.data[i].type === "status") {
        areamsg.innerHTML +=  `<div class="mensagens cinza"><p class="formatacaomensagem"><p><span class="hora">(${resposta.data[i].time})</span> <span class="usermsg">${resposta.data[i].from}</span> <span class="msg">${resposta.data[i].text}</span></p></p></div>`;
        }
        else {
            if (resposta.data[i].to === usuario.name){
            areamsg.innerHTML +=  `<div class="mensagens rosa"><p class="formatacaomensagem"><span class="hora">(${resposta.data[i].time})</span> <span class="usermsg">${resposta.data[i].from}</span> <span class="msg1">reservadamente para</span> <span class="usermsg">${resposta.data[i].to}</span> <span class="msg">${resposta.data[i].text}</span></p></div>`;
        }   else if(resposta.data[i].from === usuario.name){
            areamsg.innerHTML +=  `<div class="mensagens rosa"><p class="formatacaomensagem"><span class="hora">(${resposta.data[i].time})</span> <span class="usermsg">${resposta.data[i].from}</span> <span class="msg1">reservadamente para</span> <span class="usermsg">${resposta.data[i].to}</span> <span class="msg">${resposta.data[i].text}</span></p></div>`;
        }
        }
    }
    areamsg.scrollIntoView(false);
}


function enviarMensagem() {
    //mensagem.time = `${getHours()}:${getMinutes()}`
    mensagem.text = texto.value;
    const enviomsg = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    texto.value = "";
    enviomsg.then(atualizarChat);
    enviomsg.catch(reloadpag);
    

}

function mensagemTodos() {
    mensagem.to = "Todos";
    mensagem.type = "message";
}
function mensagemPrivada(contatoclicado) {
    console.log(userpm);
    userpm = contatoclicado.querySelector(".pessoa");
    mensagem.to = userpm.innerHTML;
    mensagem.type = "message";
}



function exibirParticipantes(participante) {
    contatos.innerHTML =  `<div class="contato" onclick="mensagemTodos(), marcarCheck(this)"><ion-icon name="people" style="font-size: 20px; margin-right: 8px;"></ion-icon><p>Todos</p><ion-icon name="checkmark-sharp" class="check displayon"></ion-icon></div>`;
    for (let a = 0; a < participante.data.length ; a++){
       contatos.innerHTML += `<div class="contato" onclick="mensagemPrivada(this), marcarCheck(this)"><ion-icon name="person-circle" style="font-size: 20px; margin-right: 8px;"></ion-icon><p class="pessoa">${participante.data[a].name}</p><ion-icon name="checkmark-sharp" class="check"></ion-icon></div>`;
    }
}
function atualizarParticipantes() {
    const promessaparticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    console.log("atualizou participantes");
    promessaparticipantes.then(exibirParticipantes);
    
    
}

function toggleLista() {
    sombra.classList.toggle('display');
    part.classList.toggle('display');
}

function manterConexao() {
   const conection = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario);
}
function marcarCheck(pramarcar) {
    checkoff = document.querySelector(".check.displayon");
    checkoff.classList.remove("displayon");
    checkon = pramarcar.querySelector(".check");
    checkon.classList.add("displayon");
}
function reloadpag(erro2) {
    
    console.log(erro2);
    /*if (mensagem.text === ""){
        alert("Não é possível enviar mensagem vazia.");
        
    }
    else {*/
    window.location.reload();
    alert("Não é possível enviar mensagem vazia ou você foi desconectado");
}


texto.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checa se a tecla foi enter
        enviarMensagem();
    }
});

campologin.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checa se a tecla foi enter
        fazerlogin();
    }
});
