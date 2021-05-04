///// ///// ///// ///// PAGE PANIER ////// ///// ///// /////

//////////////////////////////DECLARATION DES VARIABLES NECESSAIRES///////////////////////////////////////////

///////Création d'un tableau de stockage des prix
const arrayPrice = [];
//////Création du tableau qui va être envoyé au serveur avec les id des caméras
let products = [];
//////Création de l'objet contact contenant les données du formulaire qui va être envoyé au serveur
let contact = {};
//////Création d'une classe pour structurer l'objet contact
class ContactData {
    constructor(name, surname, adress, city, email) {
        this.firstName = name;
        this.lastName = surname;
        this.address = adress;
        this.city = city;
        this.email = email;
    }
}

/////////////////////////////MISE EN PLACE DU PANIER///////////////////////////////////////////////////////

//Création de la trame HTML du panier à partir des données des articles choisis
function createBasket(itemCamera, basketContent) {
    let mainBasket = document.getElementById('basket-content');
    // console.log(mainBasket)
    mainBasket.classList.add("my-3");

    let divBasket = document.createElement('div');
    //Ajouter attribut ID
    mainBasket.appendChild(divBasket);
    divBasket.classList.add('basketContentToClear');
    divBasket.classList.add("d-flex", "flex-row", "justify-content-between", "my-2", "px-1", "bold");

    let nameCamera = document.createElement('p');
    divBasket.appendChild(nameCamera);
    nameCamera.textContent = itemCamera.name;

    let lenseCamera = document.createElement('p');
    divBasket.appendChild(lenseCamera);
    lenseCamera.textContent = basketContent[i].selectedLenses;

    let priceCamera = document.createElement('p');
    divBasket.appendChild(priceCamera);
    priceCamera.textContent = itemCamera.price;
    priceCamera.classList.add("price");
}

//Tableau de prix des articles choisis
function addItemPrice(itemCamera) {
    let itemPrice = itemCamera.price;
    arrayPrice.push(itemPrice);
}

//Ajout des id des articles choisis dans le tableau products
function addIdProducts(basketContent) {
    products.push(basketContent[i].idCamera);
}

//Prix total de la commande 
function totalPriceOrder(arrayPrice) {
    let totalPrice = document.getElementById('total-price');
    let total = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        total = total + arrayPrice[i];
        totalPrice.textContent = "Prix total : " + total + "$";
        //Stockage du prix dans le localStorage pour la page de confirmation
        localStorage.setItem("totalOrder", JSON.stringify(total));
    }
}

// Création du panier
async function getBasket() {
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            // Récupérer le bon objet dans l'api
            let basketContent = JSON.parse(localStorage.getItem("basketContent")) || {};

            for (i = 0; i < basketContent.length; i++) {
                let itemCamera = cameras.find(cameras => cameras['_id'] == basketContent[i].idCamera);
                console.log(itemCamera);
                createBasket(itemCamera, basketContent);
                addItemPrice(itemCamera);
                addIdProducts(basketContent);
            }
            totalPriceOrder(arrayPrice);

        } else {
            console.error('Retour du serveur : ', response.status);
        }
    }
    catch (e) {
        console.log(e);
    }
}


//////////////////////////////////////////SUPPRESSION DES ARTICLES CHOISIS///////////////////////////////////

// Supprimer le contenu du panier
function deleteBasket() {
    let divButtonClear = document.getElementById('button-clear-basket');
    let buttonClearBasket = document.createElement("button");

    divButtonClear.appendChild(buttonClearBasket);
    buttonClearBasket.classList.add("btn", "btn-warning", "block-right");
    buttonClearBasket.textContent = "Vider le panier";

    buttonClearBasket.addEventListener('click', function () {
        localStorage.removeItem('basketContent');
        localStorage.removeItem('totalOrder');
        let mainBasket = document.getElementById('basket-content');
        while (mainBasket.firstChild) {
            mainBasket.removeChild(mainBasket.firstChild);
            let totalPrice = document.getElementById('total-price');
            totalPrice.textContent = "Prix total : 0 $";
        }

    })
}


/////////////////////////////////////VALIDATION DU FORMULAIRE ET ENVOIE DU FORMULAIRE ET DE CONTACT ET PRODUCT A L'API/////////////

//Récupération de l'id de commande renvoyée par l'API et stockage dans le localStorage
function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

//Récupération des données du formulaire dans l'objet contact
function getForm() {
    let firstname = document.getElementById('firstName').value;
    let lastname = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    contact = new ContactData(firstname, lastname, address, city, email);
}

//Requête POST pour envoyer l'objet Contact et le tableau products à l'API
async function postForm(dataToSend) {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: dataToSend,
        });
        if (response.ok) {
            let responseId = await response.json();
            getOrderConfirmationId(responseId);
            window.location.href = "confirm.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

//Validation de la commande et envoie de l'objet contact et du tableau product à l'API
function confirmationOrder() {
        getForm();
        dataToSend = JSON.stringify({ contact, products });
        console.log(dataToSend);
        postForm(dataToSend);
}

//Validation des données du formulaire
function validateForm() {
    let buttonValidation = document.getElementById('btn-validation');
     buttonValidation.addEventListener('click', function () {
        let firstname = document.getElementById('firstName').value;
        let lastname = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        if (firstname, lastname, address, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            confirmationOrder();
            return true;
        } else {
            alert("Merci de remplir tous les champs");
            return false;
        }
})
}

///////////////////////////APPEL DES FONCTIONS///////////////////////////////////////
getBasket();
deleteBasket();
validateForm();

