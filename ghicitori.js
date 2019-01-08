var ghicitori = [
    "Multi sportivi o indragesc; De ce oare o lovesc?",
    "N-are maini si totusi bate,\n Bate-ntruna zi si noapte. Sade oriunde l-ai pune, De-l privesti timpul iti spune.",
    "Cine are dinti multi si nu poate musca?",
    "Tin cerneala-n rezervor Ca sa poti scrie usor.",
    "N-are culoare,N-are miros; Dar la toti E de folos",
    "Am doi frati Cu sfori legati Si-n picioare încaltati",
    "Care cer n-are stele?"
];
var raspunsuri = [
    "mingea",
    "ceasul",
    "pieptenele",
    "stiloul",
    "aerul",
    "bocanci",
    "cerul gurii"
];
var primaGhicitoare = "Lumina prin ce trece si nu se opreste?";
var primulRaspuns = "geamul";
var indexGhicitori = [];
var k = 0;
var nr = 0;
var scor = 0;
var raspunsAfisat = false;
function addListeners() {
    document.getElementById("butonGhicitoare").addEventListener("click", genereazaGhicitoare);
    document.getElementById("butonReset").addEventListener("click", reseteazaGhicitori);
    document.getElementById("submit").addEventListener("click", raspunde);
    document.getElementById("afiseazaRaspuns").addEventListener("mouseover", afiseazaRaspuns);
    document.getElementById("afiseazaRaspuns").addEventListener("mouseout", ascundeRaspuns);
}
function genereazaGhicitoare() {
    document.getElementById("raspuns").value = "";
    document.getElementById("gresit").firstChild.textContent = "";
    raspunsAfisat = false;
    if (k > 0) {
        document.getElementById("gresit").firstChild.textContent = "";
    }
    if (k < 7) {
        nr = Math.floor(Math.random() * 7);
        while (indexGhicitori.includes(nr)) {
            nr = Math.floor(Math.random() * 7);
        }
        indexGhicitori[k++] = nr;
        document.getElementById('ghicitoare').innerHTML = ghicitori[nr];
    }
    else {
        alert("Ghicitorile au fost epuizate!");
        if (scor == 1) {
            alert("Ai ghicit un raspuns!");
            
        }
        else { alert("Ai ghicit " + scor + " raspunsuri!"); }
    }
}
function raspunde() {
    var raspuns = document.getElementById('raspuns').value;
    if (document.getElementById('ghicitoare').textContent == primaGhicitoare) {
        if (raspuns == primulRaspuns) {
            document.getElementById("gresit").firstChild.textContent = "Raspuns corect! :)";
            if (raspunsAfisat == false) {
                scor++;
            }
        }
        else {
            document.getElementById("gresit").firstChild.textContent = "Raspuns gresit! :(";
        }
    }
    else {
        if (raspuns == raspunsuri[nr]) {
            document.getElementById("gresit").firstChild.textContent = "Raspuns corect! :)";
            if (!raspunsAfisat) {
                scor++;
            }
        }
        else {
            document.getElementById("gresit").firstChild.textContent = "Raspuns gresit! :(";
        }
    }
}
function reseteazaGhicitori() {
    k = 0;
    scor = 0;
    nr = 0;
    document.getElementById("raspuns").value = "";
    document.getElementById("ghicitoare").innerHTML = "Lumina prin ce trece si nu se opreste?";
    document.getElementById("gresit").firstChild.textContent = "";
    indexGhicitori = [];
}
function afiseazaRaspuns() {
    raspunsAfisat = true;
    console.log("afiseaza raspuns atins");
    if (document.getElementById('ghicitoare').textContent == primaGhicitoare) {
        document.getElementById('afiseazaRaspuns').innerHTML = primulRaspuns;
    }
    else {
        document.getElementById('afiseazaRaspuns').innerHTML = raspunsuri[nr];
    }
}
function ascundeRaspuns() {
    document.getElementById('afiseazaRaspuns').innerHTML = "Pune mouse-ul deasupra acestui text pentru a descoperi raspunsul";
}
window.onload = addListeners;