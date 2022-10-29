let part, sombra, contatos, nominho;
let mensagem = {name:"",to:"Todos", text:"", type:"message"};
const areamsg = document.querySelector('.areademensagens');
const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
let usuario = {name: "",}


let texto = document.querySelector('.cxtexto');//.value; // texto da input
sombra = document.querySelector(".cobertura");
part = document.querySelector(".participantes");
contatos = document.querySelector(".contatos");

promessa.then(exibirMensagens);
promessa.catch(falha);
const promessaparticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
promessaparticipantes.then(exibirParticipantes);



qualseunome();

 function qualseunome() {
    usuario.name = prompt("Qual seu nome de usuário?");
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    requisicao.then(sucesso);
    requisicao.catch(falhaUsuario);
}

function sucesso() {
    alert("bem vindo ao xét");
    setInterval(manterConexao, 4000);

}
function falhaUsuario(error) {
      console.log(error);
      alert(`O erro ${error} nome de usuário inválido.`);
      //setInterval(qualseunome(), 1000);
  }

function falha(error) {
    console.log(error);
    alert(`O erro ${error} tente novamente mais tarde.`);
    
}


function exibirMensagens(resposta) {
    areamsg.innerHTML = "";
    console.log(promessa);
    console.log(promessa.data);
    
      
    for (let i = 0; i < 100; i++) {
        if (resposta.data[i].type === "message"){
        areamsg.innerHTML += `<div class="mensagens"><span class="hora">(${resposta.data[i].time})&nbsp</span><span class="usermsg">${resposta.data[i].from}</span>&nbsp <span class="msg">para</span> &nbsp <span class="usermsg">${resposta.data[i].to}</span><span class="msg">&nbsp${resposta.data[i].text}</span></div>`;
        }
        else if (resposta.data[i].type === "status") {
        areamsg.innerHTML +=  `<div class="mensagens cinza"><span class="hora">(${resposta.data[i].time})&nbsp</span><span class="usermsg">${resposta.data[i].from}</span>&nbsp <span class="msg">${resposta.data[i].text}</span></div>`;
        }
        else {
        areamsg.innerHTML +=  `<div class="mensagens rosa"><span class="hora">(${resposta.data[i].time})&nbsp</span><span class="usermsg">${resposta.data[i].from}</span>&nbsp <span class="msg1">reservadamente para</span> &nbsp <span class="usermsg">${resposta.data[i].to}</span><span class="msg">&nbsp${resposta.data[i].text}</span></div>`;
        }
    }
    areamsg.scrollIntoView(false);
}


function enviarMensagem() {
    //mensagem.time = `${getHours()}:${getMinutes()}`
    mensagem.text = texto.value;
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);

}

function mensagemTodos() {
    mensagem.to = "Todos";
    mensagem.type = "message";
}
function mensagemPrivada(userpm) {
    mensagem.to = `${userpm}`;
    mensagem.type = "message";
}

function  buscarParticipantes() {
    promessaparticipantes.then(exibirParticipantes);
    toggleLista();
    
}

function exibirParticipantes(participantes) {
    contatos.innerHTML =  `<div class="contato"><ion-icon name="people" style="font-size: 20px; margin-right: 8px;"></ion-icon><p>Todos</p><ion-icon name="checkmark-sharp" class="check"></ion-icon></div>`;
    console.log(participantes.data);
    for (let a = 0; a < participantes.data.length ; a++){
       contatos.innerHTML += `<div class="contato" onclick="mensagemPrivada(${participantes.data[a].name})"><ion-icon name="person-circle" style="font-size: 20px; margin-right: 8px;"></ion-icon><p>${participantes.data[a].name}</p><ion-icon name="checkmark-sharp" class="check"></ion-icon></div>`;
    }
    
}
function toggleLista() {
    sombra.classList.toggle('display');
    part.classList.toggle('display');
}
/*function manterConexao{
   const conection = axios.push("https://mock-api.driven.com.br/api/v6/uol/status", user.name);
}
*/
