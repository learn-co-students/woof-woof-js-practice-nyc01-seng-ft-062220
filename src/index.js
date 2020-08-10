
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
                toggleGoodBadDog(e.target.id)
            } else if(e.target.matches("#good-dog-filter")){
                console.log(e.target.innerText)
                    filterOnOff();
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
        spanPup.setAttribute("class",`${pup.isGoodDog}`)
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

    function toggleGoodBadDog(pupId){
        const dogGoodBad = document.getElementById(`${pupId}`)
        const goodBadBtn = document.querySelector("#dog-info > div > button")
        let currentDogBehavior = goodBadBtn.innerText
        if(currentDogBehavior === "Good Dog!"){
            currentDogBehavior = "Bad Dog!"
            dogGoodBad.setAttribute("class", false)
            
        } else {
            currentDogBehavior = "Good Dog!"
            dogGoodBad.setAttribute("class", true)
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
        filterOnOff()
        filterOnOff()
        
    };

    function filterOnOff(){
        const goodDogFilter = document.querySelector("#good-dog-filter")
        const dogBar = document.querySelector("#dog-bar")
        if (goodDogFilter.innerText === "Filter good dogs: ON"){
            goodDogFilter.innerText = "Filter good dogs: OFF"
            for(i=0;i < dogBar.children.length;i++){
                dogBar.children[i].style.display = "flex"
            }
        
        } else {
            goodDogFilter.innerText = "Filter good dogs: ON"
            for(i=0;i < dogBar.children.length;i++){
                if(dogBar.children[i].className === "false"){ 
                    dogBar.children[i].style.display = "none"
                } else {
                    dogBar.children[i].style.display = "flex"
                }
            }
        }


    };
    //get the button id and store it to a variable
// add an eventlistener when user clicks button, toggle good/bad
// make a patch call when toggling button to change that puppies isGoodDog boolean

        
        

    clickHandler();
    fetchPups();


});