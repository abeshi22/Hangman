
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let answer = "";            //正解の単語
let correct = [];  //解答状況フラグ
let alphabet = "";          //未使用文字
let mistakeCount = 0;       //誤答回数

let answerWord = ["ANT", "BAT", "BOX", "BOY", "CAT", "DAY", "DOG", "FOX", "HAT", "HOT", "JAM", "MAN", "RED", "SAD", "TEN", 
                "BABY", "BEAR", "BEER", "BEST", "BLUE", "COOL", "DEER", "DESK", "FLAG", "GIRL", "HAND", "HAVE", "HEAT", "HOUR", "ITEM", "KING", "LION", "LOVE", "MEAT", "MISS", "NICE", "PINK", "WOLF", "YEAR", 
                "BLACK", "BROWN", "CHAIR", "DRINK", "EARTH", "GREEN", "HUMAN", "JAPAN", "MOUSE", "ONION", "TIGER", "TOOTH", "WATCH", "WATER", "WHALE", "WHITE", "WOMAN", "WORST", "YACHT", "ZEBRA", 
                "ANIMAL", "BETTER", "FATHER", "GUITAR", "HEALTH", "LETTER", "MINUTE", "MOTHER", "PARENT", "PURPLE", "RABBIT", "SECOND", "YELLOW",
                "ELEMENT", "ENGLISH", "GORILLA", "ISLAND", "MONKEY", "PENGUIN", "RACCOON", 
                "AIRPLANE", "ANTEATER", "ELEPHANT", "QUESTION", "ROTATION", "SANDWICH", "UMBRELLA", 
                "AMBITIOUS", "DISCOVERY", "INTERVIEW", "JELLYFISH", "NEWSPAPER", "VEGETABLE"
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

    if(checkCorrect()) {document.getElementById("hint1").innerText = "正解です！"}
    
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
    }
}

function giveup(){
    document.getElementById("hint1").innerText = "ギブアップ！正解は" + answer + "でした！";
    document.getElementById("hint2").innerText = answer;
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
