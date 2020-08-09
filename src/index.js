document.addEventListener("DOMContentLoaded", function(e) {
    
    // Global Variables

    const url = "http://localhost:3000/pups/"



    //Functions

    function renderPups() {
        fetch(url)
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => showPup(dog)))
    }

    function showPup(dog) {
        const dogBar = document.querySelector("#dog-bar")
        const pup = document.createElement("div")

        const dogName = dog.name
        // const dogImage = dog.image
        // const dogStatus = dog.isGoodDog
        pup.classList.add("dogButton")
        
        pup.innerHTML = `
        <span id="${dog.id}">${dogName}</span>
        `

        dogBar.append(pup)  
    }

    
    function renderPup(id) {
        fetch(url + id)
        .then(res => res.json())
        .then(dog => spotlightPup(dog))
    }


    function spotlightPup(dog) {
        let infoBox = document.querySelector("#dog-info")
        //infoBox.id = dog.id
        
        const dogName = dog.name
        const dogImage = dog.image
        const dogStatus = dog.isGoodDog
        let dogCheck = ""
        
        if (dogStatus === true) {
            dogCheck = "Good Dog!"
        } else {
            dogCheck = "Bad Dog!"
        }

        infoBox.innerHTML = `
        <img src=${dogImage} alt="${dogName}">
        <h2 id=${dog.id}>${dogName}</h2>
        <button class="dogCheck">${dogCheck}</button>
        `
    }


    function patchPup(id, status) {
        let dogStatus

        if (status === "Good Dog!") {
            dogStatus = false
        }   else {
            dogStatus = true
        }
        

        options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: dogStatus
            })
        }

        fetch(url + id, options)
        .then(res => res.json())
        .then( res => {
            let button = document.querySelector(".dogCheck")

            if (button.innerHTML === "Good Dog!") {
                button.innerHTML = "Bad Dog!"
            } else {
                button.innerHTML = "Good Dog!"
            }
            console.log(dogStatus)
        })
    }
    

    function renderGood() {
        const allDogs = document.querySelector("#dog-bar")
        removeAllChildNodes(allDogs)
        fetch(url)
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => isGood(dog)))
    }

    function isGood(dog) {
        if (dog.isGoodDog === true) {
            showPup(dog)
        }
    }


    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }


    //Event Listeners

        document.addEventListener("click", function(event) {
            if (event.target.matches("span")) {
                let pupper = event.target
                
                renderPup(pupper.id)

            } else if (event.target.matches(".dogCheck")) {
                const button = event.target
                const dogBox = button.parentElement
                const dogId = dogBox.querySelector("h2").id
                const status = button.innerHTML
                

                patchPup(dogId, status)

            } else if (event.target.matches("#good-dog-filter")) {
                const toggle = event.target
                if (toggle.innerHTML === "Filter good dogs: OFF") {
                    toggle.innerHTML = "Filter good dogs: ON"
                    renderGood()
                } else {
                    toggle.innerHTML = "Filter good dogs: OFF"
                    const allDogs = document.querySelector("#dog-bar")
                    removeAllChildNodes(allDogs)
                    renderPups()
                }
            }

        })

    


    
    renderPups()
})