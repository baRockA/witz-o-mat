const jokes = document.getElementById("jokelist");
const controls = document.getElementById("control");

function toggleControls() {
    let d = controls.style.display;
    if (d === "none") {
        controls.style.display = "block";
    } else {
        controls.style.display = "none";
    }
}

function showJoke(witztxt) {
    jokes.innerHTML += '<li>' + witztxt + '</li>';
}

function clearJokes() {
    //Dialog mit Ja/Nein -> true/false als Rückgabewert
    let q = confirm("Witze wirklich löschen?");
    if (q === true) {
        jokes.innerHTML = "";
    }
}

function moreJokes() {
    const nelement = document.getElementById("amount");
    let nvalue = nelement.value;
    let n = Number(nvalue);
    if (n > 0) {
        nelement.style.border = "none";
        for (let i = 0; i < n; i++) {
            getJoke();
        }
    } else {
        nelement.style.border = "3px solid red";
    }
}

function getJoke() {
    //Fetch-API zum Abruf eines neuen Chuck Norris Witzes aus dem Internet.
    //Möglichst kurz geschrieben --> Müsst ihr nicht verstehen ;-)
    fetch('https://api.chucknorris.io/jokes/random').then(response => {
        return response.json();
    }).then(data => {
        //Funktion showJoke wird aufgerufen
        showJoke(data.value);
    });
}