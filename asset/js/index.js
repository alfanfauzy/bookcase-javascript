/**
 * Function to Add Buku
 */
const addBuku = () => {
    const inputTitle = document.getElementById("input-title").value;
    const inputAuthor = document.getElementById("input-author").value;
    const inputYear = document.getElementById("input-year").value;
    const inputIsRead = document.querySelector("#input-is-read");

    const isRead = inputIsRead.checked;

    /** Validation */
    if (inputTitle == "") {
        showAlert("Input title harus diisi");
        return;
    }

    if (inputAuthor == "") {
        showAlert("Input author harus diisi");
        return;
    }

    if (inputYear == "") {
        showAlert("Input year harus diisi");
        return;
    }

    const idBook = generateId();
    const newObjectBook = {
        id: idBook,
        title: inputTitle,
        author: inputAuthor,
        year: inputYear,
        isComplete: isRead,
    };

    books.push(newObjectBook);

    document.getElementById("book-form").reset();

    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveDataToStorage("add");
};

/**
 * Function to Remove Book
 * @param {number} bookId
 * @returns
 */
const removeBook = (bookId) => {
    let confirmation = confirm("Anda yakin akan menghapus data buku ini ?");

    if (confirmation) {
        const getIndexBook = findIndexBook(bookId);

        if (getIndexBook === -1) return;

        books.splice(getIndexBook, 1);

        document.dispatchEvent(new Event(RENDER_BOOKS));
        saveDataToStorage("remove");
    }
};

/**
 * Function to Change Status Book
 * @param {number} bookId
 * @param {boolean} actionChange
 * @returns
 */
const changeBookStatus = (bookId, actionChange) => {
    const bookItem = findBook(bookId);

    if (bookItem === null) return;

    bookItem.isComplete = actionChange;

    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveDataToStorage("changeStatus");
};

/**
 * Function to handle Search Book
 */
const handleSearchBook = () => {
    const valueSearch = document.getElementById("search-input").value.trim();

    if (valueSearch === null || valueSearch === "") {
        showAlert("Input search harus diisi");
        return;
    }

    getDataFromStorageWithSearch(valueSearch);
};

/**
 *
 * @param {{
 * id: number,
 * title: string,
 * author: string,
 * year: number,
 * isComplete: boolean
 * }} objectBook
 */
const showBook = (objectBook) => {
    const { id, title, author, year, isComplete } = objectBook;

    /** Create Wrapper Title */
    const wrapperContentTitle = document.createElement("div");
    wrapperContentTitle.classList.add("wrapper-content-title");

    /** Create Title Element */
    const titleBook = document.createElement("h4");
    titleBook.setAttribute("id", "title-book");
    titleBook.innerHTML = title;

    /** Create Year Element */
    const yearBook = document.createElement("span");
    yearBook.setAttribute("id", "year-book");
    yearBook.innerHTML = `(${year})`;

    /** Append Title and Year to Wrapper Title */
    wrapperContentTitle.append(titleBook, yearBook);

    /** Create Wrapper Item */
    const wrapperItem = document.createElement("div");
    wrapperItem.classList.add("item-book");

    /** Create Wrapper Image Book */
    const wrapperImageBook = document.createElement("div");
    wrapperImageBook.classList.add("wrapper-image-book");

    /** Create Wrapper Content Book */
    const wrapperContentBook = document.createElement("div");
    wrapperContentBook.classList.add("wrapper-content-book");

    /** Create Author Element */
    const authorBook = document.createElement("span");
    authorBook.setAttribute("id", "author-book");
    authorBook.innerText = `by ${author}`;

    /** Create Wrapper Content Action */
    const wrapperContentAction = document.createElement("div");
    wrapperContentAction.classList.add("wrapper-content-action");

    /** Create Button Action */
    const buttonAction = document.createElement("button");
    const textButtonAction = document.createTextNode(
        `${isComplete ? "Belum Dibaca" : "Sudah Dibaca"}`
    );
    buttonAction.appendChild(textButtonAction);

    /** Event Button Action */
    const actionChange = isComplete ? false : true;
    buttonAction.addEventListener("click", function () {
        changeBookStatus(id, actionChange);
    });

    /** Create Button Delete */
    const buttonDelete = document.createElement("button");
    const textButtonDelete = document.createTextNode("Remove");
    buttonDelete.classList.add("delete-button");
    buttonDelete.appendChild(textButtonDelete);

    /** Event Button Delete */
    buttonDelete.addEventListener("click", function () {
        removeBook(id);
    });

    /** Append Button to Wrapper Content Action */
    wrapperContentAction.append(buttonAction, buttonDelete);

    /** Append Title, Author and Content Action to Wrapper Content Book */
    wrapperContentBook.append(
        wrapperContentTitle,
        authorBook,
        wrapperContentAction
    );

    /** Append Image Book and Content Bokk */
    wrapperItem.append(wrapperImageBook, wrapperContentBook);
    wrapperItem.setAttribute("id", `book-${id}`);

    return wrapperItem;
};

document.addEventListener("DOMContentLoaded", function () {
    const saveBook = document.getElementById("book-form");
    const searchBook = document.getElementById("search-button");
    const resetSearch = document.getElementById("reset-button");

    if (isStorageExist()) {
        getDataFromStorage();
    }

    saveBook.addEventListener("submit", function () {
        event.preventDefault();
        addBuku();
    });

    searchBook.addEventListener("click", function () {
        handleSearchBook();
    });

    resetSearch.addEventListener("click", function () {
        if (isStorageExist()) {
            getDataFromStorage();
        }

        document.getElementById("search-input").value = "";
    });
});

document.addEventListener(RENDER_BOOKS, function () {
    const readBook = document.getElementById("list-read-book");
    const unReadBook = document.getElementById("list-unread-book");

    readBook.innerHTML = "";
    unReadBook.innerHTML = "";

    for (const book of books) {
        const getElement = showBook(book);
        if (!book.isComplete) {
            unReadBook.appendChild(getElement);
        } else {
            readBook.appendChild(getElement);
        }
    }
});

document.addEventListener(SAVED_EVENT, function () {});
