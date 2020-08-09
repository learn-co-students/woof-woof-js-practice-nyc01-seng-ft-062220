
// STEP 2: ADD PUPS TO DOG BAR

document.addEventListener("DOMContentLoaded", function(){  loadAllPups() })

function loadAllPups() {    
fetch("http://localhost:3000/pups")
.then(resp => resp.json())
.then(pups => {pups.forEach(onePup => {loadOnePup(onePup)} 
) } ) 
}

function loadOnePup(onePup) { 
    let container = document.querySelector("#dog-bar")
    let span = document.createElement("span")
    span.innerHTML = `${onePup.name}`
    container.appendChild(span)  

//  STEP 3: SHOW MORE INFO ABOUT EACH PUP
    
    span.addEventListener("click", function(e){ 
       let div = document.querySelector("#dog-info")
       if (div.hasChildNodes.length > 0) 
       { div.removeChild(img), div.removeChild(h2), div.removeChild(button)} 

       let text = ""
       if (onePup.isGoodDog = true)
        {text = "Good Dog!"}
        else if (onePup.isGoodDog = false)
         {text = "Bad Dog!"}

        div.innerHTML = `
        <img src=${onePup.image} alt="${onePup.name}">
        <h2>id: ${onePup.id}<br>Name: ${onePup.name}</h2>
        <button>${text}</button>`        // a bug somewhere (all doogs are good)
    } )  
}


     
     
     



 

