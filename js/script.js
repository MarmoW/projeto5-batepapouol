//let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants ');
let user = {name: "",};
const areamsg = document.querySelector('.areademensagens');
const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');



promessa.then(exibirMensagens);
promessa.catch(falha);

//user.name = prompt("Qual seu nome de usuário?");
//const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: user.name});
//requisicao.then(sucesso);
//requisicao.catch(falha);


function falha(error) {
    console.log(user.name);
    console.log(error);
    //alert(`O erro ${error} ocorreu tente outro nome de usuário.`);
    //escolherNome();
}

//<div class="mensagens"><span class="hora">${hora da msg}</span><span class="usermsg">${usuario que enviou}</span><span class="msg">${texto da msg}</span></div>
// areamsg.innerHTML = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants', );

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

