const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector("#overlay")

const phrases = [
    'dime a dozen',
    'yikes',
    'yolo',
    'messing around',
    'down to earth'
];

let missed = 0;

startGame.addEventListener('click',(event) => {
    event.target.style.display = 'none';
    overlay.style.visibility = 'hidden';
});

function getRandomPhraseAsArray(arr){
    const randomNumber = (Math.floor(Math.random() * arr.length));
    const randomPhrase = arr[randomNumber];
    return randomPhrase.split("");
}

//Sets Game display

function addPhraseToDisplay(arr){ 
    for (let char of arr) {
        const phrasesUl = document.querySelector('#phrasesUl');
        const newLi = document.createElement('li');
        newLi.innerHTML = char;
        phrasesUl.appendChild(newLi);
        if (char !== ' ') {
            newLi.classList.add('letter');
        }
        else {
            newLi.classList.add('space');
        }
    };
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 


function checkLetter(btn) {
    const letters = document.querySelectorAll('.letter');

    let letterMatch = null;

    for (letter of letters){
        if (btn.innerText === letter.innerText) {
            letter.classList.add('show');
            letterMatch = letter;
        }
    }
    return letterMatch;
}

function checkWin(){
    const phraseLetters = document.querySelectorAll('.letter');
    const correctLetters = document.querySelectorAll('.show');

    const winMessage = document.createElement('h2');
    winMessage.innerText = 'You Win, Congratulations!';
    const loseMessage = document.createElement('h2');
    loseMessage.innerText = 'Better Luck Next Time : (';

    if (phraseLetters.length === correctLetters.length) {
        overlay.classList.add('win');
        overlay.style.visibility = 'visible';
        overlay.appendChild(winMessage);
    }
    if (missed >=  5) {
        overlay.classList.add('lose');
        overlay.style.visibility = 'visible';
        overlay.appendChild(loseMessage);
    }
}


qwerty.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON') {
        event.target.classList.add('chosen');
        event.target.setAttribute("disabled", "true");

        const letterFound = checkLetter(event.target);
    
        const scoreboard = document.querySelector('#scoreboard ol')
        const tries = document.querySelectorAll('.tries');

        if (letterFound === null) {
            missed ++;
            scoreboard.removeChild(tries[0]);
        }
    }
    checkWin();
});

