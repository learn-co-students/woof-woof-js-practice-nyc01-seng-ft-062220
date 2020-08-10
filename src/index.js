
document.addEventListener("DOMContentLoaded", () => {

    const getDogs = async () => {

        let url = "http://localhost:3000/pups/";

        let response = await fetch(url);
        let result = await response.json();
        return result;
    }

    const renderDogsForBar = async () => {
        let dogs = await getDogs();
        dogs.forEach(dog => {
            renderDogOnBar(dog);
            generateDogFrags(dog);
        });

    }

    const updateDogsForShow = async (dogId, isGoodDogBool) => {
        let url = `http://localhost:3000/pups/${dogId}`

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({isGoodDog: isGoodDogBool})
        }
        const response = await fetch(url, configObj);
        const result = await response.json();
        //console.log(result);
    }

    const dogBarDiv = document.getElementById("dog-bar");

    const renderDogOnBar = (dogObj) => {
        const span = document.createElement("span");
        span.classList.add("dog-navbar-card");
        span.innerHTML = `${dogObj.name}`;
        dogBarDiv.appendChild(span);
    }

    const dogShowFrag = new DocumentFragment();

    const generateDogFrags = (dogObj) => {
        // isGoodDog Helper function
        const isGoodDogBtn = () => {
            if (dogObj.isGoodDog){
                return "Bad Dog!";
            } else {
                return "Good Dog!";
            }
        }
        const dogShowDiv = document.createElement("div");
        dogShowDiv.classList.add("dog-show-card");
        dogShowFrag.appendChild(dogShowDiv);
        dogShowDiv.innerHTML = `
            <img src=${dogObj.image} />
            <h2>${dogObj.name}</h2>
            <button id=${dogObj.id}>${isGoodDogBtn()}</button>
        `
    }

    const dogShowHandler = () => {
        // helper method to filter fragment docs for fun
        // alternative to CSS hidden attribute
        const filterByDogName = (target) => {
            for (const dog of dogShowFrag.children) {
                const dogShowCard = dog.innerHTML.replace(/^\s+|\s+$/g, "");

                const regex = new RegExp(target, 'gi'); 

                if (dogShowCard.match(regex) && dogShowCard.match(regex)[0] === target) {
                    return dogShowCard;
                }
            }
        }

        const dogBarDiv = document.getElementById("dog-bar");

        dogBarDiv.addEventListener("click", e => {
            let dogShowCard = filterByDogName(e.target.textContent);
        
            if (dogShowCard) {
                const container = document.getElementById("dog-info");
                container.innerHTML = dogShowCard
            }
        })

        const dogInfoDiv = document.getElementById("dog-info");

        // toggle button + patch
        dogInfoDiv.addEventListener("click", e => {
            // debugger;
            let isGoodDogBtn = e.target;

            switch (isGoodDogBtn.textContent) {
                case "Good Dog!":
                    console.log("making doggo good")
                    isGoodDogBtn.textContent = "Bad Dog!";
                    updateDogsForShow(isGoodDogBtn.id, true);
                    break;
                case "Bad Dog!":
                    console.log("badd boiii")
                    isGoodDogBtn.textContent = "Good Dog!";
                    updateDogsForShow(isGoodDogBtn.id, false);
                    break;
            }
        })

    }

    renderDogsForBar();
    dogShowHandler();

})