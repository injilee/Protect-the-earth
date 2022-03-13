'use strict';

const startBtn = document.querySelector('.startBtn');
const stopIcon = document.querySelector('.startBtn i');
const stopBtn = document.querySelector('.stopBtn');
const countDown = document.querySelector('.countDown');
const popUp = document.querySelector('.setting-box .popup');
const replayBtn = document.querySelector('.replayBtn');
const span = document.querySelector('.popup span');

const bugCount = document.querySelector('.setting-box .container .counter span');
const fields = document.querySelector('.play-station .items-fields');
const bug = document.querySelectorAll('.bug-items');
const carrot = document.querySelector('.carrot-items');

const bgm = new Audio('./resource/sound/bg.mp3');
const popAlert = new Audio('./resource/sound/alert.wav');
const bugPull = new Audio('./resource/sound/bug_pull.mp3');
const carrotPull = new Audio('./resource/sound/carrot_pull.mp3');
const win = new Audio('./resource/sound/game_win.mp3');

let count = 11;
let counter = null;
let countBug = 10;


function startGame(){
    playSound(bgm);
    bugCount.innerText = `10`;
    showItems();
    fields.addEventListener('click', selectBug);

    if(startBtn.classList[1] == 'active'){
        startBtn.classList.remove('active');
        startBtn.classList.add('hidden');
    }
    stopBtn.classList.remove('hidden');
    stopBtn.classList.add('active');
    countTimer();
};

function countTimer(){
    counter = setInterval(() => {
        count = count - 1;
        if(count <= 0){
            stopTimer(counter);
            popUp.classList.remove('hidden');
            stopBtn.classList.add('visibility');
            span.innerText = `지구를 지켜야 해요!`;
            playSound(popAlert);
        }
        countDown.innerHTML =`00:${String(count).padStart(2, 0)}`;
    }, 1000);
    return count = 11;
}

function stopGame(){
    stopTimer(counter);
    stopBtn.classList.add('visibility');
    span.innerText = `지구를 지켜야 해요!`;
    playSound(popAlert);
    stopSound(bgm);
}

function replayGame(){
    stopBtn.classList.remove('visibility');
    popUp.classList.add('hidden');
    countDown.innerHTML =`00:00`;
    startGame();
    return countBug = 10;
};

function stopTimer(counter){
    clearInterval(counter);
    popUp.classList.remove('hidden');
    while(fields.firstChild){
        fields.removeChild(fields.firstChild);
    }
    stopSound(bgm);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function showItems(){
    for(let i = 0;i < 10; i++){
        const addBug = document.createElement('img');
        addBug.classList.add('bug-items');
        addBug.setAttribute('src', './resource/img/bug.png');
        
        const randomX = Math.floor(Math.random() * 300);
        const randomY = Math.floor(Math.random() * 500);
        addBug.style.top = randomX + `px`;
        addBug.style.left = randomY + `px`;

        fields.append(addBug);
    }

    for(let i = 0;i < 10; i++){
        const addCarrot = document.createElement('img');
        addCarrot.classList.add('carrot-items');
        addCarrot.setAttribute('src', './resource/img/carrot.png');

        const randomX = Math.floor(Math.random() * 300);
        const randomY = Math.floor(Math.random() * 500);
        addCarrot.style.top = randomX + `px`;
        addCarrot.style.left = randomY + `px`;

        fields.append(addCarrot);
    }

}

function selectBug(e){
    countBug = countBug - 1;
    if(countBug == 0){
        e.target.remove();
        sucess();
    } else if (e.target.className == 'carrot-items'){
        stopGame();
    } else if (e.target.className == 'bug-items'){
        bugCount.innerHTML = `${countBug}`;
        e.target.remove();
        playSound(carrotPull);
    }
}

function sucess(){
    bugCount.innerText = `0`;
    span.innerText = `만세! 지구를 지켰다!`;
    stopTimer(counter);
    stopBtn.classList.add('visibility');
    playSound(win);
    stopSound(bgm);
}

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
replayBtn.addEventListener('click', replayGame);
fields.addEventListener('click', selectBug);