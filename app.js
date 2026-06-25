/*------------------------ Cached Element References ------------------------*/
// haeder 
const timeE = document.querySelector("#time")
const stateE = document.querySelector("#game-state")
const resetE = document.querySelector("#reset")

// cards
const cardE = document.querySelectorAll(".card")

const frontE = document.querySelectorAll(".card-front")
const backE = document.querySelectorAll(".card-back")

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

const startTimer = 30

/*---------------------------- Variables (state) ----------------------------*/
let frontCard
let backCard

let canFlip = true
let matchs = 0

let seconds = 30
let timerInterval

let isCounting = false

let winner = false

/*-------------------------------- Functions --------------------------------*/
function init() {

    // reset elements
    canFlip = true
    matchs = 0
    winner = false

    clearInterval(timerInterval)
    resetE.disabled = true

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
            backE[index].src = img
        }
    )
}

function flipCard(event) {

}

// called after each 2 flips , if match -> update the vase 
function checkForMatch() {

}

// always updating
function startTimer() {
    isCounting = true

    timeE.textContent = seconds

    timerInterval = setInterval(
        function () {
            timeE.textContent -= seconds
            updateMsg()
        },
        1000
    )
}

// if matches == 6 -> winner = true
function checkForWin() {

}


function updateMsg() {
    if (seconds === 0 && !winner) {
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