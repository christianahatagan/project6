//* 2. Select necessary HTML elements: qwerty, phrase and missed.*//
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

//* 3. Create a phrase array *//
const phrases = [
    'hello world',
    'javascript is interesting',
    'keep learning code',
    'happy coding',
    'html and css are a match'
];

//* 4. Hide the start screen overlay *//
const overlay = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');

// Event listener for start button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    resetGame();  // Ensure that when the game restarts, everything is reset
});

//* 5. Create a getRandomPhraseAsArray function *//
function getRandomPhraseAsArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomIndex];
    const charactersArray = randomPhrase.split('');
    return charactersArray;
}

//* 6. Set the game display *//
function addPhraseToDisplay(arr) {
    const phraseUL = document.querySelector('#phrase ul');
    phraseUL.innerHTML = '';  // Clear previous phrase
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        if (arr[i] !== ' ') {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
        phraseUL.appendChild(li);
    }
}

//* 7.Create a checkLetter function *//
function checkLetter(button) {
    const letters = document.querySelectorAll('.letter');
    let matchingLetter = null;

    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        if (letter.textContent.toLowerCase() === button.textContent.toLowerCase()) {
            letter.classList.add('show');
            matchingLetter = letter.textContent;
        }
    }

    return matchingLetter;
}

//* 10. Create a checkWin function *//
function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const shownLetters = document.querySelectorAll('.show');

    if (letters.length === shownLetters.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.querySelector('h2.title').textContent = 'Congratulations! You Win!';
        startButton.textContent = 'Play Again';  // Change button to "Play Again"
    } else if (missed >= 5) {
        overlay.className = 'lose'; 
        overlay.style.display = 'flex'; 
        overlay.querySelector('h2.title').textContent = 'Sorry, You Lost. Try Again!';
        startButton.textContent = 'Play Again';  // Change button to "Play Again"
    }
}

//* 8. Add an event listener to the on-screen keyboard *//
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const buttonClicked = e.target;
        buttonClicked.classList.add('chosen');
        buttonClicked.disabled = true;

        const letterFound = checkLetter(buttonClicked);
        if (letterFound === null) {
            missed++;
            const hearts = document.querySelectorAll('.tries img');
            hearts[missed - 1].src = 'images/lostHeart.png';
        }

        checkWin();  // Check for win or lose conditions after each guess
    }
});

//* 11. Create a resetGame function to restart the game *//
function resetGame() {
    missed = 0;  // Reset missed guesses

    // Reset hearts back to liveHeart.png
    const hearts = document.querySelectorAll('.tries img');
    hearts.forEach(heart => heart.src = 'images/liveHeart.png');

    // Remove all previous letters in the phrase display
    const phraseUL = document.querySelector('#phrase ul');
    phraseUL.innerHTML = '';

    // Reset chosen buttons
    const buttons = document.querySelectorAll('#qwerty button');
    buttons.forEach(button => {
        button.classList.remove('chosen');
        button.disabled = false;
    });

    // Add a new random phrase to the display
    const newPhraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhraseArray);

    // Hide the overlay if it's visible (for game restart)
    overlay.style.display = 'none';
}
