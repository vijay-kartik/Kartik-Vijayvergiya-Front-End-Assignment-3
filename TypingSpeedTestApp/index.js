const inputElement = document.querySelector('input');
const messageArea = document.querySelector(".message");
const restartBtn = document.querySelector('button');
const errorElement = document.querySelector('#errors-text');
const accuracyElement = document.querySelector('#accuracy-text');
const dummyText = "The journey of a thousand miles begins with a single step.";
const hintMessage = "Click the area below to start the game."
const colors = ["black", "green", "red"];
let timerId = -1;
let timePassed = 0;
let errorCount = 0;

const timedText = document.getElementById("time-text");
inputElement.addEventListener('input', updateValue);

inputElement.addEventListener('focus', handleTypingAreaFocus);

restartBtn.addEventListener('click', resetParams);

function handleTypingAreaFocus(event) {
    changeMessageText(event);
    timePassed=0;
    errorCount = 0;
    timedText.innerText = (60-timePassed).toString() + 's';
    startTimer();
}

function startTimer() {
    timerId = setInterval(() => {
        timePassed++;
        timedText.innerText = (60-timePassed).toString() + 's';
        if(timePassed === 60) {
            clearInterval(timerId);
        }
    }, 1000);
}

function changeMessageText(event) {
    let messageSpan = document.querySelector("#message-text");
    messageSpan.innerText = dummyText;
    messageSpan.style.fontSize = '15px';
    
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
            errorElement.innerText = errorCount;
        }

    }
}

function updateValue(event) {
    messageArea.innerHTML = "";
    errorCount = 0;
    let inputValue = event.target.value;
    let inputLen = inputValue.length;
    let textLen = dummyText.length;
    
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
            currentText+=dummyText.charAt(i);
        } else {
            if(currentType != 2) {
                appendTextNode(currentText, currentType, '15px');
                currentText = "";
                currentType = 2;
            }
            currentText += dummyText.charAt(i);
        }
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
    accuracyElement.innerText = Math.floor((1 - errorCount/inputLen)*100);
    
}

function resetParams() {
    timePassed=0;
    timedText.innerText = '60s';
    messageArea.innerText = hintMessage;
    inputElement.innerText = '';
    errorCount = 0;
    errorElement.innerText = 0;
    accuracyElement.innerText = 100;
}

