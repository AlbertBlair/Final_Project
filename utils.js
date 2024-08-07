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

  // Show correct answer
  function displayAnswer(result) {
    questionElement.textContent = "It's " + result + "!";
  }

  // show answer is wrong pokemon
  function displayWrong() {
    questionElement.textContent = "Wrong Pokemon!";
  }

  // change background and score when certain score is met
  function backGroundTier(){
    if (score >= 25){
        scoreimg.classList.remove('masterball');
        body.classList.remove('masterball');
        scoreimg.classList.add('gsball');
        body.classList.add('gsball');
        tier = 'gsball';
    } else if (score >= 15) {
        scoreimg.classList.remove('ultraball');
        body.classList.remove('ultraball');
        scoreimg.classList.add('masterball');
        body.classList.add('masterball');
        tier = 'masterball';
    } else if (score >= 8) {
        scoreimg.classList.remove('greatball');
        body.classList.remove('greatball');
        scoreimg.classList.add('ultraball');
        body.classList.add('ultraball');
        tier = 'ultraball';

    } else if (score >= 4){
        scoreimg.classList.add('greatball');
        body.classList.add('greatball');     
        tier = 'greatball' ;
    }
}