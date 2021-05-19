
//-------------------------------Affichage du panier---------------------------------------//

//Création du HTML du panier à partir des données des articles choisis

function createBasket(itemCamera,existingEntries) {
    
  
    let addProductBasket = document.getElementById('addProduct');    

    let trBasket = document.createElement('tr');
    addProductBasket.appendChild(trBasket);
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

   /*  let lenseCamera = document.createElement('td');
    trBasket.appendChild(lenseCamera);
    lenseCamera.classList.add('text-center')
    lenseCamera.textContent = existingEntries[i].selectedLense;  */

    let qtyCamera = document.createElement('td');
    trBasket.appendChild(qtyCamera);
    qtyCamera.classList.add('text-center')
    qtyCamera.textContent = existingEntries[i].selectQty;

    let priceCamera = document.createElement('td');
    trBasket.appendChild(priceCamera);
    priceCamera.classList.add('text-center')
    priceCamera.textContent = itemCamera.price*existingEntries[i].selectQty/100 +" €";
    priceCamera.id="priceByQty";

   /*  let tdBasket = document.createElement('td');
    trBasket.appendChild(tdBasket);
    tdBasket.classList.add('text-center');
    let buttonBasket = document.createElement("button");
    tdBasket.appendChild(buttonBasket);
    buttonBasket.id ="buttonBasket";

    let pictoBasket = document.createElement("img");
    buttonBasket.appendChild(pictoBasket);
    pictoBasket.src= "images/trash.svg"; */

    
}

//Tableau de stockage du prix * quantité pour chaque caméra

let arrayPrice = [];

//Calcul du prix*quantité et ajout au tableau de stockage 

function addItemPrice(itemCamera,existingEntries) {
    let itemPrice = itemCamera.price/100 * existingEntries[i].selectQty;  
    console.log("itemprice",itemPrice)  
    arrayPrice.push(itemPrice);
    console.log("test prix par quantité pour chaque ligne",itemPrice)
}

//Montant total de la commande 
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
    emptyBasket()
}

//Requête API et localStorage pour création du panier et du montant total du panier

const getBasket = async function(){  
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            // Récupération contenu du panier en localstorage
            let existingEntries = JSON.parse(localStorage.getItem("allEntries"))
            console.log('contenu du localstorage',existingEntries);
                        
            for (i = 0; i < existingEntries.length; i++) {
                let itemCamera = cameras.find(cameras => cameras['_id'] == existingEntries[i].idCamera);
                console.log("résultat recherche cam choisie par l'ID",itemCamera);
                createBasket(itemCamera, existingEntries);
                addItemPrice(itemCamera,existingEntries); 
            }
                totalPriceOrder(arrayPrice);
                 emptyBasket()
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    }
    catch (e) {
        console.log(e);
    }
}
//-------------Suppression du panier-------------------------//


function emptyBasket(/* existingEntries,tota */){
   
    let buttonDelete = document.getElementById("btn-empty");
    let totalPrice = document.getElementById('totalPrice');
    let tableProduct = document.getElementById('tableProduct'); 

buttonDelete.addEventListener('click', function(){
  /*  localStorage.removeItem("allEntries"); 
   localStorage.removeItem(total);   */
   localStorage.clear();
   console.log("votre panier est vide")  
   buttonDelete.remove();
   tableProduct.remove();
   totalPrice.textContent ="Votre panier est vide"
   
})
}

//-------------Validation du formulaire -------------------------//

// validation personnalisée des erreurs de mail
 
 let email = document.getElementById('mail'); 

 email.addEventListener('input', () => {
  email.setCustomValidity('');
  email.checkValidity();
});

email.addEventListener('invalid', () => {
  if(email.value === '') {
    email.setCustomValidity('Entrez votre mail');
  } else {
    email.setCustomValidity('votre email comporte des erreurs, vérifiez le');
  }
});


let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let address = document.getElementById('address')
let city = document.getElementById('city')


function send(e) {
    
    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body:submitForm(postData)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(res) {
      
     localStorage.setItem( "numeroCommande",responseId.orderId)  
     window.location.href = "confirm.html";
    })
    .catch((err) => console.log('Erreur :' + err));  
  }


function submitForm(postData){
  const form = document.querySelector("#form");
  let existingEntries = JSON.parse(localStorage.getItem("allEntries"));

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
    existingEntries.forEach(product =>{
        products.push(product.idCamera) 
        console.log("products",products)
    }) 
    console.log({"contact":contact,"products": products});
    let postData = JSON.stringify({"contact":contact,"products": products});
  })
}


//Appels des fonctions
    
getBasket()
submitForm()
send()

/* function addIdProducts(basketContent) {
  products.push(basketContent[i].idCamera);
} */