let callback = function() {

    // /api/registrar.json
    let btnRegistrar = document.getElementById("btnRegistrar");
    let nome = document.getElementById("nome");
    let login = document.getElementById("login");
    let email = document.getElementById("email");
    let senha = document.getElementById("senha");
    let msg = document.getElementById("msg");
    msg.innerHTML = "";

    btnRegistrar.onclick = async () => {

        let data = {
            nome: nome.value.trim(),
            login: login.value.trim(),
            email: email.value.trim(),
            senha: senha.value.trim()
        }

        if (utils.val.anyIsEmpty([data.nome,
                data.login,
                data.email,
                data.senha
            ])) {
            msg.innerHTML = utils.span.html(
                'Não é permitido campo vazio Verifique.', 'warning');
        } else {

            msg.innerHTML = '';

            console.log(data);

            let response = await fetch('/api/registrar.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let result = await response.json();
            // se status for 200 - logou, direciona para /
            if (result.status === 200) {
                // [TODO] seta sesstion/cookie
                msg.innerHTML = utils.span.html("Logado", "success");
                console.log(result);
            } else {
                console.log('erro');
                console.log(result);
                msg.innerHTML = utils.span.html(result.message, "danger");
            }
        }
    }; // fim bntRegistrar
};

if (document.readyState === "complete" ||
    (document.readyState !== "loading" &&
        !document.documentElement.doScroll)) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}