"use strict";

const Util = {};


Util.anyInputEmpty = (listIdInput) => {
  if (listIdInput.length === 0) return true;
  for (let i = 0; i < listInput.length; i++) {
    if (document.getElementById(listIdInput[i]).value.trim() === "") return true;
  }
  return false;
};


//
Util.msg = (div, msg, tipo) => {
  let tipos = ["info", "success", "warning", "danger"];
  if (!tipos.includes(tipo)) tipo = "info";
  div.innerHTML = `<span class="label ${tipo}"> ${msg} </span>`;
};

//

/**
 * gerarDataAmanha, retorna um objeto contendo o dia 
 * (número e nome), mes e ano do próximo dia (atual = hoje)
 * 
 * @returns object {
 *  "diaNumero": number, 
 *  "diaNome": string,
 *  "mesNome":string,
 *  "ano": number 
 * }
 */
function gerarDataAmanha() {
  let dthoje = new Date();
  let dtamanha = new Date();
  // seta a data do próximo dia
  dtamanha.setDate(dthoje.getDate() + 1);

  let dia = {
    0: "DOMINGO",
    1: "SEGUNDA-FEIRA",
    2: "TERÇA-FEIRA",
    3: "QUARTA-FEIRA",
    4: "QUINTA-FEIRA",
    5: "SEXTA-FEIRA",
    6: "SÁBADO",
  };

  let mes = {
    0: "JANEIRO",
    1: "FEVEREIRO",
    2: "MARÇO",
    3: "ABRIL",
    4: "MAIO",
    5: "JUNHO",
    6: "JULHO",
    7: "AGOSTO",
    8: "SETEMBRO",
    9: "OUTUBRO",
    10: "NOVEMBRO",
    11: "DEZEMBRO",
  };
  return {
    "diaNumero": dtamanha.getDate(),
    "diaNome": dia[dtamanha.getDay()],
    "mesNome": mes[dtamanha.getMonth()],
    "ano": dtamanha.getFullYear(),
  };
}


Util.gerarTitulo = (titulo) => {
  let dtAmanha = gerarDataAmanha();

  titulo = titulo.replace("{diaNome}", dtAmanha.diaNome);
  titulo = titulo.replace("{diaNumero}", dtAmanha.diaNumero);
  titulo = titulo.replace("{mes}", dtAmanha.mesNome);
  titulo = titulo.replace("{ano}", dtAmanha.ano);
  return titulo;
};


Util.gerarTabela = (div, header, body) => {
  div.innerHTML = "";
  let thead = div.createTHead();
  let row = thead.insertRow();
  for (var i = 0; i < header.length; i++) {
    let headerCell = document.createElement("TH");
    headerCell.innerHTML = header[i];
    row.appendChild(headerCell);
  }

  let tbody = div.createTBody();
  for (var i = 0; i < body.length; i++) {
    row = tbody.insertRow();
    let chaves = Object.keys(body[i]);
    for (var k = 0; k < chaves.length; k++) {
      let cell = row.insertCell();
      cell.innerHTML = body[i][chaves[k]];
    }
  }
};