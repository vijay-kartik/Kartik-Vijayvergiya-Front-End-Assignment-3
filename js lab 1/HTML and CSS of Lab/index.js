var grid = document.querySelector(".grid");
var ques = document.querySelector("#question");
var choiceButtons = [document.querySelector("#btn0"), 
                    document.querySelector("#btn1"), 
                    document.querySelector("#btn2"), 
                    document.querySelector("#btn3")
                    ];

var progress = document.querySelector("#progress");

const quesListJSON = 
[
    {
        ques: "JavaScript supports", 
        options: ["Functions", "XHTML", "CSS", "HTML"],
        ans: "Functions"
    },
    {
        ques: "Which language is used for styling web pages?", 
        options: ["HTML", "JQuery", "CSS", "XML"],
        ans: "CSS"
    },
    {
        ques: "Which is not a JavaScript Framework?", 
        options: ["Python Script", "JQuery","Django", "NodeJS"],
        ans: "Django"
    },
    {
        ques: "Which is used for Connect To Database?", 
        options: ["PHP", "HTML", "JS", "All"],
        ans: "PHP"
    },
    {
        ques: "avaScript is a", 
        options: ["Language", "Programming Language", "Development", "All"],
        ans: "Programming Language"
    }
];

function Question(questionObj) {
    this.question = questionObj.ques;
    this.options = questionObj.options;
    this.correctAns = questionObj.ans;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.correctAns === choice;
}

function Quiz(listOfQuestions) {
    this.score = 0;
    this.questions = listOfQuestions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.checkOptionWithAnswer = function(userAns) {
    if(userAns === this.questions[this.questionIndex].correctAns) {
        this.score++;
    }
    console.log("btn called");
    this.questionIndex++;
}

function showScore() {
    grid.innerHTML = `score is ${quiz.score} and percentage is ${quiz.score / quiz.questions.length * 100}%`;
    
}

function updateProgress() {
    //update p with id progress
    progress.innerText = `Question ${quiz.questionIndex + 1} of ${quiz.questions.length}`;
}

function handleOnClick() {
    quiz.checkOptionWithAnswer(this.innerText);
    loadQuestion();
}

function displayQuestion(question) {
    ques.innerText = question.question;
    for(let i = 0; i < question.options.length; i++) {
        choiceButtons[i].innerText = question.options[i];
    }
}

function loadQuestion() {
    console.log("called");
    if(quiz.isEnded()) {
        showScore();
    } else {
        displayQuestion(quiz.getQuestionByIndex());
        updateProgress();
    }
}

let questions = []
for (let i = 0; i < quesListJSON.length; i++) {
    questions.push(new Question(quesListJSON[i]));
}


let quiz = new Quiz(questions);
for(let i = 0; i < choiceButtons.length; i++)
    choiceButtons[i].addEventListener('click', handleOnClick);

loadQuestion();