function order () {
    if (localStorage.getItem("numero_commande")){ 
    let elt = document.querySelector("#thanks");
    let eltNew = document.createElement("h6"); eltNew.className = ("py-2");
    let eltbutton = document.querySelector("#confirmation");
    elt.appendChild(eltNew).innerHTML = " Orinoco  vous remercie pour votre commande n°" + localStorage.getItem("numero_commande")   + ". Le prix total de celle-ci est de  " + sessionStorage.getItem("totalPrice") + " euros. Toutes les informations de votre commande vous serront transmis par email."
    eltbutton.innerHTML = "continuer mes achats";  
    eltbutton.addEventListener("click", function(event){
        localStorage.clear()
        sessionStorage.clear() 
    })
   }
}

/* order(); */

setTimeout(function(){
    localStorage.clear()
    sessionStorage.clear()
    window.location = "confirmation.html"; }, 100000);