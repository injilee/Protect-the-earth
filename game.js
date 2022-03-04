'use strict';

const startBtn = document.querySelector('.startBtn');
const stopIcon = document.querySelector('.startBtn i');
const stopBtn = document.querySelector('.stopBtn');
const countDown = document.querySelector('.countDown');
const popUp = document.querySelector('.setting-box .popup');
const replayBtn = document.querySelector('.replayBtn');

function startGame(){
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

let count = 11;
let counter = null;
function countTimer(){
    counter = setInterval(() => {
        count = count - 1;
        if(count <= 0){
            stopTimer(counter);
            popUp.classList.remove('hidden');
            stopBtn.classList.add('visibility');
            span.innerText = `지구를 지켜야 해요!`;
        }
        countDown.innerHTML =`00:${String(count).padStart(2, 0)}`;
    }, 1000);
    return count = 11;
}


const span = document.querySelector('.popup span');

function stopGame(){
    stopTimer(counter);
    stopBtn.classList.add('visibility');
    span.innerText = `지구를 지켜야 해요!`;
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
}

// bug and carrot
const bugCount = document.querySelector('.setting-box .container .counter span');
const fields = document.querySelector('.play-station .items-fields');
const bug = document.querySelectorAll('.bug-items');
const carrot = document.querySelector('.carrot-items');

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

let countBug = 10;
function selectBug(e){
    countBug = countBug - 1;
    if(countBug == 0){
        e.target.remove();
        sucess();
    } else if (e.target.className == 'carrot-items'){
        stopGame();
    } else if (e.target.className == 'bug-items'){
        bugCount.innerText = `${countBug}`;
        e.target.remove();
    }
}

function sucess(){
    bugCount.innerText = `0`;
    span.innerText = `만세! 지구를 지켰다!`;
    stopTimer(counter);
    stopBtn.classList.add('visibility');
}

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
replayBtn.addEventListener('click', replayGame);
fields.addEventListener('click', selectBug);