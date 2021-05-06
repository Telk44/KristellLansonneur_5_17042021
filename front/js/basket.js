
//-------------------------------Affichage du panier---------------------------------------//

//Création du HTML du panier à partir des données des articles choisis

function createBasket(itemCamera,basketContent) {
  
    let addProductBasket = document.getElementById('addProduct');    

    let trBasket = document.createElement('tr');
    addProductBasket.appendChild(trBasket);
    /* trBasket.classList.add("row"); */
   
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

    let lenseCamera = document.createElement('td');
    trBasket.appendChild(lenseCamera);
    lenseCamera.classList.add('text-center')
    lenseCamera.textContent = basketContent[i].selectedLense; 

    let qtyCamera = document.createElement('td');
    trBasket.appendChild(qtyCamera);
    qtyCamera.classList.add('text-center')
    qtyCamera.textContent = basketContent[i].playerQty;

    let priceCamera = document.createElement('td');
    trBasket.appendChild(priceCamera);
    priceCamera.classList.add('text-center')
    priceCamera.textContent = itemCamera.price*basketContent[i].playerQty/100 +" €";
    priceCamera.id="priceByQty";

    let tdBasket = document.createElement('td');
    trBasket.appendChild(tdBasket);
    tdBasket.classList.add('text-center');
    let pictoBasket = document.createElement("img");
    tdBasket.appendChild(pictoBasket);
    pictoBasket.src= "images/trash.svg";
  
}

//Tableau de stockage des prix par quantité

let arrayPrice = [];

//Calcul du prix*quantité et ajout au tableau de stockage 

function addItemPrice(itemCamera,basketContent) {
    let itemPrice = itemCamera.price*basketContent[i].playerQty/100 ;    
    arrayPrice.push(itemPrice);
    console.log("test ajout prix au tableau",itemPrice)
}

//Montant total de la commande 
function totalPriceOrder(arrayPrice) {
    let totalPrice = document.getElementById('totalPrice');
    let total = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        total += arrayPrice[i];
        totalPrice.textContent = "Montant total de votre panier : " + total + " €";
       
    }
}

//Requête API et localStorage pour création du panier et du montant total du panier

const getBasket = async function(){  
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            // Récupération contenu du panier en localstorage
            let basketContent = JSON.parse(localStorage.getItem("basketContent"));
            console.log('contenu du localstorage',basketContent);
                        
            for (i = 0; i < basketContent.length; i++) {
                let itemCamera = cameras.find(cameras => cameras['_id'] == basketContent[i].idCamera);
                console.log("résultat recherche cam choisie par l'ID",itemCamera);
                createBasket(itemCamera, basketContent);
                addItemPrice(itemCamera,basketContent);            
                
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
    
getBasket()
