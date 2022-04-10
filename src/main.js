'use strict';

import PopUp from './popup.js';
import GameBuilder from './game.js';

const gamePlay = new GameBuilder()
    .setTimerDuration(10)
    .setBugCount(10)
    .build();
    
gamePlay.setClickListener((reason) => {
    let message;
    switch(reason) {
        case 'cancel':
            message = '다시 지구를 지키자!';
            break;
        case 'lose' :
            message = '지구를 지켜야 해요!';
            break;
        case 'win' :
            message = '만세! 지구를 지켰다!';
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
