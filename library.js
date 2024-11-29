const myLibrary = [];

function Book(title, author, year, pages, status) {
    this.title= title;
    this.author= author;
    this.year= year;
    this.pages= pages;
    this.status= status;
}

Book.prototype.toggleReadStatus = function () {
    this.status =!this.status;
};

const book1 = new Book("Fourth Wing", "Rebecca Yarros", 2023, 528, true);
myLibrary.push(book1);
const book2 = new Book("Iron Flame", "Rebecca Yarros", 2023, 623, true);
myLibrary.push(book2);

function addBookToLibrary(title, author, year, pages, status) {
    var book = new Book(title, author, year, pages, status);
    myLibrary.push(book);
}

console.log(myLibrary)

//Create function to display added book to page
const bookcontainer = document.querySelector(`.book-container`);
function displayBook() {
    bookcontainer.innerHTML = ``;

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement(`div`);
        bookCard.classList.add(`book-card`);

        const title = document.createElement(`div`);
        const author = document.createElement(`div`);
        const year = document.createElement(`div`);
        const pages = document.createElement(`div`);
        const read = document.createElement(`div`);
        const toggleReadButton = document.createElement(`button`);
        const deleteButton = document.createElement(`button`);

        title.textContent = `${book.title}`;
        author.textContent = `Author: ${book.author}`;
        year.textContent = `Year Published: ${book.year}`;
        pages.textContent = `Number of Pages: ${book.pages}`;
        read.textContent = `Has been read? : ${book.status ? 'Yes' : 'No'}`;
        toggleReadButton.textContent = `Read`;
        deleteButton.textContent = `Remove`;

        toggleReadButton.classList.add(`toggleButton`);
        deleteButton.classList.add(`deleteButton`);
        title.classList.add(`title`);

        // Add event listeners to buttons
        toggleReadButton.addEventListener(`click`, () => {
            book.toggleReadStatus();
            displayBook();
        });

        deleteButton.addEventListener(`click`, () => {
            myLibrary.splice(index, 1);
            displayBook();
        });

        bookCard.append(title, author, year, pages, read, toggleReadButton, deleteButton);
        bookcontainer.append(bookCard);
    });
}


displayBook();

//Event listeners to open a dialog modal when the 'Add Book' button is pressed
const dialog = document.getElementById(`dialog`);
const closeDialogButton = document.getElementById(`close-dialog`);
const openDialogButton = document.getElementById(`open-dialog`);

openDialogButton.addEventListener(`click`, () => {
    dialog.showModal();
})

closeDialogButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    dialog.close();
})

const form = document.getElementById(`book-form`);


//Event listener to form to add new book to bookContainer
form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const title = document.getElementById(`book-title`).value;
    const author = document.getElementById(`book-author`).value;
    const year = document.getElementById(`book-year`).value;
    const pages = document.getElementById(`book-pages`).value;
    const hasBeenRead = document.getElementById(`book-read`).checked;

    addBookToLibrary(title, author, parseInt(year, 10), parseInt(pages, 10), hasBeenRead);
    displayBook();

    form.reset();
    dialog.close();
})