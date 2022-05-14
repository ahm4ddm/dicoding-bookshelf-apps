let modal = document.getElementById("myModal");
let btn = document.getElementById("addBtn");
let cls = document.getElementsByClassName("close")[0]
let btnUndo = document.getElementById("undoToFinished");

btn.onclick = function(){
    modal.style.display = "block";
}
cls.onclick = function(){
    modal.style.display = "none";
}
