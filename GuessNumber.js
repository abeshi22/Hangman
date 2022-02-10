
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

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

drawRader();

