'use strict';

import * as sound from './sound.js';

const ITEM_SIZE = 50;

export const ItemName = Object.freeze({
    bug : 'bug',
    carrot : 'carrot',
}
);

export class Field{
    constructor(bugCount) {
        this.bugCount = bugCount;
        this.field = document.querySelector('.play-station');
        this.fieldRect = this.field.getBoundingClientRect();
        // this.onClick = this.onClick.bind(this);
        // this.field.addEventListener('click', (event) => this.onClick(event));
        this.field.addEventListener('click', this.onClick);
    }

    setClickListener(clickField){
        this.clickField = clickField;
    }

    onClick = event => {
        const target = event.target;
        if(target.matches('.bug__items')) {
            if(this.clickField && this.clickField(ItemName.bug)){
                return;
            }
            target.remove();
            sound.playCarrot();
        } else if(target.matches('.carrot__items')) {
            this.clickField && this.clickField(ItemName.carrot);
        }
    }

    init(){
        this.field.innerHTML = '';
        this._addItem('bug__items', this.bugCount, './resource/img/bug.png');
        this._addItem('carrot__items', this.bugCount, './resource/img/carrot.png');
    }

    _addItem(className, count, imgSrc){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - ITEM_SIZE;
        const y2 = this.fieldRect.height - ITEM_SIZE;
    
        for(let i = 0;i < count; i++){
            const items = document.createElement('img');
            items.setAttribute('class', className);
            items.setAttribute('src', imgSrc);
            const x = randomLocation(x1, x2);
            const y = randomLocation(y1, y2);
            randomLocation(x, y);
            items.style.left = `${x}px`;
            items.style.top = `${y}px`;
            items.style.transition = 'all ease-in-out 0.5s 0s';
            this.field.append(items);
        }
    }
}

function randomLocation(x, y){
    return Math.random() * y - x;
}