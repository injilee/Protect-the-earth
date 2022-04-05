'use strict';

import Field from './field.js';
import * as sound from './sound.js';

export default class Game{
    constructor() {
        this.gameBtn = document.querySelector('.startBtn');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameCounter = document.querySelector('.game__counter');
        this.gameBtn.addEventListener('click', ()=>{
            if(start){
                stopGame();
            } else {
                startGame();
            }
        });

        this.gameStaion = new Field(BUG_COUNT);
        this.gameStaion.setClickListener(this.clickField);


        this.start = false;
        this.counter = undefined;
        this.score = 0;
    }

    setClickListener(onclick){
        this.onclick = onclick;
    }

    clickField(event){
        if(!start){
            return;
        }
        if(event === 'bug'){
            score++;
            updateScoreBoard();
            if(score === BUG_COUNT){
                target.remove;
                sucessGame();
                replayBanner.showText('만세! 지구를 지켰다!');
            }
        } else if(event === 'carrot'){
            stopGame();
        };
    }

    start(){
        start = true;
        initGame();
        showStopBtn();
        startTimer();
        showTimerAndScore();
        sound.playBg();
    }

    stop(){
        start = false;
        hideStopBtn();
        stopTimer();
        replayBanner.showText('지구를 지켜야 해요!');
        sound.stopBg();
        sound.playAlert();
    }
    
    sucess(){
        stopTimer();
        sound.stopBg();
        sound.playWin();
    }
    
    startTimer(){
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
    
    stopTimer(){
        hideStopBtn();
        clearInterval(counter);
        gameStaion.reset();
    }
    
    timerUpdate(time){
        const seconds = Math.floor(time % 60);
        gameTimer.innerHTML =`00:${String(seconds).padStart(2, 0)}`;
    }
    
    showTimerAndScore(){
        gameTimer.style.visibility = 'visible';
        gameCounter.style.visibility = 'visible';
    }
    
    showStopBtn(){
        const icon = document.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        gameBtn.style.visibility = 'visible';
    }
    
    hideStopBtn(){
        gameBtn.style.visibility = 'hidden';
    }
    
    initGame(){
        score = 0;
        gameCounter.innerText = BUG_COUNT;
        gameStaion.init();
    }
    
    updateScoreBoard(){
        gameCounter.innerText = BUG_COUNT - score;
    }

}