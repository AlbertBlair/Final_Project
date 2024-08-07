const pokeImgElement = document.getElementById('pokemonImg');


/*************************************************************************************************/
// FEATURE #4 Retrieve data from a third-party API and use it to display something within your app.
/*************************************************************************************************/

// Get pokemon data from PokeAPI by using pokemon's ID number
async function fetchPokemonData(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const apiData= await response.json();
    return apiData;
}

//immediate invoked func used to test if "RandomNum" and "fetchPokemonData" functions are working. - success
(async () => {
    let pokeId = RandomNum();
    const poke = await fetchPokemonData(pokeId);
    pokeImgElement.src = poke.sprites.other.home.front_default;
    console.log("functions are working!");
})()
