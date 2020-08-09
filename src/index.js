
const url = "http://localhost:3000/pups/"

document.addEventListener("DOMContentLoaded", e => {
    
    function clickHandler(){
        document.addEventListener("click", e => {
            if(e.target.matches("#dog-bar > span")){
                if(document.contains(document.querySelector("#dog-info > div"))){
                    document.querySelector("#dog-info").children[0].remove()
                    renderPupDetails(e.target.id)
                } else {
                    renderPupDetails(e.target.id);
                }
            } else if(e.target.matches("#dog-info > div > button")){
                    toggleDog(e.target.id)
            }
        });
    }

    function fetchPups(){
        fetch(url)
        .then(res => res.json())
        .then(res => {
            res.forEach(pup => renderPups(pup))
            
        });
    }

    function renderPups(pup){
        const dogBar = document.querySelector("#dog-bar")
        const spanPup = document.createElement("SPAN")
        spanPup.setAttribute("id",`${pup.id}`)
        spanPup.innerText = pup.name
        dogBar.append(spanPup)
    
    }

    function renderPupDetails(pup){
        const dogInfo = document.querySelector("#dog-info")
        const dogInfoDiv = document.createElement("div")

        fetch(`${url}${pup}`)
        .then(res => res.json())
        .then(res => {
            if(res.isGoodDog == true){
                dogInfoDiv.innerHTML = `
                <img src=${res.image}>
                <h2>${res.name}</h2>
                <button id=${pup}>Good Dog!</button>`
            } else {
                dogInfoDiv.innerHTML = `
                <img src=${res.image}>
                <h2>${res.name}</h2>
                <button id=${pup}>Bad Dog!</button>`
            }
        dogInfo.appendChild(dogInfoDiv)

        });
    };

    function toggleDog(pupId){
        const goodBadBtn = document.querySelector("#dog-info > div > button")
        let currentDogBehavior = goodBadBtn.innerText
        if(currentDogBehavior === "Good Dog!"){
            currentDogBehavior = "Bad Dog!"
            
        } else {
            currentDogBehavior = "Good Dog!"
        }
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: currentDogBehavior === "Good Dog!"
                
            })
        };

        fetch(`${url}${pupId}`, configObj)
        .then(res => {
            if(res.status === 200){
                goodBadBtn.innerText = currentDogBehavior
            } else {
                alert("Whoops there was an error!")
            }
        });
    };


    //get the button id and store it to a variable
// add an eventlistener when user clicks button, toggle good/bad
// make a patch call when toggling button to change that puppies isGoodDog boolean

        
        

    clickHandler();
    fetchPups();


});