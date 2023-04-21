//All classes declared in this js file

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function boxColision(box1x, box1y, box1Width, box1Height, box2x, box2y, box2Width, box2height){
    if(box1x+box1Width >= box2x && box2x+box2Width>=box1x){
        xOverlap = true;
    }else{
        xOverlap = false;
    }
    if(box1y+box1Height >= box2y && box2y+box2height>=box1y){
        yOverlap = true;
    }else{
        yOverlap = false;
    }
    return xOverlap && yOverlap;
}

class ball{
    constructor(x,y,dx,dy,width,height,color){
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = 1;
        this.width = width;
        this.height = height;
        this.color = color;
        this.initColor = color;
        this.bounceDelay=0;
        this.speed = 3.5;
        this.elapsed = 1;
        this.rotation = 0;
        this.shouldMove = true;
        this.animationTimer = 0;
        this.animationRepeat = 0;

    }
    drawBall(){
        this.updatePosition()
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
    updatePosition(){
        //collision checks 
        if (this.shouldMove){
            if (this.y < game_canvas_height){
                this.y -= this.speed * this.elapsed * Math.sin(this.rotation);
                this.x -= this.speed * this.elapsed * Math.cos(this.rotation);
            
                
                this.verticleBounce();
            }
            if (this.y >= canvas.height){
                myLives.decreaseScore();
                this.respawn();
                // this.verticleBounce();
            }
            if (this.x >= canvas.width-this.width){
                this.x = canvas.width-this.width;
                this.horozontalBounce();
            }
            if (this.x <= 0){
                this.x = 0;
                this.horozontalBounce();
            }
            //check box colosions 
            let shouldBreak = false;
            for(let x=0; x<boxes.length; x++){
                for(let i=0; i<boxes[0].length; i++){
                    if (boxes[x][i].dead == false){
                        if (boxColision(boxes[x][i].x,boxes[x][i].y,boxes[x][i].width,boxes[x][i].height, this.x,this.y,this.width,this.height)){
                            this.verticleBounce();
                            //reimpliment bounce delay plz
                            boxes[x][i].dead = true;
                            myScore.increaseScore();
                            shouldBreak = true;
                            break;
                        }
                    }
                    if(shouldBreak){
                        break;
                    }

                }
            }
            //paddle colision
            if (boxColision(paddleObj.x,paddleObj.y,paddleObj.width,paddleObj.height, this.x,this.y,this.width,this.height)){
                this.y = paddleObj.y - this.height-1;
                this.verticleBounce();
                this.dx  = this.x - paddleObj.x;
                if (this.dx > 75){
                    this.dx = 1;
                }else if(this.dx <75 && this.dx > 50){
                    this.dx = 0.75;
                }else if(this.dx < 50 && this.dx > 25){
                    this.dx = -0.75;
                }else{
                    this.dx = -1;
                }
                console.log(this.dx)
            

            }



            this.rotation = Math.atan2(this.dy,this.dx);
            this.x += this.speed * this.elapsed * Math.cos(this.rotation);
            this.y += this.speed * this.elapsed * Math.sin(this.rotation);
        }else{
            if (this.animationTimer <= 0){
                console.log("Changed");
                if (this.color == this.initColor){
                    this.color = "#000000";
                    // alert("changed to black");
                }else{
                    // alert("changed to red");
                    this.color = this.initColor;
                }
                this.animationTimer = 50;
                this.animationRepeat += 1;
            }
            
            this.animationTimer -= 1;
            if (this.animationRepeat>=6){
                this.shouldMove = true;
                this.animationRepeat = 0;
                this.animationTimer = 0;
                this.color = this.initColor;
            }
        }
    }
    //remove this function, should only have verticle and horozontal 
    bounce(){
        if(this.bounceDelay<=0){
            this.dx = -this.dx;
            this.dy = - this.dy;
        }
    }

    verticleBounce(){
        this.dy = this.dy * -1;
    }

    horozontalBounce(){
        this.dx = this.dx * -1;
    }
    respawn(){
        console.log(myLives.score);
        if (!(myLives.score <= 0)){
            this.shouldMove = false;
        
            this.dx = 1;
            this.dy = 1;
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.animationTimer = 50;
        }
     

    }

   
}

class box{
    //gotta be a better way than this.arg for everything but idk rn
    constructor(x,y,width,height,color,ballObj,scoreObject){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dead = false;
        this.color = color;
        this.ballObj = ballObj;
        this.scoreObject = scoreObject;
    }
    drawBox(){
        //why would we draw if dead?
        if(this.dead == false){
            ctx.beginPath();
            ctx.rect(this.x,this.y,this.width,this.height);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();    
        }
    }
    //TODO: need to account for colisions from the side
    
}

class paddle{
    
    constructor(x,y,width,height,color, speed,ballObj){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.ballObj = ballObj;
    }
    updatePosition(){
        this.checkIfColiding();
        if(rightDown){
            this.x += this.speed;
        }else if (leftDown){
            this.x -= this.speed;
        }
        //don't go offscreen
        if (this.x <= 0){
            this.x = 0;
        }if (this.x>canvas.width-this.width){
            this.x = canvas.width-this.width;
        }
    }

    drawPaddle(){
        this.updatePosition();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width,this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    checkIfColiding(){
        if(boxColision(this.x,this.y,this.width,this.height, this.ballObj.x,this.ballObj.y,this.ballObj.width,this.ballObj.height)){
            // this.ballObj.verticleBounce();
        }
        

    }
}

class drawNumbers{
    
    constructor(x,y,startValue, image){
       this.numbers = image;

        this.x = x;
        this.y = y;
        this.number = startValue;
    }
    drawNumb(num){
        //sad but works, stupid js and the inability to make sexy tilesheets 
        const zero = document.getElementById("zero");
        const one = document.getElementById("one");
        const two = document.getElementById("two");
        const three = document.getElementById("three");
        const four = document.getElementById("four");
        const five = document.getElementById("five");
        const six = document.getElementById("six");
        const seven = document.getElementById("seven");
        const eight = document.getElementById("eight");
        const nine = document.getElementById("nine");
        let toDraw = zero;
        //i mean...
        switch(num){
            case 0:
                toDraw = zero;
                break;
            case 1:
                toDraw = one;
                
                break;
            case 2:
                toDraw = two;
                break;
            case 3:
                toDraw = three;
                break;
            case 4:
                toDraw = four;
                break;
            case 5:
                toDraw = five;
                break;
            case 6:
                toDraw = six;
                break;
            case 7:
                toDraw = seven;
                break;
            case 8:
                toDraw = eight;
                break;
            case 9:
                toDraw = nine;
                break;
        }
        ctx.drawImage(toDraw,this.x,this.y,36,41);        
    }
    setNum(num){
       this.number = num;
    }
}

class ScoreKeeper{
    constructor(score, digitOne="none", digitTwo="none", digitThree="none", lives=true){
        this.score = score;
        this.digitOne = digitOne;
        this.digitTwo = digitTwo;
        this.digitThree = digitThree;
        this.lives = lives;
    }
    resetScore(){
        this.score = 0;
    }
    increaseScore(){
        this.score += 1;
    }
    decreaseScore(){
        this.score -= 1;
    }
    drawScore(){
        //get individual digits and print to screen, assume that the score is never greater than three digits
        if (this.lives){
            this.digitOne.drawNumb(this.score);
        }else{
            let tempscore = this.score;
            if(this.digitThree != "none"){
                this.digitThree.drawNumb(parseInt(tempscore%10));
            }
            tempscore = tempscore/10;
            //alert(parseInt(tempscore%10));
            if(this.digitTwo != "none"){
                this.digitTwo.drawNumb(parseInt(tempscore%10));
            }
            tempscore = tempscore/10;
            this.digitOne.drawNumb(parseInt(tempscore%10));
        }
    }
}