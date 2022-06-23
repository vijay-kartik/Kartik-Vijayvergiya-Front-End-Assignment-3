// declare DOM node variables 
const inputElement = document.querySelector('input');
const messageArea = document.querySelector(".message");
const restartBtn = document.querySelector('button');
const errorTextField = document.querySelector('#errors-text');
const accuracyTextField = document.querySelector('#accuracy-text');
const timedText = document.getElementById("time-text");
const cpmDiv = document.getElementById("cpm");

// declare data variables
const typingTextStrings = [
    "Carbon dioxide is a chemical compound that is usually in the form of a gas.", 
    "Valuable ores lay hidden beneath Death Valley.", 
    "The sport of mountain biking is one of the best active sports you can partake in", 
    "They did nothing as the raccoon attacked the lady’s bag of food.",
    "Be like the flower that gives its fragrance to even the hand that crushes it.",
    "Shoot for the moon, even if you fail, you'll land among the stars.",
    "Arise, awake, stop not till the goal is reached.", 
    "Boredom can be a lethal thing on a small island.", 
    "While Mount Everest is the highest altitude mountain, the tallest mountain on earth is Mauna Kea.", 
    "Bubbles are the number one cause of damage to ship propellers."
];
const introMessage = "Click the area below to start the game."
const restartMessage = "Click on restart to start a new game."
const colors = ["black", "green", "red"];
let timerId = -1;
let timePassed = 0;
let errorCount = 0;
let globalErrorCount = 0;
let currentStringIndex = 0;
let cpm = 0;

// add click listeners
inputElement.addEventListener('focus', handleTypingAreaFocus);

inputElement.addEventListener('input', handleInputUpdate);

restartBtn.addEventListener('click', handleRestart);

function loadValues() {
    inputElement.value = "";
    inputElement.disabled = false;
    errorTextField.innerText = "0"
    timedText.innerText = "60s";
    accuracyTextField.innerText = "100";
    changeMessageText(introMessage);
}

function resetParams() {
    timePassed = 0;
    errorCount = 0;
    globalErrorCount = 0;
    cpm = 0;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function handleTypingAreaFocus() {
    changeMessageText(typingTextStrings[currentStringIndex]);
    startTimer();
}

function changeMessageText(messageString) {
    messageArea.innerHTML = "";
    messageArea.appendChild(createMessageSpanNode(messageString, 0, '15px'));
}

function createMessageSpanNode(messageString, colorType, fontSize) {
    let textNode = document.createElement('span');
    if(messageString.length > 0) {
        textNode.innerText = messageString;
        textNode.style.color = colors[colorType];
        textNode.style.fontSize = fontSize;
    }
    return textNode;
}

function startTimer() {
    timerId = setInterval(() => {
        timePassed++;
        timedText.innerText = (60-timePassed).toString() + 's';
        if(timePassed === 10) {
            // clearInterval(timerId);
            // resetParams();
            endTimer();
        }
    }, 1000);
}

function endTimer() {
    clearInterval(timerId);
    //focus out from input
    inputElement.disabled = true;
    changeMessageText(restartMessage);
    //add wpm and cpm
    appendResult();
}

function appendResult() {
    cpmDiv.style.visibility = 'visible'
    cpmDiv.style.alignItems = 'center'
    let cpmTextField = document.getElementById('cpm-text');
    console.log("wpm : " + cpm);
    cpmTextField.innerText = cpm;
}
function hideResult() {
    cpmDiv.style.visibility = 'collapse';
}

function handleInputUpdate(event) {
    let inputValue = event.target.value;
    if(inputValue.length === typingTextStrings[currentStringIndex].length) {
        currentStringIndex++;
        changeMessageText(typingTextStrings[currentStringIndex]);
        inputElement.value = "";
    } else {
        updateValue(event);
    }
    cpm++;
}

function updateValue(event) {
    messageArea.innerHTML = "";
    errorCount = 0;
    let inputValue = event.target.value;
    let inputLen = inputValue.length;
    let textLen = typingTextStrings[currentStringIndex].length;
    let dummyText = typingTextStrings[currentStringIndex];
    
    let i = 0;
    let currentText = "";
    let currentType = 0;
    while(i < inputLen && i < textLen ) {
        if(inputValue.charAt(i) === dummyText.charAt(i)) {
            if(currentType != 1) {
                appendTextNode(currentText, currentType, '15px');
                currentType = 1;
                currentText = "";
            }
        } else {
            if(currentType != 2) {
                appendTextNode(currentText, currentType, '15px');
                currentText = "";
                currentType = 2;
            }
        }
        currentText += dummyText.charAt(i);
        i++;
    }
    appendTextNode(currentText, currentType, '15px');
    currentText = "";
    while(i < textLen) {
        currentType = 0;
        currentText += dummyText.charAt(i);
        i++;
    }
    appendTextNode(currentText, currentType, '15px');
    updateAccuracyAndError();
}


function appendTextNode(textString, colorType, fontSize) {
    if(textString.length > 0) {
        let textNode = document.createElement('span');
        textNode.innerText = textString;
        textNode.style.color = colors[colorType];
        textNode.style.fontSize = fontSize;
        messageArea.appendChild(textNode);
        if(colorType == 2) {
            errorCount += textString.length;
        }
    }
}

function updateAccuracyAndError() {
    accuracyTextField.innerText = Math.floor((1 - errorCount/typingTextStrings[currentStringIndex].length)*100);
    errorTextField.innerText = errorCount;
}

function handleRestart() {
    loadValues();
    resetParams();
    clearInterval(timerId);
    hideResult();
}


//start
loadValues();

