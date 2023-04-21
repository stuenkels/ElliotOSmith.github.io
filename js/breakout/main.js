const canvas = document.getElementById("myCanvas");
const image = document.getElementById("numberImage");

const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = 300;
let dx = 2;
let dy = -2;
let paddleWidth = 100;
let paddleHeight = 10 
let paddlex = (canvas.width-paddleWidth)/2
let paddley = canvas.height-paddleHeight-30;
let leftDown = false;
let rightDown = false;
let paddleSpeed = 4;
const ballwidth = 10;
let boxes = [[],[],[],[],[],[]];

game_canvas_height = 100;

function drawBall() {
    setBallCords();
    
  }
  
function updateBoxes(){
    for(let x=0; x<boxes.length; x++){
        for(let i=0; i<boxes[0].length; i++){
            boxes[x][i].drawBox();
        }
    }
    
}

function fillBackground(){
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
}

function drawTopBorder(){
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0+game_canvas_height-30,canvas.width, 30);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //first clear our scene
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //note: filling background also will clear the scene, as black is drawn over the top of everything
    fillBackground();
    drawTopBorder();
    myScore.drawScore();
    myLives.drawScore();

    paddleObj.drawPaddle();
    ballObj.drawBall();


    //sad we have to call this but bad code is bad
    updateBoxes();
  }

//These two function should not be called by an object, only the variable accessed 
//call with delay to pervent alt tab errors when keyup is not registored 
function keyDownHandler(e){
    if (e.key == "ArrowRight"){
        rightDown = true;
    }else if(e.key == "ArrowLeft"){
        leftDown = true;
    }
}

function keyUpHandler(e){
    if (e.key == "ArrowRight"){
        rightDown = false;
    }else if(e.key == "ArrowLeft"){
        leftDown = false;
    }
}

function makeGameObjects(){
    //score rendering objects
    scoreDigitOne = new drawNumbers(10,10,0,image);
    scoreDigitTwo = new drawNumbers(51,10,0,image);
    scoreDigitThree = new drawNumbers(92,10,0,image);
    //create the score keeper
    myScore = new ScoreKeeper(0,scoreDigitOne,scoreDigitTwo,scoreDigitThree, false);
    livesDigit = new drawNumbers(canvas.width-45, 10, image)
    myLives = new ScoreKeeper(3, livesDigit);
    //ball created first, its refrenced by both the paddle and boxes
    ballObj = new ball(x,y,dx,dy,ballwidth,ballwidth,"#ff0000");
    //hardcoded color, perhaps dynamic paddle color?
    paddleObj = new paddle(paddlex,paddley,paddleWidth,paddleHeight,"#FF0000", paddleSpeed,ballObj);
    

    //create boxes
    //switch statement assigns colors to the boxes
    for(let x=0; x<boxes.length; x++)
        for(let i=0; i<15;i++){
            switch(x){
                case 0:
                    color = "#FF0000";
                    break;
                case 1:
                    color = "#FF6600";
                    break;
                case 2:
                    color = "#FFa500";
                    break;
                case 3:
                    color = "#FFd500";
                    break;
                case 4:
                    color = "#84ff00";
                    break;
                case 5:
                    color = "#0055ff";
                    break;
            }
            //todo: get rid of hardcoded values to avoid canvas resize bugs
            boxes[x][i] = new box(5+i*32, game_canvas_height+40+x*15, 32, 15,color,ballObj);
        }
    }
makeGameObjects();
document.addEventListener("keydown", keyDownHandler, false); 
document.addEventListener("keyup", keyUpHandler, false); 
//10ms frames 
//draw event called every 10 ms
//note: speed is related to fps, ball speeds up with faster fps. Setting max fps limits ball speed, looking at your lego island turn speed
setInterval(draw, 10);