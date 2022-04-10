'use strict';

import Field from './field.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

export default class Game{
    constructor(bugCount, timerSec) {
        this.bugCount = bugCount;
        this.timerSec = timerSec;
        
        this.gameBtn = document.querySelector('.startBtn');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameCounter = document.querySelector('.game__counter');
        this.gameBtn.addEventListener('click', ()=>{
            if(this.started){
                this.stop();
            } else {
                this.start();
            }
        });

        this.gameStaion = new Field(bugCount);
        this.gameStaion.setClickListener(this.clickField);

        this.replayBanner = new PopUp();


        this.started = false;
        this.counter = undefined;
        this.score = 0;
    }

    setClickListener(onclick){
        this.onclick = onclick;
    }

    clickField = event => {
        if(!this.started){
            return;
        }
        if(event === 'bug'){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.bugCount){
                this.sucess(true);
            }
        } else if(event === 'carrot'){
            this.sucess(false);
        };
    }

    start(){
        this.started = true;
        this.initGame();
        this.showStopBtn();
        this.startTimer();
        this.showTimerAndScore();
        sound.playBg();
    }

    stop(){
        this.started = false;
        this.hideStopBtn();
        this.stopTimer();
        sound.stopBg();
        sound.playAlert();
        this.onclick && this.onclick('cancel');
    }
    
    sucess(win){
        this.stopTimer();
        sound.stopBg();
        sound.playWin();
        this.onclick && this.onclick(win ? 'win' : 'lose');
    }
    
    startTimer(){
        let count = this.timerSec;
        this.timerUpdate(count);
        this.counter = setInterval(() => {
            if(count <= 0){
                this.stop();
                return
            }
            this.timerUpdate(--count);
        }, 1000)
    }
    
    stopTimer(){
        this.hideStopBtn();
        clearInterval(this.counter);
        this.gameStaion.reset();
    }
    
    timerUpdate(time){
        const seconds = Math.floor(time % 60);
        this.gameTimer.innerHTML =`00:${String(seconds).padStart(2, 0)}`;
    }
    
    showTimerAndScore(){
        this.gameTimer.style.visibility = 'visible';
        this.gameCounter.style.visibility = 'visible';
    }
    
    showStopBtn(){
        const icon = document.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideStopBtn(){
        this.gameBtn.style.visibility = 'hidden';
    }
    
    initGame(){
        this.score = 0;
        this.gameCounter.innerText = this.bugCount;
        this.gameStaion.init();
    }
    
    updateScoreBoard(){
        this.gameCounter.innerText = this.bugCount - this.score;
    }

}