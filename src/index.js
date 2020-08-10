
document.addEventListener("DOMContentLoaded", () => {


    const getDogs = async () => {

        let url = "http://localhost:3000/pups/"

        let response = await fetch(url)
        let result = await response.json()
        return result;
    }

    const renderDogsForBar = async () => {
        let dogs = await getDogs();
        console.log(dogs)
        dogs.forEach(dog => {
            renderDogOnBar(dog);
            generateDogFrags(dog);
        });

    }

    const dogBarDiv = document.getElementById("dog-bar");

    const renderDogOnBar = (dogObj) => {
        const span = document.createElement("span");
        span.classList.add("dog-navbar-card")
        span.innerHTML = `${dogObj.name}`
        dogBarDiv.appendChild(span);
    }

    const dogInfoDiv = document.getElementById("dog-info");
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
            <button>${isGoodDogBtn()}</button>
        `
        // dogInfoDiv.appendChild(dogShowDiv);
    }

    const dogShowHandler = () => {

        // helper method to filter fragment docs for fun
        // alternative to CSS hidden attribute
        const filterByDogName = (target) => {
            for (const dog of dogShowFrag.children) {
                const dogShowCard = dog.innerHTML.replace(/^\s+|\s+$/g, "");

                const regex = new RegExp(target, 'gi'); 
                // debugger;
                if (dogShowCard.match(regex) && dogShowCard.match(regex)[0] === target) {
                    console.log(dogShowCard.match(regex)[0].index);
                    return dogShowCard;
                } else {
                    console.log("nope");
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
    }


    renderDogsForBar();
    dogShowHandler();

})