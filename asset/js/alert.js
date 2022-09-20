/**
 *
 * @param {string} contentMessage
 */
const showAlert = (contentMessage) => {
    const alertElement = document.getElementById("snackbar");

    alertElement.innerHTML = `<p>${contentMessage}</p>`;
    alertElement.className = "show";

    setTimeout(function () {
        alertElement.className = alertElement.className.replace("show", "");
    }, 3000);
};
