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
    "./assets/vases/daisy.png",
    "./assets/vases/daisy.png",
    "./assets/vases/dan.png",
    "./assets/vases/dan.png",
    "./assets/vases/lavender.png",
    "./assets/vases/lavender.png",
    "./assets/vases/mix.png",
    "./assets/vases/mix.png",
    "./assets/vases/sunflower.png",
    "./assets/vases/sunflower.png",
    "./assets/vases/tulip.png",
    "./assets/vases/tulip.png"
]


/*---------------------------- Variables (state) ----------------------------*/
let frontCard
let backCard

let canFlip = true
let matchs = 0

let seconds = 30
let timerInterval

let winner = false

/*-------------------------------- Functions --------------------------------*/
function init() {

    // reset elements
    frontCard = null
    backCard = null
    
    canFlip = true
    matchs = 0
    winner = false

    seconds = 30

    stateE.textContent = ""
    stateE.style.color = ""

    clearInterval(timerInterval) // reset timer

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

    // loop and set the img to the backCard
    cardImgs.forEach(
        function (img, index) {
            cardImgsE[index].src = img
        }
    )
}

function flipCard(event) {

    const card = event.currentTarget

    if (!canFlip){
        return
    }
    if (card.classList.contains("flipped")){ // check if it is already flipped (have the flipped class)
        return
    }
    

    // filpping logic
    card.classList.add("flipped")
     
    if (frontCard == null){
        frontCard = event.target
    }
    else {
        if (card === frontCard){
            return
        }

        backCard = event.target
        canFlip = false

        checkForMatch()
    }

}

// called after each 2 flips , if match -> update the vase 
function checkForMatch() {

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

// if matches == 6 -> winner = true
function checkForWin() {

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

console.log(backE)