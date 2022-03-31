const carrotSound = new Audio('./resource/sound/carrot_pull.mp3');
const bugSound = new Audio('./resource/sound/bug_pull.mp3');
const bgSound = new Audio('./resource/sound/bg.mp3');
const alertSound = new Audio('./resource/sound/alert.wav');
const winSound = new Audio('./resource/sound/game_win.mp3');

export function playCarrot(){
    playSound(carrotSound);
}

export function playBug(){
    playSound(bugSound);
}

export function playWin(){
    playSound(winSound);
}

export function playAlert(){
    playSound(alertSound);
}

export function playBg(){
    playSound(bgSound);
}

export function stopBg(){
    stopSound(bgSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}