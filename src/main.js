'use strict';

import Game from './game.js';
import PopUp from './popup.js';
import Game from './game.js';

const GAME_TIMER_SEC = 10;
const BUG_COUNT = 10;

// const gameBtn = document.querySelector('.startBtn');
// const gameTimer = document.querySelector('.game__timer');
// const gameCounter = document.querySelector('.game__counter');

// let start = false;
// let counter = undefined;
// let score = 0;

const gamePlay = new Game();
gamePlay.setClickListener();

// gameBtn.addEventListener('click', ()=>{
//     if(start){
//         stopGame();
//     } else {
//         startGame();
//     }
// });


const replayBanner = new PopUp();
replayBanner.setClickListener(() =>{
    gamePlay.start();
});

// callback function
// const gameStaion = new Field(BUG_COUNT);
// gameStaion.setClickListener(clickField);

// function clickField(event){
//     if(!start){
//         return;
//     }
//     if(event === 'bug'){
//         score++;
//         updateScoreBoard();
//         if(score === BUG_COUNT){
//             target.remove;
//             sucessGame();
//             replayBanner.showText('만세! 지구를 지켰다!');
//         }
//     } else if(event === 'carrot'){
//         stopGame();
//     };
// }

// function startGame(){
//     start = true;
//     initGame();
//     showStopBtn();
//     startTimer();
//     showTimerAndScore();
//     sound.playBg();
// }

// function stopGame(){
//     start = false;
//     hideStopBtn();
//     stopTimer();
//     replayBanner.showText('지구를 지켜야 해요!');
//     sound.stopBg();
//     sound.playAlert();
// }

// function sucessGame(){
//     stopTimer();
//     sound.stopBg();
//     sound.playWin();
// }

// function startTimer(){
//     let count = GAME_TIMER_SEC;
//     timerUpdate(count);
//     counter = setInterval(() => {
//         if(count <= 0){
//             stopGame();
//             return
//         }
//         timerUpdate(--count);
//     }, 1000)
// }

// function stopTimer(){
//     hideStopBtn();
//     clearInterval(counter);
//     gameStaion.reset();
// }

// function timerUpdate(time){
//     const seconds = Math.floor(time % 60);
//     gameTimer.innerHTML =`00:${String(seconds).padStart(2, 0)}`;
// }

// function showTimerAndScore(){
//     gameTimer.style.visibility = 'visible';
//     gameCounter.style.visibility = 'visible';
// }

// function showStopBtn(){
//     const icon = document.querySelector('.fas');
//     icon.classList.add('fa-stop');
//     icon.classList.remove('fa-play');
//     gameBtn.style.visibility = 'visible';
// }

// function hideStopBtn(){
//     gameBtn.style.visibility = 'hidden';
// }

// function initGame(){
//     score = 0;
//     gameCounter.innerText = BUG_COUNT;
//     gameStaion.init();
// }

// function updateScoreBoard(){
//     gameCounter.innerText = BUG_COUNT - score;
// }
