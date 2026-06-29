/*------------------------ Cached Element References ------------------------*/
// haeder 
const timeE = document.querySelector("#time")
const stateE = document.querySelector("#game-state")
const resetE = document.querySelector("#reset")

// cards
const cardE = document.querySelectorAll(".card")

// cards side
const frontE = document.querySelectorAll(".card-front")
const backE = document.querySelectorAll(".card-back")

// card backside img
const cardImgsE = document.querySelectorAll(".cardImg")

// vases
const daisyE = document.querySelector("#daisy")
const danE = document.querySelector("#dan")
const lavenderE = document.querySelector("#lavender")
const mixE = document.querySelector("#mix")
const sunflowerE = document.querySelector("#sunflower")
const tulipE = document.querySelector("#tulip")

/*-------------------------------- Constants --------------------------------*/
const imgs = [
    "./assets/flowers/daisy.png",
    "./assets/flowers/daisy.png",
    "./assets/flowers/dan.png",
    "./assets/flowers/dan.png",
    "./assets/flowers/lavender.png",
    "./assets/flowers/lavender.png",
    "./assets/flowers/mix.png",
    "./assets/flowers/mix.png",
    "./assets/flowers/sunflower.png",
    "./assets/flowers/sunflower.png",
    "./assets/flowers/tulip.png",
    "./assets/flowers/tulip.png"
]

const vases = [
    "./assets/vases/Vdaisy.png",
    "./assets/vases/Vdan.png",
    "./assets/vases/Vlavender.png",
    "./assets/vases/Vmix.png",
    "./assets/vases/Vsunflower.png",
    "./assets/vases/Vtulip.png"
]

/*---------------------------- Variables (state) ----------------------------*/
let firstCard
let secondCard

let canFlip = true
let matchs = 0

let seconds = 30
let timerInterval

let winner = false

/*-------------------------------- Functions --------------------------------*/
function init() {

    // reset elements
    firstCard = null
    secondCard = null
    
    canFlip = true
    matchs = 0

    seconds = 30
    clearInterval(timerInterval) // reset timer

    winner = false

    stateE.textContent = ""
    stateE.style.color = ""

    resetE.disabled = true // disable "play again" btn 

    getCards()
    startTimer()
}

function getCards() {

    // flip cards
    cardE.forEach(
        function (card) {
            card.classList.remove("flipped")
        }
    )
    
    // create a copy of img array
    const cardImgs = imgs.map(img => img)

    // shuffle the array
    cardImgs.sort(
        function () {
            return Math.random() - 0.5
        }
    )

    // loop and set the img to the card
    cardImgs.forEach(
        function (img, index) {
            cardImgsE[index].src = img
        }
    )
}

// always updating
function startTimer() {
    timeE.textContent = seconds

    timerInterval = setInterval(
        function () {
            seconds --
            timeE.textContent = seconds
           
            if (seconds === 0) { // check if timer finished
                clearInterval(timerInterval)
                updateMsg()
            }
        },
        1000
    )
}

function flipCard(event) {

    const card = event.currentTarget // get the clicked card (whole card)

    if (!canFlip){ // check if player can flip a card
        return
    }
    if (card.classList.contains("flipped")){ // check if it is already flipped (have the flipped class)
        return
    }
    
    // filpping logic
    card.classList.add("flipped") // adding "flipped" class to the flipped card

    if (firstCard == null){
        firstCard = event.target // set the 1st clicked card to firstCard var if it is null
    }
    else {
        if (card === firstCard){ // if the same card is re-clicked -> return 
            return
        }

        secondCard = event.target // set the 2nd card
        canFlip = false // prevent user from flip until check for match of the 2 clicked cards

        checkForMatch()
    }

}

// called after each 2 flips , if match -> update the vase 
function checkForMatch() {

    // check if both have the same img 
        // if so -> keep flipped, match++, canFlip = true, show the vase that have the same type of flowers, call checkForWin

        // if not -> re-flip the card, canFlip = true, return
}

// if matches == 6 -> winner = true
function checkForWin() {
    // after every checkForMatch
    // check if the matches == 6 -> winner = true, call updateMsg()

}

function updateMsg() {
    if (seconds === 0 && !winner) {
        clearInterval(timerInterval)

        stateE.textContent = "Time is Up! You Lose!"
        stateE.style.color = "rgb(199, 68, 68)"

        canFlip = false
        resetE.disabled = false
    }
    else {
        stateE.textContent = "You Win!"
        stateE.style.color = "rgb(111, 185, 99)"

        canFlip = false
        resetE.disabled = false
    }
}

init()


/*----------------------------- Event Listeners -----------------------------*/
resetE.addEventListener('click', init)


cardE.forEach(
    card => card.addEventListener('click', flipCard)
)
