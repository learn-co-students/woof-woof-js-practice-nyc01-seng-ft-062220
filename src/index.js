document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/pups/'
    function fetchPups() {
        fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(pups =>
            pups.forEach(renderPups))
            
            const renderPups = (pups) => {
                let div = document.getElementById('dog-bar')
                span = document.createElement('span')
                span.classList.add('pup-card')
                span.innerText = pups.name
                span.dataset.dogId = pups.id
                
                div.appendChild(span)
                
            }
        }

        let dogId
        document.addEventListener('click', (event) => {
            // debugger
            if(event.target.nodeName === 'SPAN') {
                dogId = event.target.dataset.dogId
                // if(pups.isGoodDog === 'true') {
                    //     return "Good Dog !"
                    // }else 
                    // return "Bad Dog !"
                    const dogDiv = document.querySelector('#dog-info')
                    let dogButtonText 
                    // const dogId =event.target.dataset.dogId
                fetch(url + dogId)
                .then(response => response.json())
                .then(pups => {
                    
                    if(pups.isGoodDog === true) {
                        dogButtonText = "Good Dog!"
                    }else {
                        dogButtonText = "Bad Dog!"
                    }
                    dogDiv.innerHTML = `
                    <img src=${pups.image}> <h2>${pups.name}</h2> <button>${dogButtonText}</button>
                    `
                })
                
            }else if(event.target.tagName === "BUTTON") {
                let status
                if(event.target.innerText === "Good Dog!") {
                    event.target.innerText = "Bad Dog!"
                    status = false 
                }else {
                    event.target.innerText = "Good Dog!"
                    status = true 
                } 
            
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({isGoodDog: status })
            }
            
            fetch(url + dogId, options)
            .then(response => response.json())
            }
            
            
            
            
            
        })
        

    

        
fetchPups()
})


    


