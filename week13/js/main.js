import Button from './button.js'

// Get the button container div from the dom
const board = document.getElementById("btn-container");
const gameEnd = document.getElementById("finish");

// This array handles the random buttons generated
// from the button class
let btnArray = [];
let currentBoard = [];
let currentHeldDice = [];
let numRolls = 1;

// This is the removeChildren function
const removeChildren = () => {
    board.innerHTML = ''
}

// This is the isHeld function
const toggleHold = (e) => {
    e.target.classList.value === "held" ? true : false;
}

// This is the addHeldClass function
const addHeldClass = (e) => {
    if (e.target.classList.value === "") {
        e.target.classList.value = "held";
        currentHeldDice.push(e.target)
    } else if (e.target.classList.value === "held") {
        e.target.classList.value = "";
        currentHeldDice.pop(e.target)
    }
}

// this is the balanceBoard function.
const balanceBoard = () => {
    // balance held dice vs randomly appearing dice.
    let numHeldDice = currentHeldDice.length
    let randomDice = btnArray.length
    let btnArray2 = []

    for (let i = 0; i < (randomDice - numHeldDice); i++) {
        btnArray2.push(btnArray[i])
    }
    return btnArray2
}

// Tell the user the game is done
const gameDone = () => {
    gameEnd.innerHTML = `Awesome! You finished the round in ${numRolls} rolls!`
}

// Board of dice function
const boardOfDice = () => {
    // New button object
    removeChildren();
    const btn = new Button();
    btnArray = [...btn.createButtonArray()];

    // Gather the held dice into an array.

    const btnArray2 = balanceBoard()

    currentBoard = [...currentHeldDice, ...btnArray2];
    currentBoard.forEach(btn => {
        board.appendChild(btn);
    })
    numRolls++;
    currentBoard.forEach(btn => btn.addEventListener("click", addHeldClass));
    newGamePlayBtn.innerHTML = (btnArray.length === 0) ? "New Game" : "Roll";
    console.log(currentHeldDice.length)
    if (currentHeldDice.length === 10) {
        gameDone();
    }
}


// Grab the play button from the dom.
const newGamePlayBtn = document.getElementById("play-btn")
newGamePlayBtn.innerHTML = (btnArray.length === 0) ? "New Game" : "Roll";

// Add an event listener to play button
newGamePlayBtn.addEventListener("click", boardOfDice)











