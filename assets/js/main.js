function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function createBook(param1){
    if(checkForStorage()){
        let bookDatas = [];
        if(localStorage.getItem(LOCAL_STORAGE_KEY) === null){
            bookDatas = [];
        }else{
            bookDatas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        }
        bookDatas.unshift(param1);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookDatas));
    }
}

function readBook(){
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    }else{
        return [];
    }
}

function updateBook(id){
    const book = readBook().filter(i => i.id == id);
    const bookDetail = readBook().filter(j => j.id != id);
    let notif = confirm("Apakah Anda ingin mengedit buku "+`${book[0].title}`+"?");
    if(notif == true){
        let updateJ = prompt("Masukkan judul");
        let updateP = prompt("Masukkan penulis");
        let updateT = prompt("Masukkan tahun")
        if(!isNaN(updateT)){
        const editBook = {
            id: book[0].id,
            title: updateJ,
            author: updateP,
            year: updateT,
            isComplete: book[0].isComplete
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookDetail));
        createBook(editBook);
        location.reload();
        }else{
            alert("Masukkan tahun hanya dengan angka!")
        }

    }
}

function deleteBook(id){
    const book = readBook().filter(i => i.id == id);
    const bookDetail = readBook().filter(j => j.id != id);
    let notif = confirm("Apakah Anda yakin ingin menghapus buku "+`${book[0].title}`+"?");
    if(notif == true){
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookDetail));
        location.reload();
    }
}

function showBook(){
    const books = readBook();
    const detailIncomplete = document.querySelector("#notCompletedDetail");
    const detailComplete = document.querySelector("#completedDetail");
    books.forEach(book => {
        if(book.isComplete == false){      
            let row = document.createElement("tr");
            row.innerHTML = "<td>" + `${book.title}` + "</td>";
            row.innerHTML += "<td>" + `${book.author}` + "</td>";
            row.innerHTML += "<td>" + `${book.year}` + "</td>";
            row.innerHTML += "<td>" + 
                                    "<i class='fa-solid fa-check' onclick='changeToFinished("+`${book.id}`+")'></i>" + 
                                    "<i class='fa-solid fa-pen-to-square' onclick='updateBook("+`${book.id}`+")'></i>" +  
                                    "<i class='fa-solid fa-trash' onclick='deleteBook("+`${book.id}`+")'></i>" + 
                             "</td>";
            detailIncomplete.appendChild(row);
        }else{
            let row = document.createElement("tr");
            row.innerHTML = "<td>" + `${book.title}` + "</td>";
            row.innerHTML += "<td>" + `${book.author}` + "</td>";
            row.innerHTML += "<td>" + `${book.year}` + "</td>";
            row.innerHTML += "<td>" + 
                                    "<i class='fa-solid fa-rotate-left' onclick='undoToFinished("+`${book.id}`+")'></i>" + 
                                    "<i class='fa-solid fa-pen-to-square' onclick='updateBook("+`${book.id}`+")'></i>" +
                                    "<i class='fa-solid fa-trash' onclick='deleteBook("+`${book.id}`+")'></i>" + 
                             "</td>";
            detailComplete.appendChild(row);
        }
    });
}

function changeToFinished(id){
    const book = readBook().filter(i => i.id == id);
    const bookDetail = readBook().filter(j => j.id != id);
    const checkBook = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        year: book[0].year,
        isComplete: true
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookDetail));
    createBook(checkBook);
    location.reload();
}

function undoToFinished(id){
    const book = readBook().filter(i => i.id == id);
    const bookDetail = readBook().filter(j => j.id != id);
    const undoBook = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        year: book[0].year,
        isComplete: false
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookDetail));
    createBook(undoBook);
    location.reload();
}

function searchBook(books){
    let resSearch = document.querySelector("#resultSearch");
    books.forEach(book => {
        let row = document.createElement("div");
        row.innerHTML = "Judul: "+ `${book.title}` +"<br>";
        row.innerHTML += "Pemilik: " +`${book.author}` +"<br>";
        row.innerHTML += "Tahun: " + `${book.year}` +"<br>";
        row.innerHTML += "<i class='fa-solid fa-check' onclick='changeToFinished("+`${book.id}`+")'></i>" + 
                                "<i class='fa-solid fa-pen-to-square' onclick='updateBook("+`${book.id}`+")'></i>" +  
                                "<i class='fa-solid fa-trash' onclick='deleteBook("+`${book.id}`+")'></i>";
        resSearch.appendChild(row);
        btnSearch.setAttribute("disabled", "disabled")
    });
}