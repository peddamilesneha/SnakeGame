let inputdir = {x: 0, y: 0};
const snakefood = new Audio("SnakeFood.mp3");
const snakegameover = new Audio("SnakeGameOver.wav");
const snakemove = new Audio("SnakeMove.mp3");
const snakemusic = new Audio("SnakeMusic.mp3");
let speed = 5;
let score = 0;
let lasttime = 0;
let snarr=[
    {x:13, y:15}
]
food = {x:6, y: 7};

function main(curtime){
    window.requestAnimationFrame(main);
if((curtime - lasttime)/1000 < 1/speed){
    return;
}
lasttime = curtime;
working();

        
}

function isCollide(sarr){
    //when snake bump into itself
    for (let i=1; i<snarr.length; i++){
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
            return true;
        }
        
    }
// when snake bump to wall
    if(sarr[0].x>= 18 || sarr[0] .x <=0 || sarr[0].y>= 18 || sarr[0] .y <=0){
        return true;
    }
        
}    

function working(){
    snakemusic.play();
    //if snake collide
    if(isCollide(snarr)){
        snakegameover.play();
        snakemusic.pause();
        inputdir = {x: 0, y: 0};
        alert("Game Over, Press any key to Play Again......!");
        snarr=[{x:13,y:15}];
        snakemusic.play();
        score = 0;
        scoreLog.innerHTML = "Score: " + score;
    }
    // if snake ate food increment score and add snake body
    if(snarr[0].y === food.y && snarr[0].x === food.x){
        snakefood.play();
        score += 1;
        scoreLog.innerHTML = "Score: " + score; 
        snarr.unshift({x: snarr[0].x + inputdir.x,y: snarr[0].y + inputdir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}

    }
    
    // move snake
    for(let i= snarr.length - 2; i>=0; i--){
        snarr[i+1] = {...snarr[i]};
    }
    snarr[0].x+= inputdir.x;
    snarr[0].y+= inputdir.y;


    //display snake head
    board.innerHTML = "";
    snarr.forEach((e, index)=> {
        sele = document.createElement('div');
        sele.style.gridRowStart = e.y;
        sele.style.gridColumnStart = e.x;
        
        //if index is 0 means it is head or else it is snake body
        {
            if(index === 0){
                sele.classList.add('head');
            }
            else{
                sele.classList.add('snake');
            }
        }
        board.appendChild(sele);
    });
    //display food
    fele = document.createElement('div');
    fele.style.gridRowStart = food.y;
    fele.style.gridColumnStart = food.x;
    fele.classList.add('food')
    board.appendChild(fele);
}



// main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputdir = { x:0, y:1} // start game
    snakemove.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;

            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;

            break;
         case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;

            break;
         case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;

            break;
        default:
            break;
    }

});