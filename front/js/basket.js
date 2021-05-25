//Fonction Création du HTML du panier à partir des données des articles choisis
function createBasket(itemCamera,basketContent) {
    let addProductBasket = document.getElementById('addProduct');   
    let trBasket = document.createElement('tr');
    addProductBasket .appendChild(trBasket);
    trBasket.id ="trBasket";
       
    let tdCamera = document.createElement('td'); 
    trBasket.appendChild(tdCamera);
    let pictureCamera =document.createElement('img');
    tdCamera.appendChild(pictureCamera);
    pictureCamera.setAttribute("width","200px")
    pictureCamera.classList.add("img-thumbnail",'text-center');
    pictureCamera.src = itemCamera.imageUrl;

    let nameCamera = document.createElement('td');
    trBasket.appendChild(nameCamera);
    nameCamera.classList.add('text-center')
    nameCamera.textContent = itemCamera.name;

    let qtyCamera = document.createElement('td');
    trBasket.appendChild(qtyCamera);
    qtyCamera.classList.add('text-center')
    qtyCamera.textContent = basketContent[i].selectQty;

    let priceCamera = document.createElement('td');
    trBasket.appendChild(priceCamera);
    priceCamera.classList.add('text-center')
    priceCamera.textContent = itemCamera.price*basketContent[i].selectQty/100 +" €";
    priceCamera.id="priceByQty";
}    
//Fonction affichage de la page quand le panier est vide
function noBasket(){
    let buttonDelete = document.getElementById("btn-empty");
    let totalPrice = document.getElementById('totalPrice');
    let tableProduct = document.getElementById('tableProduct'); 
    let form = document.getElementById ('form')
    buttonDelete.classList.add("d-none");
    tableProduct.classList.add("d-none");
    form.classList.add("d-none");
    totalPrice.textContent ="Votre panier est vide";
    totalPrice.classList.add("col-md-6","border","background-color","rounded" ,"mx-auto","my-5", "py-5", "text-center")
}

//Tableau de stockage du prix * quantité pour chaque caméra
let arrayPrice = [];

//Fonction Calcul du prix*quantité et ajout au tableau de stockage
function addItemPrice(itemCamera,basketContent) {
    let itemPrice = itemCamera.price/100 * basketContent[i].selectQty;  
    console.log("itemprice",itemPrice)  
    arrayPrice.push(itemPrice);
    console.log("test prix par quantité pour chaque ligne",itemPrice)
}

//Fonction Montant total de la commande
function totalPriceOrder(arrayPrice) {
    let totalPrice = document.getElementById('totalPrice');    
    let total = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        total += arrayPrice[i];
        totalPrice.textContent = "Montant total de votre panier : " + total + " €";      
        console.log("prix total",total)
         //Stockage du prix dans le localStorage pour la page de confirmation
        localStorage.setItem("totalOrder", JSON.stringify(total));       
    }
}
//Requête API et récupération des données du localStorage pour création du panier et du montant total du panier
const getBasket = async function(){  
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            // Récupération contenu du panier en localstorage
            let basketContent = JSON.parse(localStorage.getItem("allEntries"))
            console.log('contenu du localstorage',basketContent);
            if(localStorage.length>0){
                for (i = 0; i < basketContent.length; i++) {
                    let itemCamera = cameras.find(cameras => cameras['_id'] == basketContent[i].idCamera);
                    console.log("résultat recherche cam choisie par l'ID",itemCamera);
                    createBasket(itemCamera, basketContent);
                    addItemPrice(itemCamera,basketContent); 
                }
                    totalPriceOrder(arrayPrice);
            }else{
                noBasket();
            }
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    }
    catch (e) { 
        console.log(e);
    }
}
//Suppression des éléments du panier et du localStorage
function emptyBasket(){
    let buttonDelete = document.getElementById("btn-empty");
    buttonDelete.addEventListener('click', function(){
      localStorage.removeItem("allEntries"); 
      localStorage.removeItem("totalOrder");  
      console.log("votre panier est vide");  
      noBasket()
})
}
//Requête POST pour envoyer l'objet Contact et le tableau products à l'API et récupération du numéro de commande et stockage dans le localStorage
let email = document.getElementById('mail'); 
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let address = document.getElementById('address')
let city = document.getElementById('city')

  async function postForm(dataToSend ) {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: dataToSend ,
        });
        if (response.ok) {
            let responseId = await response.json();
            let orderId = responseId.orderId;
             console.log(orderId);
            localStorage.setItem("orderConfirmationId", orderId);
            window.location.href = "confirm.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
//Validation de la commande et envoi de l'objet contact et du tableau product à l'API
function submitForm(){
  const form = document.querySelector("#form");
  let basketContent = JSON.parse(localStorage.getItem("allEntries"));
  form.addEventListener("submit", function(e){
    e.preventDefault(); 
    //Récupération des données du formulaire dans l'objet contact
    const contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    } 
    //Ajout des id des articles choisis dans le tableau products
    const products = [];
    basketContent.forEach(product =>{
        products.push(product.idCamera) 
        console.log("products",products)
    }) 
    console.log({"contact":contact,"products": products});
    let dataToSend = JSON.stringify({contact,products});
    postForm(dataToSend )
  })
}
//Appels des fonctions 
getBasket()
submitForm()
emptyBasket()


