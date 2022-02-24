
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let answer = "";            //正解の単語
let correct = [];  //解答状況フラグ
let alphabet = "";          //未使用文字
let mistakeCount = 0;       //誤答回数

let answerWord = ["BOY", "CAT", "FOX", "HAT", "TEN", 
                "BABY", "GIRL", "HEAT", "LION", "WOLF", 
                "TIGER", "ZEBRA", 
                "FATHER", "MOTHER", 
                "PENGUIN", 
                "ELEPHANT"
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
    setAnswer();
    hint();
    showStatus();
}


// メインの処理
setAnswer();
hint();
