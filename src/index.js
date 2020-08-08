// get dogs
//post dogs to screen using span


//user clicks span, span displays img, name button
//button says good dog or bad dog.
//button toggles good dog status in db and toggles button name change

document.addEventListener("DOMContentLoaded", e => {
    let filter = false
    const url = "http://localhost:3000/pups/"

    const pullDogs = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => renderDogs(data))

    }

    const renderDogs = (data) => {
        const dogContainerDiv = document.getElementById("dog-bar")
        data.forEach(function (dogObj) {

            const dogCard = document.createElement("span")
            dogCard.className = "dog-card"
            dogCard.id = dogObj.id

            dogCard.innerHTML = dogObj.name

            dogContainerDiv.append(dogCard)
        })

    }

    const pullSingleDog = () => {
        document.addEventListener("click", e => {

            if (e.target.matches(".dog-card")) {

                const dogCard = e.target
                const dogId = dogCard.id

                fetch(url + dogId)
                    .then(res => res.json())
                    .then(dog => displayDog(dog))
            }
        })
    }

    const displayDog = (dog) => {
        //dice up data
        //build html card
        //post html card.

        const dogContainerDiv = document.getElementById("dog-info")
        const dogCard = document.createElement("div")
        const name = dog.name
        const isGoodDog = dog.isGoodDog
        const image = dog.image

        if (isGoodDog === true) {
            dogCard.className = "dog-card"
            dogCard.id = dog.id
            dogCard.innerHTML = `
            <img src="${image}" alt = "${name}"/>
            <h1>name: ${name}</h1>
            <h3>Good dog status: ${isGoodDog}</h3>
            <button class="make-bad-dog">Make Bad Dog</button>        
        `
        } else {
            if (filter === true) {
                dogCard.className = "dog-card"
                dogCard.id = dog.id
                dogCard.innerHTML = `
                <h1>Cannot Display dog.  Dog is not good :(</h1>        
                `
            } else {
                dogCard.className = "dog-card"
                dogCard.id = dog.id
                dogCard.innerHTML = `
                <img src="${image}" alt = "${name}"/>
                <h1>name: ${name}</h1>
                <h3>Good dog status: ${isGoodDog}</h3>
                <button class="make-good-dog">Make good Dog</button>        
                `
            }
        }

        while (dogContainerDiv.firstChild) {
            dogContainerDiv.lastChild.remove()
        }
        dogContainerDiv.append(dogCard)
    }

    const toggleGoodStatus = () => {

        //I know.. I know... this isn't very DRY

        document.addEventListener("click", e => {

            if (e.target.matches("button.make-bad-dog")) {
                const button = e.target
                const buttonParent = button.parentElement
                const dogId = buttonParent.id
                const goodStatus = false
                updateStatus(dogId, goodStatus)
                fetch(url + dogId)
                    .then(res => res.json())


            } else if (e.target.matches("button.make-good-dog")) {
                const button = e.target
                const buttonParent = button.parentElement
                const dogId = buttonParent.id
                const goodStatus = true
                updateStatus(dogId, goodStatus)
                fetch(url + dogId)
                    .then(res => res.json())

            }

        })
    }

    const updateStatus = (dogId, goodStatus) => {
        const packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ isGoodDog: goodStatus })
        }

        fetch(url + dogId, packet)
            .then(res => res.json())
            .then(dog => displayDog(dog))


    }

    const filterButton = () => {
        e.preventDefault()
        document.addEventListener("click", e => {
            if (e.target.matches("button#good-dog-filter")) {
                let buttonContainer = document.getElementById("good-dog-filter")

                if (filter === false) {
                    filter = true
                    buttonContainer.textContent = "Filter good dogs: ON"
                    console.log(filter)
                } else if (filter === true) {
                    filter = false
                    buttonContainer.textContent = "Filter good dogs: OFF"
                    console.log(filter)
                }
            }
        })



    }

    pullDogs()
    pullSingleDog()
    toggleGoodStatus()
    filterButton()

})




