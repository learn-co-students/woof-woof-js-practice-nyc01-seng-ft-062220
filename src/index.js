document.addEventListener("DOMContentLoaded", () => {
const dogMainContainer = document.getElementById("dog-summary-container")
const dogInfo = document.getElementById("dog-info")
const filter = document.getElementById("good-dog-filter")
const dogBar = document.getElementById("dog-bar")
const url = "http://localhost:3000/pups/"
let puppyList = []

class Pup {
    constructor(pupObj) {
      this.id = pupObj.id
      this.name = pupObj.name
      this.isGoodDog = pupObj.isGoodDog
      this.image = pupObj.image
      puppyList.push(this)
    }
}

async function loadPups(){
    const res = await fetch(url)
    const data = await res.json()
    data.map(pup => {
        new Pup(pup)
        renderPuppy(pup)})
}

async function updatePup(obj, id){
    const settings = {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({isGoodDog: obj.isGoodDog})
    }
    const res = await fetch(url + id, settings)
}

function renderPuppy(obj){
    const newpup = document.createElement("div")
    newpup.id = "good-dog-filter"
    newpup.innerHTML = `<span id=${obj.id}>${obj.name}</span>`
    dogBar.appendChild(newpup)
}

//dogbar on-click
dogBar.addEventListener("click", e => {
    if(e.target.matches("span")){
       const pupid = parseInt(e.target.id)
       const details = puppyList.find(x => x.id == pupid)
       let buttonText = details.isGoodDog ? "Good Dog!" : "Bad Dog!";
       dogInfo.innerHTML = `
       <img src="${details.image}" alt="${details.name}">
       <h2 id="${details.id}">${details.name}</h2>
       <button>${buttonText}</button>
       `
    }
})

//dog container on-click
dogMainContainer.addEventListener("click", e => {
    if(e.target.matches("button")){
       const pupid = e.target.parentNode.children[1].id
       const obj = puppyList.find(x => x.id == pupid)
       obj.isGoodDog = !obj.isGoodDog //boolean switch true/false
       e.target.innerHTML = obj.isGoodDog ? "Good Dog!" : "Bad Dog!";
       updatePup(obj, pupid)
    }

})

//filter toggle
filter.addEventListener("click", e => {
    if (filter.innerText == "Filter good dogs: OFF"){
        filter.innerText = "Filter good dogs: ON"
        const goodBoys = puppyList.filter(x => x.isGoodDog == true) 
        dogBar.innerText = ''
        goodBoys.forEach(obj => renderPuppy(obj))
    }else{
        filter.innerText= "Filter good dogs: OFF"
        dogBar.innerText = ''
        puppyList.map(obj => renderPuppy(obj))
    }
    
})

//invoke
loadPups()

})