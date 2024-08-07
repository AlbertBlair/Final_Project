const pokeImgElement = document.getElementById('pokemonImg');
let prevPokemonArray = []
let pokemonName = "";
const questionElement = document.getElementById('question');
const choicesContainer = document.getElementById('choices');


/*************************************************************************************************/
// FEATURE #4 Retrieve data from a third-party API and use it to display something within your app.
/*************************************************************************************************/

// Get pokemon data from PokeAPI by using pokemon's ID number
async function fetchPokemonData(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const apiData= await response.json();
    return apiData;
}

//testing if "RandomNum" and "fetchPokemonData" functions are working to pull random pokemon's data. - Successful, commented out
    // (async () => {
    //     let pokeId = RandomNum();
    //     const poke = await fetchPokemonData(pokeId);
    //     pokeImgElement.src = poke.sprites.other.home.front_default;
    //     console.log("functions are working!");
    // })()


// get pokemon ID and create multiple choice. "RandomNum()" function is util.js
async function createChoices(){
    let pokeId = RandomNum();

    while(prevPokemonArray.includes(pokeId)){
        pokeId = RandomNum()
        }
    prevPokemonArray.push(pokeId);
    const pokemon = await fetchPokemonData(pokeId);
    
    const choicesName = [pokemon.name];
    const choicesId = [pokemon.id];

    // for loop to pull 3 additional random pokemon for mulitple choice. should have 4 choices total.
        for (let i = choicesName.length; choicesName.length < 4; i++){
        let randPokeId = RandomNum();

        while(choicesId.includes(randPokeId)){
            randPokeId = RandomNum();
        }
        choicesId.push(randPokeId);

        const randPokemon = await fetchPokemonData(randPokeId);
        const randPokemonName = randPokemon.name;
        choicesName.push(randPokemonName);

        pokemonName = choicesName[0];

}
// call "shuffleArr" function, found in Util.js
shuffleArr(choicesName);

//reset question and pokeImg elements
questionElement.textContent = "Who's That Pokemon?";
pokeImgElement.src = pokemon.sprites.other.home.front_default;

//  create multiple choice buttons and event for option chosen by user
choicesContainer.innerHTML = '';
choicesName.forEach((option, index)=> {
    const button = document.createElement("button");
button.textContent = option;
button.onclick = (event) => checkAns(option === pokemon.name, event);
choicesContainer.appendChild(button);
});
}

createChoices();