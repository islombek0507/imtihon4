let elInputValue = document.querySelector(".input");
let elform = document.querySelector(".form");
let kinonomi = elInputValue.value;
let elBookList = document.querySelector(".book__list");
let elbookmarklist = document.querySelector(".bookmark__list");
let elBookCount = document.querySelector(".book__count");
let elNoFound = document.querySelector(".noFound");

// book
let elBookImg = document.querySelector(".book__img");
let elBookName = document.querySelector(".book__name");
let elBookAfter = document.querySelector(".book__after");
let elBookYear = document.querySelector(".book__year");

// bookmark
let elBookmarkName = document.querySelector(".bookmark__name");
let elBookmarkAfter = document.querySelector(".bookmark__after");
let elBookmarkRead = document.querySelector(".bookmark__read");
let elBookmarkDel = document.querySelector(".bookmark__del");

let elBookmarkBtn = document.querySelector(".btn__bookmark");
let elReadBook = document.querySelector(".book__read");
let elMoreBook = document.querySelector(".more__info");
let elOrderBook = document.querySelector(".order__btn");

let elBookTemplate = document.querySelector("#book__template").content;
let elBookmarkTemplate = document.querySelector("#bookmark").content;


function renderBook(array, node) {
   
    node.innerHTML = null;
    let bookFragment = document.createDocumentFragment();
    array?.items?.forEach(item => {

        let bookTemplate = elBookTemplate.cloneNode(true)
        bookTemplate.querySelector('.book__img').src = item?.volumeInfo?.imageLinks?.thumbnail;
        bookTemplate.querySelector('.book__name').textContent = item?.volumeInfo?.title;
        bookTemplate.querySelector('.book__after').textContent = item?.volumeInfo?.authors;
        bookTemplate.querySelector('.book__year').textContent = item?.volumeInfo?.publishedDate;
        bookTemplate.querySelector('.book__read').href = item?.volumeInfo?.previewLink;
        
        bookTemplate.querySelector('.btn__bookmark').dataset.bookId = item?.id;


       
        bookFragment.appendChild(bookTemplate);
        elBookCount.textContent = array?.totalItems;
       

    });
    if (array.totalItems==0) {
        elNoFound.textContent = "Malumot Topilmadi"

    }
    node.appendChild(bookFragment)
}




elform.addEventListener("input", function (evt) {
    evt.preventDefault()

    let searchInput = elInputValue.value.trim();
    let pattern = new RegExp(searchInput, "gi") || 'No books found';
    ;(async function () {
        let responce = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pattern}`)
    let data =  await responce.json();
   
    renderBook(data, elBookList)
    })();
    
});

elOrderBook.addEventListener("click", function(evt) {
    evt.preventDefault()
console.log("sss")
    let searchInput = elInputValue.value.trim();
    let pattern = new RegExp(searchInput, "gi") || 'No books found';
    ;(async function () {
        let responce = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pattern}&orderBy=newest`)
    let data =  await responce.json();
    console.log("aloo");
    renderBook(data, elBookList);
    })(); 
});



function renderbookmark(array, node) {
    node.innerHTML = null;
    let elFragment = document.createDocumentFragment();

    array.forEach(item => {
        let bookmarkTemplate = elBookmarkTemplate.cloneNode(true);
        bookmarkTemplate.querySelector('.bookmark__name').textContent = item?.volumeInfo?.title;
        bookmarkTemplate.querySelector('.bookmark__after').textContent = item?.volumeInfo?.authors;
        bookmarkTemplate.querySelector('.bookmark__read').href = item?.volumeInfo?.previewLink;
        bookmarkTemplate.querySelector('.bookmark__del').dataset.markId = item?.id;
        elFragment.appendChild(bookmarkTemplate);
    })
        node.appendChild(elFragment);
}



let storage = window.localStorage;
let getItemLocalStorage = JSON.parse(storage.getItem("bookArray"))
let bookmarkArray =getItemLocalStorage || [];

elBookList.addEventListener("click", evt =>{
    let booksId = evt.target.dataset.bookId;

    let searchInput = elInputValue.value.trim();
    let pattern = new RegExp(searchInput, "gi") || 'No books found';

    ;(async function () {
        let responce = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pattern}&orderBy=newest`)
    let data =  await responce.json();
    
    renderBook(data, elBookList);
    
    let foundBook = data.items.find(item=> item.id == booksId);
    let Include = bookmarkArray.findIndex(item=> item?.id===foundBook?.id)
    
    if (Include===-1) {
        bookmarkArray.push(foundBook);
       storage.setItem("bookArray", JSON.stringify(bookmarkArray))
        renderbookmark(bookmarkArray, elbookmarklist)
    }
})(); 

})
elbookmarklist.addEventListener("click", function (evt) {
    let removeBookId = evt.target.dataset.markId;

    if (removeBookId) {
        let indexOfBook = bookmarkArray.findIndex(function (item) {
            return item.id =removeBookId.id;
        })
        bookmarkArray.splice(indexOfBook, 1)

        storage.setItem("bookArray", JSON.stringify(bookmarkArray))
        renderbookmark(bookmarkArray, elbookmarklist)
    }
})




