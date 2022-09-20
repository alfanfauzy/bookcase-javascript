/**
 * Function to Handle Get Data with value search
 * @param {string} valueSearch
 */
const getDataFromStorageWithSearch = (valueSearch) => {
    const getData = localStorage.getItem(STORAGE_KEY);

    let datas = JSON.parse(getData);

    if (datas !== null) {
        books.length = 0;
        const getBook = datas
            .map((book) => {
                return book;
            })
            .filter((book) => {
                if (book.title.toLowerCase() === valueSearch.toLowerCase()) {
                    books.push(book);
                }
            });

        if ((getBook.length = 0)) {
            showAlert("Data tidak ditemukan");
        }
    }

    document.dispatchEvent(new Event(RENDER_BOOKS));
};

/**
 * Function to Handle Get All Data
 */
const getDataFromStorage = () => {
    const getData = localStorage.getItem(STORAGE_KEY);

    let datas = JSON.parse(getData);

    books.length = 0;
    if (datas !== null) {
        for (const book of datas) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_BOOKS));
};

/**
 * Function to Handle Save Data to Storage
 */
const saveDataToStorage = (status) => {
    if (isStorageExist()) {
        const parseBook = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parseBook);

        switch (status) {
            case "add":
                showAlert("Berhasil menyimpan");
                break;
            case "changeStatus":
                showAlert("Berhasil memindahkan");
                break;
            case "remove":
                showAlert("Berhasil menghapus");
                break;
            default:
                break;
        }

        document.dispatchEvent(new Event(SAVED_EVENT));
    }
};
