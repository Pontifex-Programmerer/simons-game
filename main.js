const contentwrapper = document.querySelector('#content_wrapper');

// 'global' variables. These three variables are the essence of information used
// and controlled by the game.
let isGame = false;
let gameArray = [];
let playerArray =[];

/**
 * Event listener for the game area following the principle of 'event delegation'
 * also called 'event bubbling'. The function called by the eventlistener is the main
 * game controller and sets conditions for the rest of the game.
 */
contentwrapper.addEventListener('click', event => {
    const click = event.target.id;

    if(isGame){
        if(click !== 'action-button'){
            playerArray.push(click);
            playSound(click);
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

/**
 * @param {Array} playerArray should be the array generated when the player clicks on tiles
 * @returns true if the last index in the playerArray matches exactly the content on
 * the same index in the gameArray; else it returns false.
 */
function isCorrectClick(playerArray){
    const lastIndexInPlayerArray = playerArray.length -1;
    return gameArray[lastIndexInPlayerArray] === playerArray[lastIndexInPlayerArray];
}

/**
 * adds another tile reference to the gameArray, thus making the sequence that
 * the player has to press consist of one more item. Then it calls the playGameArray
 * function
 */
function expandGameArray(){
    gameArray.push(`tile-${Math.ceil(Math.random()*4)}`);
    playGameArray();
}

/**
 * animates the sequence of tiles contained in the gameArray to visually present
 * to the player what sequence needs to be pushed to advance in the game. 
 */
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

/**
 * cleans up variables generated through the game, and gives the user visual
 * feedback to notify 'game over'
 */
function gameOver() {
    const gameover = document.querySelector('#game-over');
    gameover.classList.toggle('invisible');
    playSound();
    setTimeout(()=> {
        gameover.classList.toggle('invisible');
    }, 2000);
    isGame = false;
    gameArray = [];
    playerArray = [];
}

/**
 * 
 * @param {String} soundreference a reference to the sound that should be played
 * This function takes care of playing the requested sound.
 */
function playSound(soundreference) {
    let audio;
    switch(soundreference){
        case 'tile-1':
            playAudio(soundreference);
            break;
        case 'tile-2':
            playAudio(soundreference);
            break;
        case 'tile-3':
            playAudio(soundreference);
            break;
        case 'tile-4':
            playAudio(soundreference);
            break;
        default:
            playAudio('gameover')
            break;
    }
    function playAudio(filename){
        const audio = new Audio(`./audio/${filename}.mp3`);
        audio.play();
    }
}