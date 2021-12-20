const output = document.getElementById("ck-output");  //variabilizzo l'output della risultato della chiamata random
const urlRandom = "https://api.chucknorris.io/jokes/random"; //url per api dela chiamata random

const inputSearch = document.getElementById("ckSearch"); //variabilizzo il bottone
const input = document.getElementById("ckInput"); //variabilizzo l'input 

//object js che ha i parametri per la chiamta, metodo e intestazione
const options = {
  method: 'GET',
  headers: {
    "Accept": "application/json"
  }
};

//viene chiamata all'onclik del bottone e anche al onchage dell'input
function searchFunc() {
  const inputVal = document.getElementById("ckInput").value //variabilizzo il valore inserito dell'input
  const outputSearch = document.getElementById("outputSearch") //variabilizzo l'output della risultato della chiamata di ricerca
  fetch(`https://api.chucknorris.io/jokes/search?query=${inputVal}`, options) //fetch chiamata all'enptoit api, input passiamo  il valore da ricercare.
  .then((res) => {
    return res.json(); //response
  }).then((data) => { //recuperiamo il data che e' la risposta della chiamata, recuperiamo il data nell'object della res
    
    // outputSearch.innerText = data.result.map(value => value.value) //tutte le frasi ma ho avuto problemi con ciclo di P in html
    outputSearch.innerText = data.total > 1 ? data.result[0].value : 'non ho trovato nulla' 
    //stampo nel p. = Verifico se il total che si trova nell'oggetto della response sia > 1 (cosi ho risultati) e prendo il primo risultato dell'array altrimenti restituisco la stringa non ho trovato nulla
})
}

(function ckLoop() { //funzione di loop
  setTimeout(function () { //metodo js
    fetch(urlRandom, options)
        .then((res) => {
          return res.json();
        }).then((data) => {
      output.innerText = data.value; //stampo nel p con id ck-output la risposta della chiamata
    });
    ckLoop() //funziona richiamta
  }, 3000); //3000 = 3000ms = 3s viene eseguita ogni 3 secondi
}());

inputSearch.addEventListener("click", searchFunc);
input.addEventListener("change", searchFunc);