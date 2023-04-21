const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let arrowUp = false;
let arrowDown = false;

function draw(){
    //draw background 
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
    //draw middle line
    for(let i =0; i<11; i++){
        ctx.beginPath();
        ctx.fillStyle = "#d3d3d3";
        ctx.fillRect(canvas.width/2-10, i*40,20,20);
        ctx.fill();
        ctx.closePath();
    }
    rightPaddle.draw();
    leftPaddle.draw();
    if(playerOneScore.number<5 && playerTwoScore.number <5){
        gameBall.draw();
    }else{
        const GameOver = document.getElementById("gameOver");
        ctx.drawImage(GameOver,canvas.width/2-150,canvas.height/2-84,300,168);        

    }
    
    playerOneScore.draw();
    playerTwoScore.draw();

}

function keyup(e){
    if (e.key == "ArrowUp"){
        rightPaddle.up = true;
    }else if(e.key == "ArrowDown"){
        rightPaddle.down = true;
    }

    else if(e.key == "w"){
        leftPaddle.up = true;
    }else if(e.key == "s"){
        leftPaddle.down = true;
    }
}
function keydown(e){
    if (e.key == "ArrowUp"){
        rightPaddle.up = false;
    }else if(e.key == "ArrowDown"){
        rightPaddle.down = false;
    }

    else if(e.key == "w"){
        leftPaddle.up = false;
    }else if(e.key == "s"){
        leftPaddle.down = false;
    }
}


rightPaddle = new paddle(750, 30, 15, 100);
leftPaddle = new paddle(50, 30, 15, 100);
gameBall = new ball(canvas.width/2, canvas.height/2, 20, 20, 3, 3);
playerOneScore = new drawNumbers(320, 10, 0);
playerTwoScore = new drawNumbers(445, 10, 0);


document.addEventListener("keydown", keyup, false); 
document.addEventListener("keyup", keydown, false); 
setInterval(draw, 10);