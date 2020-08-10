document.addEventListener("DOMContentLoaded", function(){
    console.log("dom has loaded")
    dogDivBar = document.getElementById("dog-bar")
    let currentPups = []
    let dogInfoBar = document.getElementById("dog-info")
    let url = "http://localhost:3000/pups/"
    let currentDogId = -1

function getDogs(){
fetch(url)
    .then(response => response.json())
    .then(pupData => renderPups(pupData))
}

function renderPup(pupObj) {
    currentPups.push(pupObj)
    //console.log(currentPups)
    const dogSpan = document.createElement("span")
    dogSpan.innerHTML = `${pupObj.name}`
    //dogSpan.src = pupObj.image
    
    dogSpan.setAttribute("isgooddog", pupObj.isGoodDog)
    dogSpan.setAttribute("image", pupObj.image)
    dogSpan.id = pupObj.id
    dogDivBar.append(dogSpan)
}

function renderPups(pupsObj) {
    pupsObj.forEach(renderPup)
}

function swapPup(clickedDog){
    
    //clears current dog (if any) and renders clicked pup
    let dogName = clickedDog.textContent
    let dogImage = clickedDog.getAttribute("image")
    let dogBoolean = clickedDog.getAttribute("isgooddog")
    let buttonVal = ""
    //debugger
    
    if(dogBoolean === "true") {
        buttonVal = "Good Dog!"
        //return buttonVal
    } else if (dogBoolean === "false") {
        buttonVal = "Bad Dog!"
        //return buttonVal
    }

    dogInfoBar.innerHTML = ""
    dogInfoBar.innerHTML = `
    <img src=${dogImage}>
    <h2>${dogName}</h2>
    <button type="button" id="toggle" >${buttonVal}</button>
    
    `
}

document.addEventListener("click", function(e){
    
    if(e.target.matches("span")) {
        let clickedDog = e.target
        currentDogId = clickedDog.id
        swapPup(clickedDog)
    } else if(e.target.matches("#toggle")){
        let toggle = e.target
        let dogBoolean
        if (toggle.textContent === "Good Dog!") {
            dogBoolean = false
        } else {
            dogBoolean = true
        }

        let configObj = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({isGoodDog: dogBoolean})
        }

        fetch(url + currentDogId, configObj)
            .then(response => response.json())
            .then(changedDog => {
                 let newBoolean = changedDog.isGoodDog
                 if (newBoolean === true){
                    toggle.textContent = "Good Dog!"
                 } else if (newBoolean === false) {
                    toggle.textContent = "Bad Dog!"
                 }
                 
            })


        // if(toggle.textContent === "Good Dog!") {
        //     toggle.textContent = "Bag Dog!"
        // } else {
        //     toggle.textContent = "Good Dog!"
        // }
        // console.log(toggle.textContent)
    }
})



getDogs()

})


/*

Plan

STEP2
$- Make sure DOM loads - listner
$- Get pup data from DB - fetch request
$- Add pups to DOM
    $- create helper functions for rendering (to be used after fetch)
    $- create span
    $- add pup name (keep other pup info)
    $- find + append to dogbar div

STEP3
- create event listener on (with event delegation) for dog spoans
    - should reset previous dog div and add new dog image. name, good dog status button
    - 

STEP4
- add event listener to good dog bad dog buttons (with delegation)
    - swap innerHTML good dog <-> bad dog
    - PATCH fetch request to DB   

*/