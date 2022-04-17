let elInputValue = document.querySelector(".input");
let elform = document.querySelector(".form");
let kinonomi = elInputValue.value;
let elBookList = document.querySelector(".book__list");
let elbookmarklist = document.querySelector(".bookmark__list");

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

 

let elBookTemplate = document.querySelector("#book__template").content;
let elBookmarkTemplate = document.querySelector("#bookmark").content;


function renderBook(array, node) {
console.log("array");
console.log(array);
    node.innerHTML = null;
 let bookFragment = document.createDocumentFragment();
 array.forEach(item => {

       let bookTemplate = elBookTemplate.cloneNode(true)
       bookTemplate.querySelector('.book__img').src = item.volumeInfo.imageLinks.thumbnail;
       bookTemplate.querySelector('.book__name').textContent = item.volumeInfo.title;
       bookTemplate.querySelector('.book__after').textContent = item.volumeInfo.authors;
       bookTemplate.querySelector('.book__after').textContent = item.publishedDate;


       console.log(bookTemplate)
       bookFragment.appendChild(bookTemplate);

   });
   node.appendChild(bookFragment)
}

fu

;( async function (){
    let responce = await fetch(`https://www.googleapis.com/books/v1/volumes?q=java`);
 let data = await responce.json();

 elform.addEventListener("input", function(evt){
    evt.preventDefault();
    let searchInput= elInputValue.value.trim();
    // let pattern = new RegExp(searchInput, "gi")
    let searchBook = data.items.filter(function (item) {
        return item.volumeInfo.title.includes(searchInput)
    })
console.log("aaa");
    console.log(searchBook)
   if(searchInput){
    renderBook(searchBook, elBookList);
    
   }
  
})


})();





// elform.addEventListener("input", function(evt) {
//     evt.preventDefault()
//     let searchInput =  elInputValue.value.trim();
//     let pattern = new RegExp(searchInput, "gi")


//     ;( async function (){
//         let responce = await fetch(`https://www.googleapis.com/books/v1/volumes?q=python`);
//      let data = await responce.json();
    
    
    
//      renderBook(data.items, elBookList);
    
//     })();
// })

