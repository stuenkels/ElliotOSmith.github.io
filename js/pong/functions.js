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

class paddle{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 3;
        this.up = false;
        this.down = false;
    }
    draw(){
        this.updatePos();
        ctx.beginPath();
        ctx.fillStyle = "#d3d3d3";
        ctx.fillRect(this.x, this.y,this.width,this.height);
        ctx.fill();
        ctx.closePath();
    }
    updatePos(){
        if (this.down){
            if(this.y + this.speed <= canvas.height-this.height-3){
                this.y += this.speed;
            }else{
                this.y = canvas.height - this.height-3;

            }
        }
        if (this.up){
            if(this.y - this.speed >= 3){
                this.y -= this.speed;
            }else{
                this.y = 3;

            }
        }
        if(boxColision(this.x, this.y, this.width, this.height, gameBall.x, gameBall.y,gameBall.width,gameBall.height)){
            gameBall.horozontalBounce();
            
        }
    }
}

class ball{
    constructor(x, y, width, height, dx, dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    draw(){
        this.updatePos();
        
        ctx.beginPath();
        ctx.fillStyle = "#d3d3d3";
        ctx.fillRect(this.x, this.y,this.width,this.height);
        ctx.fill();
        ctx.closePath();
    }
    updatePos(){
        if (this.x + this.dx >= canvas.width-this.width){
            this.dx = -this.dx;
            playerOneScore.setNum(playerOneScore.number + 1);
            this.x = canvas.width/2;


        }
        if (this.x + this.dx <= 0){
           playerTwoScore.setNum(playerTwoScore.number +1);
           this.dx = -this.dx;
           this.x = canvas.width/2;
        }
        
        if(this.y + this.dy >= canvas.height - this.height || this.y + this.dy <= 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    horozontalBounce(){
        if(Math.abs(this.dx) == this.dx){
            this.x = 750-this.width;
        }else{
            this.x = 75;
        }
        this.dx = -this.dx;
        
    }
}


class drawNumbers{
    
    constructor(x,y,startValue){

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
    draw(){
        this.drawNumb(this.number);
    }
}
