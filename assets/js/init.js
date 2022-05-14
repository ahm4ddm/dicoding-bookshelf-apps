//init 
const LOCAL_STORAGE_KEY = "BOOKS";
const inpJudul = document.getElementById("judul");
const inpPenulis = document.getElementById("penulis");
const inpTahun = document.getElementById("tahun");
const formInp = document.getElementById("inpBuku");
const btnSearch = document.getElementById("searchB");

formInp.addEventListener("submit", function(event){
    const insertBook = {
        id: +new Date(),
        title: inpJudul.value,
        author: inpPenulis.value,
        year: inpTahun.value,
        isComplete: false
    }
    createBook(insertBook);
    showBook();
});

window.addEventListener("load", function(){
    if(checkForStorage()){
        if(localStorage.getItem(LOCAL_STORAGE_KEY) !== null){
            showBook();
        }
    }
});

btnSearch.addEventListener("click", function(event){
    const inpSearch = document.getElementById("searchI").value;
    const getJudul = readBook().filter(i => i.title == inpSearch);
    searchBook(getJudul);
});
