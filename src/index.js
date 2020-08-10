

document.addEventListener("DOMContentLoaded",function(){
    const bar = document.getElementById("dog-bar")
    const dogCard = document.getElementById("dog-info")
    loadDogs()


    document.addEventListener("click",function(e){
        if (e.target.tagName === "SPAN"){        
        showDog(e.target.id)
        }
        if (e.target.id === "good-dog-filter"){
            let button = e.target
            if(button.textContent === "Filter good dogs: OFF"){
                button.textContent = "Filter good dogs: ON"
                bar.innerHTML = ""
                loadDogs("On")
            }
            else {
                button.textContent = "Filter good dogs: OFF"
                bar.innerHTML = ""
                loadDogs()
            }    

        }
        // the ending of the document click addeventlistener
    })

    dogCard.addEventListener("click", function(e){
        const dogButton = dogCard.querySelector("button")
        if (e.target = dogButton){
        patchDog(e.target.name,e.target.textContent)
        
        }
    })




    function loadDogs(filter="Off"){
    
        fetch("http://localhost:3000/pups/")
        .then(function(response){ return response.json()})
        .then(function(json){ 
            let object;
            if (filter === "On"){
            object = json.filter(filterDogs)
            function filterDogs(status){ return status.isGoodDog === true}
            } else {object = json}


          for(let i = 0; i < object.length;i++){
              const newDog = document.createElement("span")
              newDog.id = object[i].id
              bar.appendChild(newDog)
              newDog.textContent = object[i].name
          }  
        })
    }


    function showDog(id, option={method:"GET"}){
        
        fetch(`http://localhost:3000/pups/${id}`,option)
        .then(function(response){ return response.json()})
        .then(function(object){
           
            let button;
            if(object.isGoodDog === true){ button = "Good Dog!"} else{button = "Bad Dog!"}

         dogCard.innerHTML=`<img src= ${object.image}>
            <h2> ${object.name} </h2>
            <button name= ${object.id}>${button}</button>`
            

        })
    }

    function patchDog(dogId,buttonText){
        let body;
        if( buttonText === "Good Dog!"){ 
            body = {id: dogId, isGoodDog:  false}}
         else if(buttonText === "Bad Dog!"){
             body = {id: dogId, isGoodDog: true}}
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
                    },
            body: JSON.stringify(body)}
            
            showDog(dogId, options)



     }



    




    //the end of the domcontentloaded event listener
})