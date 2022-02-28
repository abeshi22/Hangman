
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let answer = "";            //正解の単語
let correct = [];  //解答状況フラグ
let alphabet = "";          //未使用文字
let mistakeCount = 0;       //誤答回数

let answerWord = ["ANT", "BAT", "BIG", "BOX", "BOY", "CAT", "DAY", "DOG", "EAT", "EYE", "FOX", "HAT", "HOT", "JAM", "MAN", "MAY", "ONE", "PAY", "RED", "SAD", "SIX", "TEN", "TWO",  
                "BABY", "BEAR", "BEER", "BEST", "BLUE", "BOOK", "COOL", "DEER", "DESK", "FIND", "FISH", "FIVE", "FLAG", "FOUR", "GAME", "GIRL", "HAND", "HAVE", "HEAT", "HOUR", 
                  "ITEM", "JULY", "JUNE", "KING", "KNOW", "LION", "LOVE", "MEAT", "MISS", "NEXT", "NICE", "NINE", "NOSE", "PART", "PINK", "RAIN", "SAME", "SOME", "TEST", "TIME", "WITH", "WOLF", "YEAR", 
                "AFTER", "AGAIN", "APRIL", "BLACK", "BROWN", "CHAIR", "CHILD", "COUNT", "DRINK", "EARTH", "EIGHT", "ENJOY", "FIRST", "GREEN", "HOUSE", "HUMAN", "JAPAN", "KNIFE", "LEMON", 
                  "MARCH", "MOUSE", "OFTEN", "ONION", "PLACE", "POINT", "SEVEN", "SNAKE", "SPACE", "SPEAK", "THIRD", "THREE", "TIGER", "TODAY", "TOOTH", 
                  "WATCH", "WATER", "WHALE", "WHITE", "WOMAN", "WORST", "WRITE", "YACHT", "ZEBRA", 
                "ADVISE", "AFRAID", "ANIMAL", "AUGUST", "BEFORE", "BETTER", "BREATH", "CAMERA", "CARROT", "EFFORT", "FATHER", "GUITAR", "HEALTH", "ISLAND", "LETTER", "LISTEN", 
                  "MINUTE", "MONKEY", "MOTHER", "ORANGE", "PARENT", ,"POTATO", "PURPLE", "RABBIT", "SCHOOL", "SECOND", "SHOULD", "TOMATO", "YELLOW",
                "ALREADY", "BENEFIT", "CONTROL", "COUNTRY", "ELEMENT", "ENGLISH", "GORILLA", "JANUARY", "OCTOBER", "PENGUIN", "PLASTIC", "RACCOON", "RESERVE", 
                  "STATION", "STUDENT", "SUGGEST", "SUPPOSE", "TEACHER", "WITHOUT", 
                "AIRPLANE", "ANNOUNCE", "ANTEATER", "CHILDREN", "COMPLETE", "DECEMBER", "ELEPHANT", "FEBRUARY", "LANGUAGE", "MUSICIAN", "NOVEMBER", 
                  "POSSIBLE", "QUESTION", "ROTATION", "SANDWICH", "TOMORROW", "UMBRELLA", "WHATEVER", 
                "AMBITIOUS", "BEAUTIFUL", "DISCOVERY", "EVERYBODY", "INTERVIEW", "JELLYFISH", "NEWSPAPER", "SEPTEMBER", "SOMETHING", "VEGETABLE", "YESTERDAY"
                ];


// 答えの設定
function setAnswer(){
    answer = answerWord[Math.floor(Math.random()*answerWord.length)];
    for (let i=0; i<answer.length; i++){
        correct[i] = false;
    }
    // console.log(answer);
}


function hint(){
    document.getElementById("hint1").innerText = "答えを設定しました。\n";
    for (let i=0; i<answer.length; i++){
        document.getElementById("hint2").innerText += "_";
    }
}



// アルファベットボタンとBSボタンを押したときの処理
// 予想が正しいかの判定
function checkAnswer(val){
    let check = false;
    for (let i=0; i<answer.length; i++){
        if(val == answer.substr(i,1)){
            check = true;
            correct[i] = true;
            document.getElementById("submit"+val).style.backgroundColor = "#ff5555";
            document.getElementById("submit"+val).style.color = "yellow";
        }
    }
    if(check == false){
        mistakeCount++;
        document.getElementById("submit" + val).style.backgroundColor = "#ffffff";
        document.getElementById("submit" + val).style.color = "#dddddd";
        document.getElementById("submit" + val).style.borderColor = "#dddddd";
        document.getElementById("submit" + val).disabled = true;
    }

    if(checkCorrect()) {
        document.getElementById("hint1").innerText = "残りライフ" + (10-mistakeCount) + "で正解です！"
        submitDisabled();
    }
    showStatus();
    drawLife();
}

function drawLife(){
    ctx.beginPath();
    if(mistakeCount<4){
        ctx.fillStyle = "blue";
    }else if(mistakeCount<6){
        ctx.fillStyle = "green";
    }else if(mistakeCount<8){
        ctx.fillStyle = "orange";
    }else if(mistakeCount<10){
        ctx.fillStyle = "purple";
    }else{
        ctx.fillStyle = "red";
    }
    ctx.arc(10,10,10,0,Math.PI*2);
    ctx.fillRect(10,0,48*(mistakeCount),20);
    ctx.arc(48*mistakeCount+10, 10, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}


// 文字をすべて当てられたかチェック
function checkCorrect(){
    for(let i=0; i<answer.length; i++){
        if(correct[i]==false){
            return false;
        }
    }
    return true;
}

function showStatus(){
    document.getElementById("hint2").innerText = "";
    for (let i=0; i<answer.length; i++){
        if(correct[i]==true){
            document.getElementById("hint2").innerText += answer.substr(i,1);
        }else{
            document.getElementById("hint2").innerText += "_";
        }
    }
    document.getElementById("life").innerText = "のこり" + (10-mistakeCount) + "トライ";
    
    if(mistakeCount==10){
        document.getElementById("hint1").innerText = "残念！正解は" + answer + "でした！";
        document.getElementById("hint2").innerText = answer;
        submitDisabled();
    }
}

function giveup(){
    document.getElementById("hint1").innerText = "ギブアップ！正解は" + answer + "でした！";
    document.getElementById("hint2").innerText = answer;
    submitDisabled();
}

function submitDisabled(){
    for(let i="A".charCodeAt(0); i <= "Z".charCodeAt(0); i++){
        document.getElementById("submit"+String.fromCharCode(i)).disabled = true;
    }
}

function reset(){
    mistakeCount = 0;
    document.getElementById("hint1").innerText = "";
    document.getElementById("hint2").innerText = "";
    for(let i="A".charCodeAt(0); i <= "Z".charCodeAt(0); i++){
        document.getElementById("submit"+String.fromCharCode(i)).disabled = false;
        document.getElementById("submit"+String.fromCharCode(i)).style.backgroundColor = "";
        document.getElementById("submit"+String.fromCharCode(i)).style.color = "";
        document.getElementById("submit"+String.fromCharCode(i)).style.borderColor = "";
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLife();
    setAnswer();
    hint();
    showStatus();
}


// メインの処理
setAnswer();
hint();
drawLife();
