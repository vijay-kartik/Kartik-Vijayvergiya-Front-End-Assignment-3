const inputElement = document.querySelector('input');
const messageArea = document.querySelector(".message");
const dummyText = "The journey of a thousand miles begins with a single step.";
const colors = ["black", "green", "red"];

inputElement.addEventListener('input', updateValue);

inputElement.addEventListener('focus', changeMessageText);

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
    }
}

function updateValue(event) {
    messageArea.innerHTML = "";
    let inputValue = event.target.value;
    let inputLen = inputValue.length;
    let textLen = dummyText.length;
    
    let i = 0;
    let currentText = "";
    let currentType = 0;
    while(i < inputLen && i < textLen ) {
        if(inputValue.charAt(i) == dummyText.charAt(i)) {
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
}

