(function () {
    // vars
    let noticiasList = [];

    // forms
    let formCabecalho = document.getElementById("formCabecalho");
    let formNoticias = document.getElementById("formNoticias");
    let elementosCabecalho = formCabecalho.elements;

    // inputs
    let URLNoticia = document.getElementById("URLNoticia");

    // buttons
    let novoBtnApagar = document.getElementById("novoBtnApagar");
    let novoBtnFinalizar = document.getElementById("novoBtnFinalizar");

    // divs
    let campoSelect = document.getElementById("campoSelect");
    let divTabela = document.getElementById("tabela");
    let divTempoURL = document.getElementById("tempoURL");

    // divs mensagem
    let msgSalvarCabecalho = document.getElementById("msgSalvarCabecalho");
    let msgNoticia = document.getElementById("msgNoticia");
    let msgFinalizar = document.getElementById("msgFinalizar");

    /////////////////////// funções gerais //////////////////////////

    function gerarNovo() {
        let conf = JSON.parse(localStorage.getItem("configuracao"));

        if (conf === null) {
            alert("Faça uma configuração inicial em 'Configurações'");
            window.location = "/configuracao";
        } else {
            let jornal = JSON.parse(localStorage.getItem("jornal"));
            if (jornal === null) {
                jornal = {};
                for (let co in conf) {
                    jornal[co] = conf[co];
                }
                jornal["titulo"] = Util.gerarTitulo(jornal["titulo"]);
                jornal["noticias"] = [];
                localStorage.setItem("jornal", JSON.stringify(jornal));
            }
        }
    }

    function urlDuplicada(url) {
        for (let n in noticiasList) {
            if (noticiasList[n].url === url) return true;
        }
        return false;
    }

    // gera o select tags
    function gerarSelectTags(tipos) {
        let s = '<select id="tipo">';
        for (var i = 0; i < tipos.length; i++) {
            var tipo = tipos[i];
            s += `\n<option value="${tipo}"> ${tipo}</option>\n`;
        }
        s += "</select>";
        return s;
    }

    // carrega os valores do storage jornal para o form
    function carregarJornal() {
        let jornal = JSON.parse(localStorage.getItem("jornal"));
        for (let i = 0; i < elementosCabecalho.length; i++) {
            if (["text", "textarea"].includes(elementosCabecalho[i].type)) {
                elementosCabecalho[i].value = jornal[elementosCabecalho[i].id];
            }
        }
        divTempoURL.innerHTML = `<a href="${jornal["tempoURL"]}" target="_blank">Acesse o site da Previsão do Tempo</a>`;
        campoSelect.innerHTML = gerarSelectTags(jornal["tags"]);
        noticiasList = jornal["noticias"];
    }

    function atualizarTabela() {
        let data = noticiasList.length !== 0 ? [...noticiasList] : [];
        for (let i = 0; i < data.length; i++) {
            data[i][
                "botaoup"
            ] = `<button type="button" name="btnup-${i}">⬆</button>`;
            data[i][
                "botaodown"
            ] = `<button type="button" name="btndown-${i}">⬇</button>`;
            data[i][
                "botaoexcluir"
            ] = `<button type="button" name="btnexcluir-${i}">❌</button>`;
        }

        Util.gerarTabela(divTabela, ["Link", "Tag", "Ação"], data);

        let jornal = JSON.parse(localStorage.getItem("jornal"));
        jornal["noticias"] = noticiasList;
        localStorage.setItem("jornal", JSON.stringify(jornal));
    }

    //////////////////////////// init ////////////////////////////////

    // gera o storage jornal, caso não exista.
    gerarNovo();
    // carrega o storage jornal para os inputs no form
    carregarJornal();
    // atualiza a tabela com os dados
    atualizarTabela();

    //////////////////////////// eventos ////////////////////////////
    /**
     * Ação ao clicar no botão Salvar Cabeçalho
     * -------------------------------------------------------
     *  atualiza o localstorage 'jornal' com dados do form
     */
    formCabecalho.addEventListener("submit", (event) => {
        event.preventDefault();
        let jornal = JSON.parse(localStorage.getItem("jornal"));

        for (let i = 0; i < elementosCabecalho.length; i++) {
            if (["text", "textarea"].includes(elementosCabecalho[i].type)) {
                jornal[elementosCabecalho[i].id] = elementosCabecalho[i].value;
            }
        }
        localStorage.setItem("jornal", JSON.stringify(jornal));
        Util.msg(msgSalvarCabecalho, "cabeçalho salvo", "info");
    });

    /**
     * Ação ao clicar no botão Adicionar Noticias
     * -------------------------------------------------------
     *  atualiza o localstorage 'jornal' com dados do form
     */
    formNoticias.addEventListener("submit", (event) => {
        event.preventDefault();

        let select = document.getElementById("tipo");
        let tag = select.options[select.selectedIndex].value;
        // console.log(URLNoticia.value);
        if (!urlDuplicada(URLNoticia.value)) {
            noticiasList.push({
                url: URLNoticia.value,
                tag: tag,
            });
            msgNoticia.innerHTML = "";
        } else {
            Util.msg(msgNoticia, "Link duplicado!", "warning");
        }
        URLNoticia.value = "";
        atualizarTabela();
    });

    ////////////////////////////////////////////////////////
    // remove da linha tabela
    // tabela: ação addEventListener -> click
    // captura o clique no botão e remove o elemento
    // da lista de links noticiasList
    ////////////////////////////////////////////////////////
    divTabela.addEventListener("click", (event) => {
        if (event.target.type === "button") {
            let botao = event.target.name.split("-");
            let name = botao[0];
            let index = parseInt(botao[1]);
            // console.log(name, index);
            // excluir o elemento
            if (name === "btnexcluir") {
                noticiasList.splice(index, 1);
                atualizarTabela();
            } else {
                if (name === "btnup") {
                    if (index !== 0) {
                        let swap = noticiasList[index-1];
                        noticiasList[index-1] = noticiasList[index];
                        noticiasList[index] = swap;
                        atualizarTabela();
                    }
                } else if (name === "btndown") {
                    if (index !== noticiasList.length - 1) {
                        let swap = noticiasList[index+1];
                        noticiasList[index+1] = noticiasList[index];
                        noticiasList[index] = swap;
                        atualizarTabela();
                    }
                }
            } // else final
        }
    }); // fim tabela addEventListener

    novoBtnApagar.onclick = () => {
        let opc = confirm("Deseja apagar todos os links inseridos?");
        if (opc === true) {
            noticiasList = [];
            atualizarTabela();
        }
    };

    //
    novoBtnFinalizar.onclick = async () => {
        Util.msg(msgFinalizar, "Preparando dados...", "info");
        let jornal = JSON.parse(localStorage.getItem("jornal"));

        let datajornal = {
            titulo: jornal.titulo,
            cabecalho: jornal.cabecalho,
            tempo: jornal.tempo,
            noticias: jornal.noticias,
        };

        let opc = confirm("Deseja editar o jornal?");
        if (opc === true) {
            let response = await fetch("/api/jornal.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(datajornal),
            });

            let resultado = await response.json();

            if (resultado.status == 200) {
                Util.msg(msgFinalizar, "Gerado com Sucesso!", "success");
                let jornal_markdown = {};
                jornal_markdown.texto_markdown = resultado.texto_markdown;
                jornal_markdown.titulo = resultado.titulo;
                localStorage.setItem(
                    "jornal_markdown",
                    JSON.stringify(jornal_markdown)
                );
                window.location = "/edicao";
            } else {
                Util.msg(
                    msgFinalizar,
                    `Ocorreu um problema: ${resultado.status} - ${resultado.erro} - ${resultado.message}`,
                    "danger"
                );
            }
        } // fim if
    }; // fim ação botao finalizar
})();
