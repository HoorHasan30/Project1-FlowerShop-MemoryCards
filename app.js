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
let theCard

let firstCard
let secondCard

let canFlip = true
let matchs = 0

let seconds = 45
let timerInterval

let winner = false

/*-------------------------------- Functions --------------------------------*/
function init() {

    // reset elements
    firstCard = null
    secondCard = null
    canFlip = true

    matchs = 0

    seconds = 45
    clearInterval(timerInterval) // reset timer

    winner = false

    stateE.textContent = ""
    stateE.style.color = ""

    resetE.disabled = true // disable "play again" btn 

    //backE.children[0].classList.remove("matched")

    getCards()
    startTimer()
}

function getCards() {

    // flip cards
    cardE.forEach(
        function (card) {
            card.classList.remove("flipped")
            card.children[1].classList.remove("matched")
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
        }
        ,1000
    )
}

function flipCard(event) {

    theCard = event.currentTarget // get the clicked card (whole card)

    if (!canFlip){ // check if player can flip a card
        return
    }
    if (theCard.classList.contains("flipped")){ // check if it is already flipped (have the flipped class)
        return
    }
    if (theCard.classList.contains("matched")){ // check if the card is already matched to another card
        return
    }
    
    // filpping logic
    theCard.classList.add("flipped") // adding "flipped" class to the flipped card

    if (firstCard == null){
        firstCard = theCard // set the 1st clicked card to firstCard var if it is null
    }
    else {
        if (theCard === firstCard){ // if the same card is re-clicked -> return 
            return
        }

        secondCard = theCard // set the 2nd card
        canFlip = false // prevent user from flip until check for match of the 2 clicked cards

        checkForMatch()
    }

}

// called after each 2 flips , if match -> update the vase 
function checkForMatch(event) {

    console.log('check function')
    // check if both have the same img 
        // if so -> keep flipped, match++, canFlip = true, reset cards, show the vase that have the same type of flowers, call checkForWin
        let firstCardBack = firstCard.children[1]
        let secondCardBack = secondCard.children[1]
        
        let firstImg = firstCard.children[1].children[0].src
        let secImg = secondCard.children[1].children[0].src

        if (firstImg == secImg){
            console.log('in if')
            setTimeout(
                () => {
                    firstCardBack.classList.add("matched")
                    secondCardBack.classList.add("matched")

                    matchs ++
                    
                    // show vases 

                    firstCard = null
                    secondCard = null
                    canFlip = true

                    checkForWin()
                }
                ,
            )
        }
        // if not -> re-flip the card, canFlip = true, reset cards
        else{
            console.log('else')
            setTimeout(
                () => {
                    // re-flip the cards
                    firstCard.classList.remove("flipped")
                    secondCard.classList.remove("flipped")

                    firstCard = null
                    secondCard = null
                    canFlip = true
                }
                ,500
            )
        }
}

// if matches == 6 -> winner = true
function checkForWin() {
    // after every checkForMatch
    // check if the matches == 6 -> winner = true, call updateMsg()
    if (matchs == 6){
        winner = true
        clearInterval(timerInterval)
        updateMsg()
    }
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
