const apilist = document.getElementById("apilist");
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
    controls.style.display = "none";
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
    let url = apilist.value;
    if (url) {
        apilist.style.border = "none";
        //Fetch-API zum Abruf eines neuen Chuck Norris Witzes aus dem Internet.
        //Möglichst kurz geschrieben --> Müsst ihr nicht verstehen ;-)
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            //Funktion showJoke wird aufgerufen
            if (data.value){
                showJoke(data.value);
            } else if (data.text) {
                showJoke(data.text);
            } else if(data.setup && data.punchline){
                showJoke(data.setup+"...<em>"+data.punchline+"</em>")
            }
        });
    } else {
        apilist.style.border = "3px solid red";
    }
}