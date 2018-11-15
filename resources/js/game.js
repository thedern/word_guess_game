/* Applicable Rules

- Use key events to listen for the letters that your players will type.
- Display the following on the page:
    . Press any key to get started! <-- DONE
    . Wins: (# of times user guessed the word correctly).
    . If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _. <-- DONE
    . As the user guesses the correct letters, reveal them: m a d o _  _ a.  <--- DONE
    . Number of Guesses Remaining: (# of guesses remaining for the user).
    . Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
    . After the user wins/loses the game should automatically choose another word and make the user play it.

*/

/* ==========================================================================
   Declare Globals
   ========================================================================== */
let remainder;
let selectedAnimal;
let animalHint;
let undercoresArr;
let ranNum;
let animals;

animals = [ 'chicken', 'duck', 'horse', 'cow', 'pig' ];
animalMagic();

function animalMagic() {
    // generate a number between 0 and 4 corresponding to array indexes and select animal from array
    ranNum = Math.floor(Math.random() * animals.length);
    selectedAnimal = animals[ranNum];
    console.log(selectedAnimal);

    // image selector based on animal. Note: src set relative to the html file, NOT the js file
    if (selectedAnimal === 'pig') {
        document.querySelector('#animalImage').src = './resources/img/pig.png';
    } else if (selectedAnimal === 'cow') {
        document.querySelector('#animalImage').src = './resources/img/cow.png';
    } else if (selectedAnimal === 'chicken') {
        document.querySelector('#animalImage').src = './resources/img/chicken.png';
    } else {
        document.querySelector('#animalImage').src = './resources/img/barnStart.jpg';
    }

    // create correct amount of underscores to be displayed on page based on length of animal name
    undercoresArr = [];
    for (let i = 0; i < selectedAnimal.length; i++) {
        undercoresArr[i] = '_';
    }

    remainder = selectedAnimal.length;


    // print underscores to screen based on string length
    animalHint = document.querySelector('#selectedAnimal');
    animalHint.innerText = (undercoresArr.join(' '));
}
/* ==========================================================================
   Key function block
   ========================================================================== */

document.onkeyup = function(e){

    // event listener for keydown on input field only
    const guessInput = document.querySelector('#guessLetter');
    
    //while (remainder > 0) {
        
    // key capture
    let keys = (e.key);
    
    for (let j = 0; j < selectedAnimal.length; j++ ) {
        if (selectedAnimal[j] === keys) {
            undercoresArr[j] = keys;
            remainder -=1; 
            //  console.log(remainder);
                
        } // end if statement

    } // end for loop
    animalHint.innerText = (undercoresArr.join(' '));
    
    if (undercoresArr.join('') === selectedAnimal) {
        document.querySelector('#victory').innerText = 'WINNER!!!!';
        let score = 0;
        score += 1;
        document.querySelector('#wins').innerText += score;
        guessInput.value = '';
        animalMagic();

        // NEED TO LOAD A NEW ANIMAL
    }
    //} //end while loop
        
        
}; // end eventListener
