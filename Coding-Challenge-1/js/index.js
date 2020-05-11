let fetchData = (query) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${query}/`

    let setting = {
        method: 'GET'
    }

    let resultsHTML = document.querySelector('.js-search-results');

    fetch(url,setting) 
    .then((result) => {
        if(result.ok)
            return result.json();
        else
            throw new Error;
    }).then((result) => {
        resultsHTML.innerHTML = `<div>${result.name}</div><img src="${result.sprites.front_shiny}"/>`;
        resultsHTML.innerHTML += `<div>MOVES</div>`;
        for(let move of result.moves) {
            resultsHTML.innerHTML += `<div>${move.move.name}</div>`
        }

        resultsHTML.innerHTML += `<div>STATS</div>`;
        for(let move of result.stats) {
            resultsHTML.innerHTML += `<div>${move.base_stat}</div>`
        }
    }).catch((err) => {
        console.log(err)
        resultsHTML.innerText = "Pokemon Not found";
    });
}

let watchForm = () => {
    let form = document.querySelector('.js-search-form');

    form.addEventListener('submit', function(e){
        e.preventDefault();

        let query = document.querySelector('#query').value;

        if(query !== "")
            fetchData(query);
        else {
            let resultsHTML = document.querySelector('.js-search-results');
            resultsHTML.innerText = "add a name or id to continue"
        }
    })
}

let init = () => {
    watchForm();
}

init();