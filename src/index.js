document.addEventListener("DOMContentLoaded", function(){

    const dogsUrl = "http://localhost:3000/pups/"

    const getDogs = () => {
        fetch(dogsUrl)
        .then(response => response.json())
        .then(dogsCollection => renderDogs(dogsCollection))
    }

    const dogBarDiv = document.querySelector("#dog-bar")
    // const dogInfoDiv = document.querySelector("#dog-info")

    const renderDogs = (dogCollection) => {
        // console.log(dogCollection)
        dogCollection.forEach(dog => renderDog(dog))
    }

    const renderDog = (dogObj) => {
       const span = document.createElement("span")
       span.classList.add("dog-span")
       span.innerHTML = `
       ${dogObj.name}
       `    
       dogBarDiv.append(span)

       //add ids to rendered dogs
       span.dataset.name = dogObj.name
       span.dataset.image = dogObj.image
       span.dataset.isGoodDog = dogObj.isGoodDog
       span.dataset.id = dogObj.id

       const dogInfoDiv = document.querySelector("#dog-info")
       dogInfoDiv.dataset.isGoodDog = dogObj.isGoodDog

    //    adds proper text to good dog button
    
       if(span.dataset.isGoodDog === "true"){
        span.dataset.isGoodDog = "Good Dog!"
       } else if(span.dataset.isGoodDog === "false"){
        span.dataset.isGoodDog = "Bad Dog!"
        }
    }

    const clickHandler = () => {
        document.addEventListener("click", function(e){
            //click listener for spans on nav bar
            if (e.target.matches(".dog-span")){
                const dogSpan = e.target
                const dogInfo = document.querySelector("#dog-info")
                dogInfo.innerHTML = `   
                    <img src=${dogSpan.dataset.image}>
                    <h2>${dogSpan.dataset.name}</h2>
                    <button id="isGoodDog" data-id=${dogSpan.dataset.id}>${dogSpan.dataset.isGoodDog}</button>
                    `
            } else if(e.target.matches("#isGoodDog")){
                const isGoodDogButton = e.target
                const dogInfoDiv = isGoodDogButton.parentElement
                let dogBoolean
                if (isGoodDogButton.innerText === "Good Dog!"){
                    isGoodDogButton.innerText = "Bad Dog!"
                    isGoodDogButton.parentElement.dataset.isGoodDog = "false"
                    dogBoolean = false
                } else if(isGoodDogButton.innerText === "Bad Dog!"){
                    isGoodDogButton.innerText = "Good Dog!"
                    isGoodDogButton.parentElement.dataset.isGoodDog = "true"
                    dogBoolean = true
                } 
                const configObj = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({isGoodDog: dogBoolean})
                }
                // dogSpan.dataset.isGoodDog

                fetch(dogsUrl + isGoodDogButton.dataset.id, configObj)
                .then(response => response.json())
                .then(isGoodDogNewValue => console.log(isGoodDogNewValue))
            }
        })
    }

    clickHandler()
    getDogs()
})