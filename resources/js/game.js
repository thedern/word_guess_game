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

let selectedAnimal;
let animalHint;
let undercoresArr;
let ranNum;
let animals;
let keyCounter = 0;
let winsScore = 0;
let lossesScore = 0;

const guessInput = document.querySelector('#guessLetter');
const letterUsed = document.querySelector('#lettersUsed');
const lettersCounted = document.querySelector('#lettersCounted');
const victory = document.querySelector('#victory');

animals = [ 'chicken', 'duck', 'horse', 'cow', 'pig' ];


/* ==========================================================================
   Initialize Game
   ========================================================================== */

// game initialization function
animalMagic();

function animalMagic() {
    // generate a number between 0 and 4 corresponding to array indexes and select animal from array
    ranNum = Math.floor(Math.random() * animals.length);
    selectedAnimal = animals[ranNum];

    // image selector based on animal. Note: src set relative to the html file, NOT the js file
    if (selectedAnimal === 'pig') {
        document.querySelector('#animalImage').src = './resources/img/pig.png';
    } else if (selectedAnimal === 'cow') {
        document.querySelector('#animalImage').src = './resources/img/cow.png';
    } else if (selectedAnimal === 'chicken') {
        document.querySelector('#animalImage').src = './resources/img/chicken.png';
    } else if (selectedAnimal === 'duck') {
        document.querySelector('#animalImage').src = './resources/img/duck.png';
    } else if (selectedAnimal === 'horse') {
        document.querySelector('#animalImage').src = './resources/img/horse.png';
    } else {
        document.querySelector('#animalImage').src = './resources/img/barnStart.jpg';
    }

    // create correct amount of underscores to be displayed on page based on length of animal name
    undercoresArr = [];
    for (let i = 0; i < selectedAnimal.length; i++) {
        undercoresArr[i] = '_';
    }

    // print underscores to screen based on selected animal string length
    animalHint = document.querySelector('#selectedAnimal');
    animalHint.textContent = (undercoresArr.join(' '));

    // set/reset Guess, letters counted, and Victory display
    letterUsed.textContent = 'Letters Guessed: ';
    lettersCounted.textContent = 'Letters Counted: ';
    victory.textContent = '';
    

}


/* ==========================================================================
   Key function block
   ========================================================================== */

document.onkeyup = function(e){

    // key capture on event
    let keys = (e.key);
    // validate key input
    let badKeys = ['Backspace','Tab','Space','Shift','Enter'];
    let pattern = new RegExp('[a-z]');
    let result = pattern.test(keys);
    if (result === false || badKeys.includes(keys)) {
        alert('please use lowercase a - z characters only');
    }
    

    // increment keyCounter used to determine losses
    keyCounter += 1;

    /*
       Check for Loose Scenario
       ========================================================================== */
    
    // check if keyCounter is greater than length of selected animal, bail out if greater
    if (keyCounter > selectedAnimal.length) {
        // clear input field
        guessInput.value = '';
        // clear letters guessed
        letterUsed.textContent = '';
        // clear letters counted
        lettersCounted.textContent = '';
        // display message
        victory.textContent = 'You loose!!!!';
        // display losses
        lossesScore +=1;
        document.querySelector('#losses').textContent = `Number of Losses: ${lossesScore}`;
        // reset keyCounter
        keyCounter = 0;
        // Innterupt game and load new animal
        setTimeout(animalMagic, 1000);
    }

    /*
       If Keycount not Exceeded; Evaluate Keyboard Input
       ========================================================================== */
    
    // loop through selected animal string and check for matches with capture key event
    for (let j = 0; j < selectedAnimal.length; j++ ) {
        if (selectedAnimal[j] === keys) {
            // replace underscore if match
            undercoresArr[j] = keys;
        }

    } // end for loop

    // write letters used to screen if and only if entries are valid
    // if true, do NOTHING, else print keys to screen
    if (badKeys.includes(keys));
    else {
        letterUsed.textContent += keys;
    }

    // write letters count to screen
    lettersCounted.textContent = `Letters Counted: ${keyCounter}`;
   
    // print to screen refactored underscores array that
    animalHint.textContent = (undercoresArr.join(' '));


    /*
       Check for Win Scenario
       ========================================================================== */
    
    // check if underscore string(from array) matches the selected animal
    if (undercoresArr.join('') === selectedAnimal) {
        victory.textContent = 'WINNER!!!!';
        // increment score
        winsScore += 1;
        document.querySelector('#wins').textContent = `Number of Wins: ${winsScore}`;
        // clear input field
        guessInput.value = '';
        // reset keyCounter
        keyCounter = 0;

        // load new animal after 1 second, else execution is too fast to see last letter populate array, then to screen
        setTimeout(animalMagic, 1000);

    }
            
}; // end eventListener
