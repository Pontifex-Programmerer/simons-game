const contentwrapper = document.querySelector('#content_wrapper');

let isGame = false;
let gameArray = [];
let playerArray =[];

contentwrapper.addEventListener('click', event => {
    const click = event.target.id;
    console.log(`was clicked: ${click}`)

    if(isGame){
        if(click !== 'action-button'){
            playerArray.push(click);

            if(isCorrectClick(playerArray)){
                
                if(playerArray.length === gameArray.length){
                    setTimeout(expandGameArray, 1000);
                    playerArray = [];
                }
            } else {
                gameOver();
            }
        }
    }else if(click === 'action-button'){
        isGame = true;
        expandGameArray();
    }
    
});

function isCorrectClick(playerArray){
    const lastIndexInPlayerArray = playerArray.length -1;
    return gameArray[lastIndexInPlayerArray] === playerArray[lastIndexInPlayerArray];
}

function expandGameArray(){
    gameArray.push(`tile-${Math.ceil(Math.random()*4)}`);
    playGameArray();
}

function playGameArray(){
    console.log(gameArray);
    toggleBorder(0);

    function toggleBorder(index){
        const tile = document.querySelector(`#${gameArray[index]}`);
        tile.classList.toggle('border');
        
        setTimeout(()=> {
            const tile = document.querySelector(`#${gameArray[index]}`);
            tile.classList.toggle('border');
            ++index;
            if(index !== gameArray.length){
                setTimeout(() => {
                    toggleBorder(index);
                }, 500);
            } 
        }, 1000);
    }
}

//Clean up code and set gamestate to not running
function gameOver() {
    const gameover = document.querySelector('#game-over');
    gameover.classList.toggle('invisible');
    setTimeout(()=> {
        gameover.classList.toggle('invisible');
    }, 2000);
    isGame = false;
    gameArray = [];
    playerArray = [];
}