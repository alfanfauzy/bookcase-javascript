/**
 * Function to check if storage availble or not
 * @returns
 */
const isStorageExist = () => {
    if (typeof Storage === undefined) {
        showAlert("Browser ini tidak didukung dengan Storage");
        return false;
    }

    return true;
};

/**
 * Function to Generate Unique Id
 * @returns
 */
const generateId = () => {
    return Date.now();
};

/**
 *
 * @param {number} bookId
 * @returns
 */
const findBook = (bookId) => {
    for (const book of books) {
        if (book.id === bookId) {
            return book;
        }
    }

    return null;
};

/**
 *
 * @param {number} bookId
 * @returns
 */
const findIndexBook = (bookId) => {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }

    return -1;
};
