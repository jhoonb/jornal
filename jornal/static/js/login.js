/*
    Script login.js - controle da página login
*/

var callback = function() {

    let msg = document.getElementById("msg");
    msg.innerHTML = "";

    let validarLogin = function(email, senha) {
        if (email === "" || email.length <= 0) return false;
        if (email.search("@") == -1) return false;
        if (senha === "" || senha.length <= 0) return false;
        return true;
    }

    let btnLogar = document.getElementById("btnLogar");

    btnLogar.onclick = async function() {
        var email = document.getElementById("email").value.trim();
        var senha = document.getElementById("senha").value.trim();

        if (!validarLogin(email, senha)) {
            msg.innerHTML = '<span class="label warning">Email/Senha vazios! Verifique.</span>';
        } else {
            msg.innerHTML = '<span class="label info">Autenticando... aguarde.</span>';

            let data = {
                email: email,
                senha: senha
            };

            let response = await fetch('/api/login.json', {
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
                localStorage.setItem("quantidade", result.quantidade);
                localStorage.setItem("tipos", result.tipos);
                localStorage.setItem("cabecalho", JSON.stringify(result.cabecalho));
                document.cookie = 'email=' + email;
                msg.innerHTML = '<span class="label info">' + result.message + '</span>'
                window.location = "/";
            } else {
                msg.innerHTML = '<span class="label danger">' + result.message + '</span>'
            }
        } // else
    } // funcao btnLogar.onclick
};

if (document.readyState === "complete" ||
    (document.readyState !== "loading" &&
        !document.documentElement.doScroll)) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}