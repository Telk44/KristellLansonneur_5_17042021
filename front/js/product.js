// Fonction récupération de l'ID de la camera dans l'URL

function getId() {
    // Récupération de la chaîne de requête dans l'URL 
    let urlSearch = new URLSearchParams (window.location.search); 
    // Récuperation de l'Id
    let  productId = urlSearch.get("id"); 
    return productId;     
}
  
 //Fonction récupération de la caméra correspondant à l'Id

 function getAssociatedCamera(cameras,idCamera) {
    
    let findCamera = cameras.find(cameras => cameras['_id'] === idCamera);
    console.log('findCamera',findCamera);
    return findCamera;    
}



//Création de la structure html de la caméra choisie

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


    // Création des enfants de la div CardBody

    let titleCamera = document.createElement("h3");
    divCardBody.appendChild(titleCamera);
    titleCamera.classList.add("card-title");
    titleCamera.textContent = findCamera.name;

    let descriptionCamera = document.createElement("p");
    divCardBody.appendChild(descriptionCamera);
    descriptionCamera.classList.add("card-text", "text-justify");
    descriptionCamera.textContent = findCamera.description;  
    
    //Appel fonction affichage du choix de l'objectif

    chooseLense(divCardBody, findCamera);

    // Création du prix  

    let priceCamera = document.createElement("p");
    let convertPrice = new Intl.NumberFormat('fr-FE', { style: 'currency', currency: 'EUR',  minimumFractionDigits: 2 }).format(findCamera.price/100);
    divCardBody.appendChild(priceCamera);
    priceCamera.classList.add("fw-bold", "align-self-center", "mb-5");
    priceCamera.textContent = convertPrice;

    // Création du bouton 
    let buttonBuy = document.createElement("button");
    divCardBody.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-primary", "align-self-center");
    buttonBuy.textContent = "Ajouter au panier";       
                                                                                                                                                                                                                                                        
} 
    //Ajout du choix des objectifs 

function chooseLense(divCardBody, findCamera) {

    let textChooseLens = document.createElement("p");
    divCardBody.appendChild(textChooseLens);
    textChooseLens.classList.add("text-left", "fw-bold","my-3");
    textChooseLens.textContent = "Choisir l'objectif : ";

    let choiceLens = document.createElement("select");
    divCardBody.appendChild(choiceLens);
    choiceLens.classList.add("col-md-4","align-self-center", "mb-5");
    choiceLens.id = "list";

    let linkLens = document.createElement("option");
    choiceLens.appendChild(linkLens);
    linkLens.textContent = "---"
    
    let numberLenses = findCamera.lenses;
    for (let i = 0; i < numberLenses.length; i++) {
         let optionLens = document.createElement("option");
         choiceLens.appendChild(optionLens);
         optionLens.textContent = findCamera.lenses[i];
    }
}
    // Requête API

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
           //Appel fonction création de la Card caméra
           cardCamera(camById); 

        } else {
            console.error('retour du serveur: ', response.status)
        }
    } catch(e) {
        console.log(e)
    }
}
   // Appel de la requête

    getCameraByID();
