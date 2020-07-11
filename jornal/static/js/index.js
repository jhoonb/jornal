(function () {
  /*
  */
  let indexBtnAcessar = document.getElementById("indexBtnAcessar");
  let indexBtnConfiguracao = document.getElementById("indexBtnConfiguracao");
  let indexBtnLogout = document.getElementById("indexBtnLogout");
  let indexBtnUltimo = document.getElementById("indexBtnUltimo");

  indexBtnAcessar.onclick = () => {
    window.location = "/novo";
  };


  indexBtnConfiguracao.onclick = () => {
    window.location = "/configuracao";
  };

  indexBtnLogout.onclick = () => {
    window.location = "/logout";
  };

  indexBtnUltimo.onclick = () => {
    window.location = "/enviar";
  };

})();
