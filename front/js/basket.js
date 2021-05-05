
//-------------------------------Affichage du panier---------------------------------------//

//Création de la trame HTML du panier à partir des données des articles choisis

function createBasket(itemCamera,basketContent) {
  
    let addProductBasket = document.getElementById('addProduct');    

    let trBasket = document.createElement('tr');
    addProductBasket.appendChild(trBasket);
    trBasket.classList.add("row");
   
   let tdCamera = document.createElement('td'); 
    trBasket.appendChild(tdCamera);
    let pictureCamera =document.createElement('img');
    tdCamera.appendChild(pictureCamera);
    pictureCamera.classList.add("photo", "img-fluid");
    pictureCamera.src = itemCamera.imageUrl;

    let nameCamera = document.createElement('td');
    trBasket.appendChild(nameCamera);
    nameCamera.textContent = itemCamera.name;


    let lenseCamera = document.createElement('td');
    trBasket.appendChild(lenseCamera);
    lenseCamera.textContent = basketContent[i].selectedLenses; 

    let qtyCamera = document.createElement('td');
    trBasket.appendChild(qtyCamera);
    qtyCamera.textContent = itemCamera.selectQty;

    let priceCamera = document.createElement('td');
    trBasket.appendChild(priceCamera);
    priceCamera.textContent = itemCamera.price;
  
}


// Création du panier
const getBasket = async function(){  
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            // Récupération contenu du panier en localstorage
            let basketContent = JSON.parse(localStorage.getItem("basketContent"))|| {};
            console.log('contenu du localstorage',basketContent);
            for (i = 0; i < basketContent.length; i++) {
                let itemCamera = cameras.find(cameras => cameras['_id'] == basketContent[i].idCamera);
                console.log("résultat recherche cam par l'ID",itemCamera);
                createBasket(itemCamera)
            }
            
            
          
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    }
    catch (e) {
        console.log(e);
    }
}
    
getBasket()
