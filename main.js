'use strict';

const GAME_TIMER_SEC = 10;
const BUG_COUNT = 10;
const ITEM_SIZE = 50;

const field = document.querySelector('.play-station');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.startBtn');
const gameTimer = document.querySelector('.game__timer');
const gameCounter = document.querySelector('.game__counter');

const popUp = document.querySelector('.popup');
const popUpBtn = document.querySelector('.replayBtn');
const popUpText = document.querySelector('.popup__message');

const bgSound = new Audio('./resource/sound/bg.mp3');
const alertSound = new Audio('./resource/sound/alert.wav');
const bugSound = new Audio('./resource/sound/bug_pull.mp3');
const carrotSound = new Audio('./resource/sound/carrot_pull.mp3');
const winSound = new Audio('./resource/sound/game_win.mp3');

let start = false;
let counter = undefined;
let score = 0;

field.addEventListener('click', clickField);
gameBtn.addEventListener('click', ()=>{
    if(start){
        stopGame();
    } else {
        startGame();
    }
});

popUpBtn.addEventListener('click', () =>{
    startGame();
    hidePopUp();
});

function clickField(e){
    if(!start){
        return;
    }
    const target = e.target;
    if(target.matches('.bug__items')){
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === BUG_COUNT){
            target.remove;
            sucessGame();
            showPopUp('만세! 지구를 지켰다!');
        }
    } else if(target.matches('.carrot__items')){
        stopGame();
    };
}

function startGame(){
    start = true;
    initGame();
    showStopBtn();
    startTimer();
    showTimerAndScore();
    playSound(bgSound);
}

function stopGame(){
    start = false;
    hideStopBtn();
    stopTimer();
    showPopUp('지구를 지켜야 해요!');
    stopSound(bgSound);
    playSound(alertSound);
}

function sucessGame(){
    stopTimer();
    stopSound(bgSound);
    playSound(winSound);
}

function startTimer(){
    let count = GAME_TIMER_SEC;
    timerUpdate(count);
    counter = setInterval(() => {
        if(count <= 0){
            stopGame();
            return
        }
        timerUpdate(--count);
    }, 1000)
}

function stopTimer(){
    hideStopBtn();
    clearInterval(counter);
    field.innerHTML = '';
}

function timerUpdate(time){
    const seconds = Math.floor(time % 60);
    gameTimer.innerHTML =`00:${String(seconds).padStart(2, 0)}`;
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameCounter.style.visibility = 'visible';
}

function showStopBtn(){
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideStopBtn(){
    gameBtn.style.visibility = 'hidden';
}

function updateScoreBoard(){
    gameCounter.innerHTML = BUG_COUNT - score;
}

function showPopUp(messege){
    popUpText.textContent = messege;
    popUp.classList.remove('hidden');
}

function hidePopUp(){
    popUp.classList.add('hidden');
}

function initGame(){
    score = 0;
    gameCounter.innerHTML = BUG_COUNT;
    addItem('bug__items', BUG_COUNT, './resource/img/bug.png');
    addItem('carrot__items', BUG_COUNT, './resource/img/carrot.png');
}

function addItem(className, count, imgSrc){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - ITEM_SIZE;
    const y2 = fieldRect.height - ITEM_SIZE;

    for(let i = 0;i < count; i++){
        const items = document.createElement('img');
        items.setAttribute('class', className);
        items.setAttribute('src', imgSrc);
        const x = randomLocation(x1, x2);
        const y = randomLocation(y1, y2);
        randomLocation(x, y);
        items.style.left = `${x}px`;
        items.style.top = `${y}px`;
        items.style.transition = 'all ease-in-out 0.5s 0s';
        field.append(items);
    }
}

function randomLocation(x, y){
    return Math.random() * y - x;
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}