//----------------------------------Fonction récupération de l'ID de la camera dans l'URL----------------------------------

function getId() {
    // Récupération de la chaîne de requête dans l'URL 
    let urlSearch = new URLSearchParams (window.location.search); 
    // Récuperation de l'Id
    let  productId = urlSearch.get("id"); 
    return productId;     
}
  
//----------------------------------Fonction récupération de la caméra correspondant à l'Id----------------------------------

 function getAssociatedCamera(cameras,idCamera) {
    
    let findCamera = cameras.find(cameras => cameras['_id'] === idCamera);
    console.log('findCamera',findCamera);
    return findCamera;    
}



//----------------------------------Création de la structure html de la caméra choisie----------------------------------

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

    //Appel fonction choix de la quantité

    selectQuantity(divCardBody,findCamera);
 
    // Création du prix  

    let textPriceCamera = document.createElement("p");
    divCardBody.appendChild(textPriceCamera);
    textPriceCamera.classList.add("text-left", "fw-bold","my-3");    
    textPriceCamera.id = "textPriceCamera";
    calculatedPrice(findCamera);

    let linkProduct = document.createElement("a");
    textPriceCamera.appendChild(linkProduct);
    // Création du bouton 
    let buttonBuy = document.createElement("button");
    divCardBody.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-primary", "align-self-center");
    buttonBuy.textContent = "Ajouter au panier"; 
    addCamera(buttonBuy);      
                                                                                                                                                                                                                                                        
} 
  //----------------------------------Fonction choix des objectifs ----------------------------------

function chooseLense(divCardBody, findCamera) {

    let textChooseLens = document.createElement("p");
    divCardBody.appendChild(textChooseLens);
    textChooseLens.classList.add("text-left", "fw-bold","my-3");
    textChooseLens.textContent = "Choisir l'objectif : ";

    let choiceLens = document.createElement("select");
    divCardBody.appendChild(choiceLens);
    choiceLens.classList.add("col-md-4","align-self-center", "mb-5");
    choiceLens.id = "list";
    
    let numberLenses = findCamera.lenses;
    for (let i = 0; i < numberLenses.length; i++) {
         let optionLens = document.createElement("option");
         choiceLens.appendChild(optionLens);
         optionLens.textContent = findCamera.lenses[i];
         /* optionLens.id = "optionLens"; */
    }
}

  //----------------------------------Fonction ajout choix de la quantité----------------------------------

function selectQuantity(divCardBody,findCamera) {
    
    let textChooseQuantity = document.createElement("p");
    divCardBody.appendChild(textChooseQuantity );
    textChooseQuantity.classList.add("text-left", "fw-bold","my-3");
    textChooseQuantity.textContent = "Indiquez la quantité souhaitée : ";

    let chooseQuantity = document.createElement("select");
    divCardBody.appendChild(chooseQuantity);
    chooseQuantity.classList.add("col-md-2","align-self-center", "mb-5", "number");
    chooseQuantity.id="selectQty";

    let quantity = 11;
    for (let i = 0; i < quantity; i++) {
         let optionQuantity = document.createElement("option");
         chooseQuantity.appendChild(optionQuantity);
         optionQuantity.textContent = i;
         optionQuantity.id='qty';
    }

}    

//----------------------------------Calcul du prix total de la commande selon quantité choisie----------------------------------

function calculatedPrice(findCamera){
     
    let selectQty = document.getElementById('selectQty'); 
    let textPriceCamera = document.getElementById('textPriceCamera');
    selectQty.addEventListener('change',function(){  
    let playerQty = selectQty.value;  
    let totalPrice = playerQty*findCamera.price/100;    
    textPriceCamera.textContent = "Prix Total : " + totalPrice +" €";     
})
}

//----------------------------------Ajout des articles dans le panier----------------------------------

//Création d'un tableau d'objets 
class MyProduct {
    constructor(idCamera, selectedLense, playerQty) {
        this.idCamera = idCamera;
        this.selectedLense = selectedLense;
        this.playerQty = playerQty;
    }
}

function addCamera(buttonBuy) {
    buttonBuy.addEventListener('click', function () {
        // Récupération du storage
        let basketContent = JSON.parse(localStorage.getItem("basketContent"));
        // Récupération du type et qtté de camera  à ajouter
        let selectedLense = document.getElementById('list').value;
        let selectQty = document.getElementById('selectQty').value; 
        let idCamera = getId(); 

        
          //console.log(selectQty);
        if (basketContent == null) {
            console.log("null")

            console.log(idCamera);   
            console.log(selectedLense);               
            console.log(selectQty);                     
            basketContent = [];
            let product = new MyProduct(idCamera, selectedLense, selectQty);
            basketContent.push(product);
            localStorage.setItem("basketContent", JSON.stringify(basketContent));
            console.log(basketContent); 
                 
        }      
         else{      
             for(let i=0;i<basketContent.length;i++){
                console.log(selectQty);                     

                 if (basketContent[i].idCamera == idCamera && basketContent[i].selectedLense == selectedLense){ 
                    console.log("camera presente rajouter quantité")
                    let qtyInt = parseInt(basketContent[i].playerQty);
                    console.log("quantité presente dans le panier",qtyInt); 
                    let parseSelectQty = parseInt(selectQty);
                    qtyInt += parseSelectQty;
                    basketContent[i].playerQty = qtyInt;
                    console.log("nouvelle-quantité",qtyInt) ;    
       
                    localStorage.setItem("basketContent ", JSON.stringify(basketContent));  
                    console.log("contenu localeStorage",basketContent);                 
                 }
                 else if (basketContent[i].idCamera == idCamera && basketContent[i].selectedLense != selectedLense){
                     console.log("camera ok mais pas lens")
                    let product = new MyProduct(idCamera, selectedLense, selectQty);
                    basketContent.push(product);
                    localStorage.setItem("basketContent", JSON.stringify(basketContent));
                    console.log(basketContent); 
                 }            
         }
         
        }                       
        
    })  
    
}

//----------------------------------Requête API----------------------------------

const getCameraByID = async function(){  
    try{
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
//----------------------------------Appel de la requête----------------------------------

    getCameraByID();


