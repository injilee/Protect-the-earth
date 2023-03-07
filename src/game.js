'use strict';

import Field from './field.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

// Object.freeze
export const Reason = Object.freeze({
   cancle: 'cancle',
   win: 'win',
   lose: 'lose',
});

// Builder Pattern
export class GameBuilder {
   setTimerDuration(duration) {
      this.duration = duration;
      return this;
   }

   setBugCount(num) {
      this.bugCount = num;
      return this;
   }

   setCarrotCount(num) {
      this.carrotCount = num;
      return this;
   }

   build() {
      return new Game(this.duration, this.bugCount, this.carrotCount);
   }
}

class Game {
   constructor(bugCount, carrotCount, timerSec) {
      this.bugCount = bugCount;
      this.carrotCount = carrotCount;
      this.timerSec = timerSec;

      this.gameBtn = document.querySelector('.startBtn');
      this.gameTimer = document.querySelector('.game__timer');
      this.gameCounter = document.querySelector('.game__counter');
      this.gameBtn.addEventListener('click', () => {
         if (this.started) {
            this.stop(Reason.cancle);
         } else {
            this.start();
         }
      });

      this.gameStaion = new Field(bugCount, carrotCount);
      this.gameStaion.setClickListener(this.clickField);

      this.replayBanner = new PopUp();

      this.started = false;
      this.counter = undefined;
      this.score = 0;
   }

   setClickListener(onclick) {
      this.onclick = onclick;
   }

   clickField = target => {
      if (!this.started) {
         return;
      }
      if (target.matches('.bug__items')) {
         target.remove();
         sound.playCarrot();

         this.score++;
         this.updateScoreBoard(this.score);

         if (this.score === this.bugCount) {
            this.stop(Reason.win);
         }
      } else if (target.matches('.carrot__items')) {
         this.stop(Reason.lose);
      }
   };

   start() {
      this.started = true;
      this.initGame();
      this.showStopBtn();
      this.startTimer();
      this.showTimerAndScore();
      sound.playBg();
   }

   stop(reason) {
      this.started = false;
      this.hideStopBtn();
      this.stopTimer();
      sound.stopBg();
      this.gameStaion.moveStop();
      // console.log(reason);
      this.onclick && this.onclick(reason);
   }

   startTimer() {
      let count = this.timerSec;
      this.timerUpdate(count);
      this.counter = setInterval(() => {
         if (count <= 0) {
            this.stop(Reason.lose);
            return;
         }
         this.timerUpdate(--count);
      }, 1000);
   }

   stopTimer() {
      this.hideStopBtn();
      clearInterval(this.counter);
   }

   timerUpdate(time) {
      const seconds = Math.floor(time % 60);
      this.gameTimer.innerHTML = `00:${String(seconds).padStart(2, 0)}`;
   }

   showTimerAndScore() {
      this.gameTimer.style.visibility = 'visible';
      this.gameCounter.style.visibility = 'visible';
   }

   showStopBtn() {
      const icon = document.querySelector('.fas');
      icon.classList.add('fa-stop');
      icon.classList.remove('fa-play');
      this.gameBtn.style.visibility = 'visible';
   }

   hideStopBtn() {
      this.gameBtn.style.visibility = 'hidden';
   }

   initGame() {
      this.score = 0;
      this.gameCounter.innerText = this.bugCount;
      this.gameStaion.init();
   }

   updateScoreBoard() {
      this.gameCounter.innerText = this.bugCount - this.score;
   }
}
