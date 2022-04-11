'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import {GameBuilder, Reason} from './game.js';

const gamePlay = new GameBuilder()
    .setTimerDuration(10)
    .setBugCount(10)
    .build();
    
gamePlay.setClickListener((reason) => {
    let message;
    switch(reason) {
        case Reason.cancle :
            message = '다시 지구를 지키자!';
            sound.playAlert();
            break;
        case Reason.lose :
            message = '지구를 지켜야 해요!';
            sound.playBug();
            break;
        case Reason.win :
            message = '만세! 지구를 지켰다!';
            sound.playWin();
            break;
        default :
            throw new Error('not reason');
    }
    replayBanner.showText(message);
});

const replayBanner = new PopUp();
replayBanner.setClickListener(() =>{
    gamePlay.start();
});
