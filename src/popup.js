'use strict';

export default class PopUp{
    constructor() {
        this.popUp = document.querySelector('.popup');
        this.popUpBtn = document.querySelector('.replayBtn');
        this.popUpText = document.querySelector('.popup__message');
        this.popUpBtn.addEventListener('click', () =>{
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(click){
        this.onClick = click;
    }

    showText(messege){
        this.popUpText.textContent = messege;
        this.popUp.classList.remove('hidden');
    }

    hide(){
        this.popUp.classList.add('hidden');
    }
}