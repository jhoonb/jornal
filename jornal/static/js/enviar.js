(function () {

    //div
    const divArquivo = document.getElementById("divArquivo");
    const divEmailMsg = document.getElementById("divEmailMsg");

    // botão
    const btnSair = document.getElementById("btnSair");

    // form
    const formEnviar = document.getElementById("formEnviar");

    //inputs
    const emailTo = document.getElementById("emailTo");
    const emailFrom = document.getElementById("emailFrom");
    const senha = document.getElementById("senha");

    // locaStorage
    const nomeArquivo = localStorage.getItem("nome_arquivo");
    //

    /*
    *
    *
    */
    function gerarBotaoArquivo(div) {

        if (nomeArquivo !== null) {
            let link = `${window.location.origin}/static/docx/${nomeArquivo}`;
            let botaoArquivo = `<a target="_blank" href="${link}"</a> ${nomeArquivo}`;
            Util.msg(div, botaoArquivo, "warning");
        } else {
            Util.msg(div, "Nenhum jornal", "info");
        }
    }

    function carregarJornal() {
        const jornal = JSON.parse(localStorage.getItem("jornal"));
        if (jornal !== null) {
            emailTo.value = jornal.emailTo;
            emailFrom.value = jornal.emailFrom;
        }
    }

    //////////////////////////////////// init /////////////////////////////////
    gerarBotaoArquivo(divArquivo);
    carregarJornal();

    btnSair.onclick = () => {
        window.location = '/logout';
    };


    formEnviar.addEventListener("submit", async (event) => {

        event.preventDefault();
        Util.msg(divEmailMsg, "Enviando Email... Aguarde", "info");

        let data = {
            emailFrom: emailFrom.value,
            emailTo: emailTo.value,
            senha: senha.value,
            arquivo: nomeArquivo,
        }
        let response = await fetch('/api/email.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        let res = await response.json();
        if (res.status === 200) {
            Util.msg(divEmailMsg, res.message, "success");
            console.log(res.erro);
        }
        else {
            Util.msg(divEmailMsg, res.message, "danger");
            console.log(res.erro);
        }
    });

})();