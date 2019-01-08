function insert(num) {
    document.getElementById("text").value = document.getElementById("text").value + num;
}
function egal() {
    var exp = document.getElementById("text").value;
    if (exp) {
        document.getElementById("text").value = eval(document.getElementById("text").value)
    }
}
function stergeTot() {
    document.getElementById("text").value = "";
}
function sterge(){
    var exp = document.getElementById("text").value;
    document.getElementById("text").value = exp.substring(0,exp.length - 1);
}