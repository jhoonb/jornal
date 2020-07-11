(function () {

    let confBtnApagar = document.getElementById("confBtnApagar");
    let divMsg = document.getElementById("msg");
    let form = document.querySelector('#confForm');
    let elementos = form.elements;

    let loadconfiguracao = () => {
        let conf = localStorage.getItem("configuracao");
        if (conf !== null) {
            conf = JSON.parse(conf);
            for(var i = 0; i < elementos.length; i++) {
                if(elementos[i].type !== 'submit') {
                    elementos[elementos[i].id].value = conf[elementos[i].id];
                }
            } 
        }  
    }

    // cada GET na página efetua a leitura e preenchimento das configurações
    loadconfiguracao();

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let conf = {};
        for(var i = 0; i < elementos.length; i++) {
            if(elementos[i].type !== 'submit') {
            conf[elementos[i].id] = elementos[i].value;
            }
        } 
        // converte string tags para array
        conf['tags'] = conf['tags'].split(",");

        // salvar as configurações no local storage
        localStorage.setItem('configuracao', JSON.stringify(conf));
        Util.msg(divMsg, "Configurações salvas!", "success");
    });

    confBtnApagar.onclick = () => {
        let opc = confirm("Deseja realmente apagar todos os dados?");
        if(opc === true) {
            localStorage.removeItem("configuracao");
            Util.msg(divMsg, "Configurações apagadas", "info");
        }
    }

})();