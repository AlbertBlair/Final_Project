const pokeImgElement = document.getElementById('pokemonImg');
let prevPokemonArray = []
let pokemonName = "";
const questionElement = document.getElementById('question');
const choicesContainer = document.getElementById('choices');
let missed = 0;
let score = 0;
const scoreElement = document.getElementById('Value');
const missedTotal = document.getElementById('missed');
let gameStatus = "go"
let tier = '';
const body = document.getElementById('body');
const scoreimg = document.getElementById('score-container');



/*************************************************************************************************/
// FEATURE #3 Retrieve data from a third-party API and use it to display something within your app.
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



/**************************************************************************************************************/
// FEATURE #1 Use arrays, objects, sets or maps to store and retrieve information that is displayed in your app.
/**************************************************************************************************************/   

// get pokemon ID and create multiple choice options by storing the data in arrays. The "RandomNum()" function is in util.js
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


/**********************************************************************************************************************/
// FEATURE #4. Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.
/**********************************************************************************************************************/

//  create multiple choice buttons and event for option chosen by user
choicesContainer.innerHTML = '';
choicesName.forEach((option, index)=> {
    const button = document.createElement("button");
button.textContent = option;
button.onclick = (event) => checkAns(option === pokemon.name, event);
choicesContainer.appendChild(button);
});
}

/****************************************************************************************************/
// FEATURE #2 Create a function that accepts two or more input parameters and 
//returns a value that is calculated or determined by the inputs.
/****************************************************************************************************/

// check answer function
function checkAns(rightAnswer, event){
    const chosenButton = document.querySelector('.chosen');

    if (chosenButton) {
        return;
    }
    event.target.classList.add("chosen");
 
    if (rightAnswer){
        displayAnswer(pokemonName);
        score++;
        scoreElement.textContent = score;
        event.target.classList.add('correct');
        pokeImgElement.classList.add('correct');
        backGroundTier();
        if ( missed >  2){
            gameStatus = "done";
        }
        
    } else if(!rightAnswer){
        
        missed++;
        missedTotal.textContent = missed;
        event.target.classList.add("wrong");
        displayWrong("Wrong Pokemon");
        if ( missed > 2){
            gameStatus = "done"
        }
    }

//  insert a .75s delay before next question
if(gameStatus === 'go'){
setTimeout(()=>{
    event.target.classList.remove('correct');
    pokeImgElement.classList.remove("correct");
    createChoices();

}, 750);
} else{
   const answer = confirm("You got "+score + " Right" + "!\nPlay Again?");

   //reset quiz if user wants to play again
   if (answer){
    gameStatus= 'go';
    prevPokemonArray = [];
    missed = 0;
    score = 0;
    missedTotal.textContent = missed;
    scoreElement.textContent = score;

        //reset tier if needed
        if(tier != ''){
        scoreimg.classList.remove(tier);
        body.classList.remove(tier);
        }
    createChoices();

   }
}

}

// create multiple choice
createChoices();