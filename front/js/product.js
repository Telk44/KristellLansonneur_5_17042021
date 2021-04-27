

    
// Récupération de l'ID de la camera dans l'URL

function getId() {
    let urlSearch = new URLSearchParams (window.location.search); 
    console.log(urlSearch);  // Récupération de la chaîne de requête dans l'URL 
    let  productId = urlSearch.get("id"); 
    console.log(productId)
    return productId;  //Extraction de l'ID sans le point d'interrogation
}

//console.log(getId());

// récupération du tableau des caméras sur l'API

let response = fetch("http://localhost:3000/api/cameras")
    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(value) {
    console.log('value',value);
    return value;

})
.catch(function(err) {
    // Une erreur est survenue
});
console.log('response',response);




 //Récupération de la caméra correspondant à l'Id

/* let productSelect=response.find((element) => element._id=== getId());
console.log(productSelect); */


function getIdUrlAndCard(cameras) {
    let urlSearch = new URLSearchParams(window.location.search);
    console.log(urlSearch);
    let idCamera = urlSearch.get('id');
    console.log(idCamera);
    getCameraItem(cameras, idCamera);
}

//Récupération de la caméra correspondant à l'Id
function getCameraItem(cameras, idCamera) {
    let choosenCamera = cameras.find(cameras => cameras['_id'] == idCamera);
    console.log(choosenCamera);
    createCardCamera(choosenCamera, idCamera);
}

async function getCameras() {
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            console.log(cameras);
            getIdUrlAndCard(cameras);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}

