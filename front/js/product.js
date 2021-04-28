

 /* async function getCameras(){ 
    await fetch("http://localhost:3000/api/cameras")
        .then(function(response) {
        if (response.ok) {
         let cameras = response.json();  
         console.log(cameras);
        //Récuperation de l'ID
         let idCamera = getId();
         console.log('idCamera',idCamera);

        //Récupération de la camera associée
        let camById= getAssociatedCamera(cameras,idCamera);
        console.log('camById',camById);

        //Création de la Card caméra
        cardCamera(camById);                   
        }
    })
     .then(function(value) {  

    }) 
    .catch(function(err) {
        // Une erreur est survenue
    });
}  */

// Fonction principale 

const getCameraByID = async function(){  
    try{
        // Récuperation des données de l'API

        let response =await fetch ("http://localhost:3000/api/cameras")
        if (response.ok) {
            let cameras = await response.json()
            console.log('data',cameras)
            //Récuperation de l'ID
            let idCamera = getId();
            console.log('idCamera',idCamera);
            //Récupération de la camera associée
           let camById= getAssociatedCamera(cameras,idCamera);
           console.log('camById',camById);
           //Création de la Card caméra
           cardCamera(camById); 


        } else {
            console.error('retour du serveur: ', response.status)
        }
    } catch(e) {
        console.log(e)
    }
}

// Récupération de l'ID de la camera dans l'URL

function getId() {
    // Récupération de la chaîne de requête dans l'URL 
    let urlSearch = new URLSearchParams (window.location.search); 
    // Récuperation de l'Id
    let  productId = urlSearch.get("id"); 
    //console.log('productId',productId)
    return productId;     
}
  
 //Récupération de la caméra correspondant à l'Id

function getAssociatedCamera(cameras,idCamera) {
    console.log('cameras2',cameras);
    console.log('idCamera2',idCamera);
    let findCamera = cameras.find(cameras => cameras['_id'] === idCamera);
    console.log('findCamera',findCamera);
    return findCamera;
    
}

//création de la structure html de la caméra choisie

function cardCamera(findCamera){

        const productDescription= document.getElementById("productDescription");
        let divParentParent = document.createElement("div");        
        productDescription.appendChild(divParentParent);
        divParentParent.classList.add("row", "mx-auto", "my-3", "w-75");
    
        let divParent = document.createElement("div");
        divParentParent.appendChild(divParent);
        divParent.classList.add("card", "col", "m-auto", "p-5");
    
        let imageCamera = document.createElement("img");
        divParent.appendChild(imageCamera);
        imageCamera.classList.add("card-image-top", "photo", "img-fluid");
        imageCamera.src = findCamera.imageUrl;
    
        let divCardBody = document.createElement("div");
        divParent.appendChild(divCardBody);
        divCardBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");
    
    
        // Création des éléments enfants de la div CardBody
        let titleCamera = document.createElement("h3");
        divCardBody.appendChild(titleCamera);
        titleCamera.classList.add("card-title");
        titleCamera.textContent = findCamera.name;
    
        let descriptionCamera = document.createElement("p");
        divCardBody.appendChild(descriptionCamera);
        descriptionCamera.classList.add("description-product", "text-justify");
        descriptionCamera.textContent = findCamera.description;
    
        chooseLense(divCardBody, FindCamera);
    
        // Création d'une div englobant prix et bouton
        let divPrice = document.createElement("div");
        divCardBody.appendChild(divPrice);
        divPrice.classList.add("d-flex", "flex-md-row", "flex-column", "justify-content-between");
    
        // Création du prix
        let priceCamera = document.createElement("p");
        divLinkPrice.appendChild(priceCamera);
        priceCamera.classList.add("price-product", "font-weight-bold");
        priceCamera.textContent = findcamera.price/100 + ' €';
    
        let linkProduct = document.createElement("a");
        divLinkPrice.appendChild(linkProduct);

        // Création du bouton 
        let buyButton = document.createElement("button");
        linkProduct.appendChild(buyButton);
        buttonBuy.classList.add("btn", "btn-warning", "block-right");
        // Ajout texte au bouton
        buttonBuy.textContent = "Ajouter au panier";
        console.log(idCamera);
        getLensCamera(buyButton, idCamera);
    }

    //getCameras();
    // Appel de la fonction principale
    getCameraByID();




