
var playing = false;
var timeLeft;
var score;
var correctAns;

//Starts or resets game on click of start-reset button. starts countdown
document.getElementById("start-reset").onclick = function() {
    if (playing == false) {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("start-reset").innerHTML = "Reset Game";
        show("timer");
        hide("gameover");
        genProblem();
        countDown();
        
    }
        else if (playing == true) {
        location.reload();
    }
}

//click answer boxes
//score ++, show correct/hide wrong, new question

for(i=1;i<5;i++) {
    document.getElementById("box"+i).onclick = function(){
        if(playing == true) {
        if(this.innerHTML == correctAns){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                },1000);
                genProblem();
                
            } else {
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            } 
        }
    }
}


//called by gameSetup() makes timer div visible + reduces time
function countDown() {
    timeLeft = 60;
    var timeDisplay = document.getElementById("timervalue");
    var interval = setInterval(function(){
        timeLeft--;
        timeDisplay.innerHTML = timeLeft;
        
        if (timeLeft == 0) {
            playing = false;
            show("gameover");
            hide("timer");
            document.getElementById("scoredisplay").innerHTML = score;
            document.getElementById("start-reset").innerHTML = "Start Game";
            clearInterval(interval);
        }
    }, 1000);
}

//gets rnd integer between min and max both included
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//hides element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//displays and element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//gets 2 random intergers and displays problem in "question" div
//calls genAnswers with answer to problem. 
function genProblem() {
    var first = getRndInteger(1,12); //num between 1 - 12
    var second = getRndInteger(1,12);
    var showProb = document.getElementById("question");
    showProb.innerHTML = first + " X " + second;
    correctAns = first * second;
    genAnswers(correctAns);
}

//generates intergers to display in "choice-box" boxes.
//Takes interger which is correct answer from genProblem().
//Correct answer is placed randomly. Wrong answers are randomly
//generated.
function genAnswers(correctAns) {
    //randomly select box for correct answer
    var r = getRndInteger(0,3);
    
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    var box3 = document.getElementById("box3");
    var box4 = document.getElementById("box4");
    var boxArray = [box1,box2,box3,box4];
    boxArray[r].innerHTML = correctAns;
    
    var answers = [correctAns];
    
    boxArray.splice(r,1);
    for(i=0;i<boxArray.length;i++){
        var wrongAnswer; 
        do{
            wrongAnswer = getRndInteger(1,144);
        }while(answers.includes(wrongAnswer) == true);
            
        boxArray[i].innerHTML = wrongAnswer;
        answers.push(wrongAnswer);
    }
}
