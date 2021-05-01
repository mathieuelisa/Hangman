
const wordEl = document.querySelector(".word")
const wrongLetterEl= document.querySelector("#wrong-letters")
const notification = document.querySelector(".notification-container")
const finalMessage = document.querySelector("#final-message")
const playAgainBtn = document.querySelector("#play-button")
const result = document.querySelector(".result-container")
const figureParts = document.querySelectorAll(".figure-part")

/** Variables */
let correctLetter = []
let wrongLetter = []
let data = "";

// Function for get country data 
function beforeStart(){
    // fetch("https://randomuser.me/api")
    fetch("https://randomuser.me/api")
    .then(res => res.json())
    .then(response => {
        const user = response.results[0]
        const newCountry = user.location.country.toLowerCase();
        data = newCountry;

        // Get the country in your log
        console.log(newCountry)
        displayTheWord();
    });
}

function displayTheWord (){
    if(data.length > 0){
        wordEl.innerHTML = `${data
            .split("")
            .map(letter =>`<span class="letter">
                ${correctLetter.includes(letter) ? letter : " "}
                        </span>`)
            .join("")}
            `;

            // For get all the letter on the same line
            const innerWord = wordEl.innerText.replace(/\n/g,"")

        if(innerWord === data){
            finalMessage.style.display = "block"
            finalMessage.innerText = "Congrat's You Win !"
            playAgainBtn.style.display = "block"
        }
    }
}

const start = ()=>{

    //Function for show the wrong letters selected in the DOM + figure-part
    function wrongLettersSelected(){
            // put all letters in the DOM after get wrong
        wrongLetterEl.innerHTML = `
            ${wrongLetter.length > 0 ? "<p>WRONG LETTERS: </p>" : " "}
            ${wrongLetter.map(letter => `<span> ${letter} </span>`)}
        `;
            // Put the figure for all letters wrong
        figureParts.forEach((part,index) => {
            const errors = wrongLetter.length;

            if(index < errors) {
                part.style.display = "block"
            } else {
                part.style.display = "none"
            }
        });
            // Message if you loose
            if(wrongLetter.length === figureParts.length){
                finalMessage.style.display = "block"
                finalMessage.innerText = "Sorry You Lose !"
                playAgainBtn.style.display = "block"
                playAgainBtn.innerText = "Try again ?"
                wrongLetterEl.innerText = `THE GOOD WORD WAS: ${data}`
            }
    };

    // Function for show notifications alreeady pressed by the user
    function allreadyPressed() {
        notification.classList.add('show');
    
        setTimeout( function(){
        notification.classList.remove('show');
        }, 3000);
    }
    // Buttons and functions for reset all the game
    playAgainBtn.addEventListener("click", function(){
        correctLetter = [];
        wrongLetter = []
        
        displayTheWord()
        
        wrongLettersSelected()


        playAgainBtn.style.display ="none"
        finalMessage.style.display ="none"

        beforeStart()
    })

    // Keypressed on the DOM
    window.addEventListener("keypress", function(event){
        if(event.keyCode >= 97 && event.keyCode <= 122){
            const keyPressed = event.key
            if(data.includes(keyPressed)){
                if(!correctLetter.includes(keyPressed)){
                    correctLetter.push(keyPressed)
                    displayTheWord()
                } else {
                    allreadyPressed()
                }
            } else{
                if(!wrongLetter.includes(keyPressed)){
                wrongLetter.push(keyPressed)

                    wrongLettersSelected()
                } else{
                    allreadyPressed()
                }
            }
        }
        });
    displayTheWord()

}

document.addEventListener('DOMContentLoaded', function() {
    beforeStart();
    start();
}, false);
