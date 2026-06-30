/*------------------------ Cached Element References ------------------------*/
// Modal
const startModalE = document.querySelector("#start-modal")
const startBtnE = document.querySelector("#start")

const pauseModalE = document.querySelector("#pause-modal")
const pauseBtnE = document.querySelector("#pause")
const resumeBtnE = document.querySelector("#resume")
const exitBtnE = document.querySelector("#exit")

// end Modal
const endModalE = document.querySelector("#end-modal")
const stateE = document.querySelector("#game-state-modal")
const matchesE = document.querySelector("#numOfMatches")
const starsE = document.querySelector("#star-rating")
const secE = document.querySelector("#numOfSec")

const resetE = document.querySelector("#reset-modal")


// haeder 
const timeE = document.querySelector("#time")

// cards
const cardE = document.querySelectorAll(".card")

// card backside img
const cardImgsE = document.querySelectorAll(".cardImg")

// vases
const Edaisy = document.querySelector("#daisy")
const Edan = document.querySelector("#dan")
const Elavender = document.querySelector("#lavender")
const Emix = document.querySelector("#mix")
const Esunflower = document.querySelector("#sunflower")
const Etulip = document.querySelector("#tulip")

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

const vasesElement = [
    Edaisy,
    Edan,
    Elavender,
    Emix,
    Esunflower,
    Etulip
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
function startGame() {
    // hide all modals
    startModalE.style.display = "none"
    endModalE.style.display = "none" 
    pauseModalE.style.display = "none" 

    init() // call game init
}

function init() {

    // reset elements
    firstCard = null
    secondCard = null
    canFlip = true

    matchs = 0

    seconds = 45
    clearInterval(timerInterval) // reset timer

    winner = false

    //reset vases
    vasesElement.forEach(
        vase => vase.src = "./assets/vases/Vempty.png"
    )

    startModalE.style.display = "none"
    endModalE.style.display = "none" // hide the modal
    pauseModalE.style.display = "none" //hide the modal
    

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
            seconds--
            timeE.textContent = seconds

            if (seconds === 0) { // check if timer finished
                clearInterval(timerInterval)
                showEndingModal()
            }
        }
        , 1000
    )
}

function flipCard(event) {

    theCard = event.currentTarget // get the clicked card (whole card)

    if (!canFlip) { // check if player can flip a card
        return
    }
    if (theCard.classList.contains("flipped")) { // check if it is already flipped (have the flipped class)
        return
    }
    if (theCard.classList.contains("matched")) { // check if the card is already matched to another card
        return
    }

    // filpping logic
    theCard.classList.add("flipped") // adding "flipped" class to the flipped card

    if (firstCard == null) {
        firstCard = theCard // set the 1st clicked card to firstCard var if it is null
    }
    else {
        if (theCard === firstCard) { // if the same card is re-clicked -> return 
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

    if (firstImg == secImg) {
        console.log('in if')
        console.log(firstImg)
        setTimeout(
            () => {
                firstCardBack.classList.add("matched")
                secondCardBack.classList.add("matched")

                matchs++

                // show vases 
                showVase(firstImg)

                firstCard = null
                secondCard = null
                canFlip = true

                checkForWin()
            }
            , 500
        )
    }
    // if not -> re-flip the card, canFlip = true, reset cards
    else {
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

function showVase(img) {
    const flowerSrc = img.split("/"); //split img src 
    let flower = flowerSrc.pop(); // take the last elemnt in the array of strings

    let vaseSrc = `./assets/vases/V${flower}` // set the vase src

    console.log(flower)
    console.log(vaseSrc)

    let vaseImgIndex = vases.indexOf(vaseSrc); // find the vaseSrc exist in the array of vases
    console.log(vaseImgIndex)
    if (vaseImgIndex !== null || vaseImgIndex !== undefined) { // if exist
        vasesElement[vaseImgIndex].src = vaseSrc // take the 
    }
}

// if matches == 6 -> winner = true
function checkForWin() {
    // after every checkForMatch
    // check if the matches == 6 -> winner = true, call updateMsg()
    if (matchs == 6) {
        winner = true
        showEndingModal()
    }
}

function showEndingModal() {
    let numOfSeconds = 45 - seconds
    clearInterval(timerInterval) // stop the timer

    if (winner){
        stateE.textContent = "You Win!"
        stateE.style.color = "rgb(62, 125, 52)"

        starsE.textContent = "★★★"

        matchesE.textContent = matchs
        secE.textContent = numOfSeconds
    }
    else {
        if (matchs < 2) {
            stateE.textContent = "Time is Up!"
            stateE.style.color = "rgb(199, 68, 68)"

            starsE.textContent = ""

            matchesE.textContent = matchs
            secE.textContent = numOfSeconds
        }
        else if (matchs < 4) {
            stateE.textContent = "Try Next Time!"
            stateE.style.color = "rgb(244, 217, 39)"

            starsE.textContent = "★"

            matchesE.textContent = matchs
            secE.textContent = numOfSeconds
        }
        else {
            stateE.textContent = "Good Work!"
            stateE.style.color = "rgb(244, 217, 39)"

            starsE.textContent = "★★"

            matchesE.textContent = matchs
            secE.textContent = numOfSeconds
        }
    }

    pauseBtnE.disabled = true
    canFlip = false
    endModalE.style.display = "flex"
}

// Pause Game
function showPauseModal(){
    //stop the timer
    clearInterval(timerInterval)

    //show the modal
    pauseModalE.style.display = "flex"
}

function resumeGame(){
    //resume the timer
    startTimer()

    //hide the modal
    pauseModalE.style.display = "none"
}

function exitGame(){
    // stop timer
    clearInterval(timerInterval)

    // hide modal
    pauseModalE.style.display = "none"

    // show game start modal
    startModalE.style.display = "flex"
}

/*----------------------------- Event Listeners -----------------------------*/
startBtnE.addEventListener('click', startGame)
pauseBtnE.addEventListener('click', showPauseModal)
resumeBtnE.addEventListener('click', resumeGame)
exitBtnE.addEventListener('click', exitGame)

resetE.addEventListener('click', init)

cardE.forEach(
    card => card.addEventListener('click', flipCard)
)
