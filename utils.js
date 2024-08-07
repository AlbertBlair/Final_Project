// these functions are used for the "WHOSE THAT POKEMON QUIZ"


//get random number limited to first 5 generations of pokemon.
function RandomNum() {
    return Math.floor(Math.random() * 649) + 1;
}

//shuffle array function that uses the Fisher-Yates Algo
function shuffleArr(array){
    for (let i = array.length - 1; i > 0; i--){
        const rand = Math.floor(Math.random() * (i + 1));

        [array[i], array[rand]] =[array[rand], array[i]]
    }
}