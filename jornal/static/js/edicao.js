(function () {

    // campos input
    let edicaoTextoMarkdown = document.getElementById("edicaoTextoMarkdown");

    // botoes
    let edicaoBtnFinalizar = document.getElementById("edicaoBtnFinalizar");
    let edicaoBtnSalvarAtual = document.getElementById("edicaoBtnSalvarAtual");

    // divs aviso 
    let divMsg = document.getElementById("msg");
    let divMsg2 = document.getElementById("msg2");

    let carregarTextoMarkdown = () => {
        let jornal_markdown = JSON.parse(localStorage.getItem("jornal_markdown"));
        edicaoTextoMarkdown.value = jornal_markdown.texto_markdown;
    };

    carregarTextoMarkdown();

    ////////////////////////////////////////////////////////
    // btnSalvarAtual.onclick 
    // salva no storage o texto editado em text area
    ////////////////////////////////////////////////////////
    edicaoBtnSalvarAtual.onclick = async function() {
        let jornal_markdown = JSON.parse(localStorage.getItem("jornal_markdown"));
        jornal_markdown.texto_markdown = edicaoTextoMarkdown.value;
        localStorage.setItem("jornal_markdown", JSON.stringify(jornal_markdown));
        Util.msg(divMsg2, "Edição salva", "success");
        carregarTextoMarkdown();
    }

    ////////////////////////////////////////////////////////
    // btnFinalizar.onclick 
    // envia post para /api/docx.json
    // 
    ////////////////////////////////////////////////////////
    edicaoBtnFinalizar.onclick = async function() {
        let jornal_markdown = JSON.parse(localStorage.getItem("jornal_markdown"));
        jornal_markdown.texto_markdown = edicaoTextoMarkdown.value;
        let data = {
            titulo: jornal_markdown.titulo,
            texto_markdown: jornal_markdown.texto_markdown
        }

        let response = await fetch('/api/docx.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        let resultado = await response.json();
        if (resultado.status === 201) {
            Util.msg(divMsg, "Arquivo criado!", "success");
            localStorage.setItem("nome_arquivo", resultado.nome_arquivo);
            window.location = "/enviar";
        } else {
            Util.msg(divMsg, `${resultado.status} | ${resultado.message} | ${resultado.erro}`, "danger")
        }
    };
})();
  