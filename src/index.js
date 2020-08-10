PUPS_URL = "http://localhost:3000/pups/"
GOODBAD = {
    "Good Dog!": "Bad Dog!",
    "Bad Dog!": "Good Dog!"
}
GOODBADDB = {
    "Good Dog!" : true,
    "Bad Dog!" : false
}
FILTERBUTTON = {
    "Filter good dogs: OFF": "Filter good dogs: ON",
    "Filter good dogs: ON": "Filter good dogs: OFF"
}
document.addEventListener("DOMContentLoaded", function() {

    fetch(PUPS_URL)
    .then(response => response.json())
    .then(puppies => addPup(puppies))
    .catch(error => alert(error))

    const addPup = (puppies) => {
        for (const puppy of puppies){
            const span = document.createElement("span")
            span.innerText = puppy.name
            span.dataset.puppyId = puppy.id
            document.querySelector("#dog-bar").append(span)
        }
    }

    const returnDog = (dogName) => {
        fetch(PUPS_URL)
        .then(response => response.json())
        .then(puppies => function(puppies){
            for (const puppy of puppies) {
                if(puppy.name === dogName){
                    return puppy
                }
            }
        })
    }

    document.addEventListener("click", (e) => {

        if(e.target.matches("#dog-bar > span")){
            const pupSpan = e.target

            fetch(PUPS_URL + pupSpan.dataset.puppyId)
            .then(response => response.json())
            .then(puppy => renderPuppy(puppy))
            .catch(console.log())
        

            const renderPuppy = (puppy) => {
                const newImg = document.createElement("img")
                newImg.src = puppy.image
                const h2 = document.createElement("h2")
                h2.innerText = puppy.name
                const newButton = document.createElement("button")
                newButton.dataset.puppyId = puppy.id
                newButton.className = "goodButton"
                if (puppy.isGoodDog === true){
                    newButton.innerText = "Good Dog!"
                } else if (puppy.isGoodDog === false) {
                    newButton.innerText = "Bad Dog!"
                }
                const deleteButton = document.createElement("button")
                deleteButton.innerText = "Delete!"
                deleteButton.className = "delete"
                document.querySelector("#dog-info").append(newImg)
                document.querySelector("#dog-info").append(h2)
                document.querySelector("#dog-info").append(newButton)
                document.querySelector("#dog-info").append( deleteButton)
            }
        } else if (e.target.matches("button.goodButton")){
            const button = e.target
            button.innerText = GOODBAD[button.innerText]
            const configObj = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                body: JSON.stringify({isGoodDog: GOODBADDB[button.innerText]})
            }
                

            fetch(PUPS_URL + button.dataset.puppyId,configObj)
            .then(response => response.json())
            .then(puppy => console.log(puppy))
            .catch(error => console.log(error))
        } else if (e.target.matches("#good-dog-filter")) {
            const filterButton = e.target
            filterButton.innerText = FILTERBUTTON[filterButton.innerText]
            if (filterButton.innerText === "Filter good dogs: ON") {
                document.querySelectorAll("span").forEach(e => e.remove())
                fetch(PUPS_URL)
                .then(response => response.json())
                .then(function(puppies) {
                    for (const puppy of puppies) {
                        if (puppy.isGoodDog === true) {
                            const span = document.createElement("span")
                            span.innerText = puppy.name
                            span.dataset.puppyId = puppy.id
                            document.querySelector("#dog-bar").append(span)
                        } 
                    }
                })
                .catch(console.log)
            } else {
                document.querySelectorAll("span").forEach(e => e.remove())
                fetch(PUPS_URL)  
                .then(response => response.json())
                .then(puppies => addPup(puppies))
                .catch(error => alert(error))
            }
        } else if (e.target.matches("button.delete")) {
            const configObj = {
                method: "DELETE"
            }
            const pupId = e.target.parentNode.querySelector("button.goodButton").dataset.puppyId

            fetch(PUPS_URL + pupId,configObj)
            .then(response => {
                e.target.parentNode.remove()
                e.target.querySelector(`span[data-puppy-id="${pupId}"]`).remove()
            })
        }
    }) 
})