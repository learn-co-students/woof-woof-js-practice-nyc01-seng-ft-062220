
document.addEventListener("DOMContentLoaded", () => {


    const getDogs = async () => {

        let url = "http://localhost:3000/pups/"

        let response = await fetch(url)
        let result = await response.json()
        return result;
    }

    const renderDogsForBar = async () => {
        let dogs = await getDogs();

        dogs.forEach(dog => renderDogOnBar(dog));

    }

    const dogBarDiv = document.getElementById("dog-bar")
    const renderDogOnBar = (dogObj) => {
        const span = document.createElement("span");
        span.classList.add("dog-navbar-card")
        span.innerHTML = `${dogObj.name}`
        dogBarDiv.appendChild(span);
    }



    renderDogsForBar();


})