const myLibrary = [];

function Book(name, author, pages, readed, id) {
  if (!new.target) {
    throw Error("Must use the new operator to call the function");
  }

  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
  this.id = id;
}

function addBookToLibrary(name, author, pages, readed) {
  const randomUUID = crypto.randomUUID();
  const newBook = new Book(name, author, pages, readed, randomUUID);
  myLibrary.push(newBook);
}

function renderBook() {
  const books = document.querySelector(".books");

  while (books.firstChild) books.removeChild(books.firstChild);

  myLibrary.forEach((book) => {
    const divBook = document.createElement("div");
    const pName = document.createElement("p");
    const pAuthor = document.createElement("p");
    const pPages = document.createElement("p");
    const pReaded = document.createElement("p");

    pName.textContent = book.name;
    pAuthor.textContent = book.author;
    pPages.textContent = book.pages;
    pReaded.textContent = book.readed === "true" ? "Readed" : "Not readed";

    divBook.append(pName, pAuthor, pPages, pReaded);
    books.appendChild(divBook);
  });
}

const dialog = document.querySelector("dialog");
const dialogAddBookBtn = document.querySelector(".add-book-btn-dialog");
const cancelBookBtn = document.querySelector(".cancel-book-btn");
const addBookBtn = document.querySelector(".add-book-btn");

dialogAddBookBtn.addEventListener("click", function () {
  dialog.showModal();
});

cancelBookBtn.addEventListener("click", function (event) {
  event.preventDefault();
  dialog.close();
});

addBookBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const bookName = document.querySelector("#name");
  const bookAuthor = document.querySelector("#author");
  const bookPages = document.querySelector("#pages");
  const bookReaded = document.querySelector("#readed");

  const bnv = bookName.value;
  const bav = bookAuthor.value;
  const bpv = bookPages.value;
  const brv = bookReaded.value;

  if (bnv && bav && bpv) {
    addBookToLibrary(bnv, bav, bpv, brv);
    dialog.close();
    renderBook();
  } else {
    alert("Please fill in the fields");
  }
});

addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", "96", "true");
addBookToLibrary("I Want to Eat Your Pancreas", "Yoru Sumino", "260", "false");

renderBook();
