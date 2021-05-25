//Fonction Confirmation de la commande avec affichage du numéro de commande et du prix de la commande
function addConfirmationOrder() {
    const confirmationId = localStorage.getItem("orderConfirmationId");
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.innerHTML =  confirmationId;
    const totalPrice = localStorage.getItem("totalOrder");
    const confirmationPrice = document.getElementById("total-price");
    confirmationPrice.innerHTML = totalPrice + " €";
    localStorage.clear();
}
//Appel de la fonction
addConfirmationOrder()
