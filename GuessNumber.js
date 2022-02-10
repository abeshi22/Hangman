
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let answer = 0;

function drawRader(){
    for(let i=0; i<100 ;i++){
        ctx.beginPath();
        ctx.rect(5*i+10,20,4,30);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
        ctx.closePath();
    }
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("0", 5, 15);
    ctx.fillText("99",500,15);
}

function setAnswer(){
    answer = Math.floor(Math.random()*100);
    console.log(answer);
}


function hint(){
    document.getElementById("hint").innerText = "答えを設定しました。\n";
}

function push(val){
        let temp = document.getElementById("input_answer").value;
    if(val=="bs"){
        if(temp.length==1){
            document.getElementById("input_answer").value = "";
        }else if(temp.length==2){
            document.getElementById("input_answer").value = temp.substr(0,1);
        }
    }else if(temp.length>1){
        alert("答えは0～99です")
    }else{
        document.getElementById("input_answer").value += val;
    }
}

function guessNumber(){
    if(document.getElementById("input_answer").value == ""){
        alert("答えを入力してください");
    }else if(isNaN(document.getElementById("input_answer").value)){
        alert("答えには数字を入力してください");
        document.getElementById("input_answer").value = "";
    }else{
        var guess = Number(document.getElementById("input_answer").value);
        if(guess < answer){
            document.getElementById("hint").innerText += ("答えは" + guess + "より大きいです。\n");
            document.getElementById("input_answer").value = "";
            document.getElementById("hint").scrollTo(0, document.getElementById("hint").scrollHeight);
        }else if(guess > answer){
            document.getElementById("hint").innerText += ("答えは" + guess + "より小さいです。\n");
            document.getElementById("input_answer").value = "";
            document.getElementById("hint").scrollTo(0, document.getElementById("hint").scrollHeight);
        }else{
            document.getElementById("hint").innerText += "正解です！！";
        }
    }
    
}



// メインの処理
drawRader();
setAnswer();
// pushNumber();
hint();