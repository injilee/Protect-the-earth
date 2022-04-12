'use strict';

const ITEM_SIZE = 50;

export const ItemName = Object.freeze({
    bug : 'bug',
    carrot : 'carrot',
}
);

export default class Field{
    constructor(bugCount, carrotCount) {
        this.bugCount = bugCount;
        this.carrotCount = carrotCount;
        this.field = document.querySelector('.play-station');
        this.fieldRect = this.field.getBoundingClientRect();
        // this.onClick = this.onClick.bind(this);
        // this.field.addEventListener('click', (event) => this.onClick(event));
        this.field.addEventListener('click', this.onClick);

        this.timer = undefined;
        this.fieldWidth = this.fieldRect.width - ITEM_SIZE;
        this.fieldHeight = this.fieldRect.height - ITEM_SIZE;
    }

    setClickListener(clickField){
        this.clickField = clickField;
    }

    onClick = event =>{
        // console.log(event.target);
        this.clickField && this.clickField(event.target);
    }

    init(){
        this.field.innerHTML = '';
        this._addItem('bug__items', this.bugCount, './resource/img/bug.png');
        this._addItem('carrot__items', this.carrotCount, './resource/img/carrot.png');
        this.move(this.fieldWidth, this.fieldHeight);
    }

    _addItem(className, count, imgSrc){
        const x1 = 0;
        const y1 = 0;
    
        for(let i = 0;i < count; i++){
            const items = document.createElement('img');
            items.setAttribute('class', className);
            items.setAttribute('src', imgSrc);
            const x = randomLocation(x1, this.fieldWidth);
            const y = randomLocation(y1, this.fieldHeight);
            randomLocation(x, y);
            items.style.left = `${x}px`;
            items.style.top = `${y}px`;
            this.field.append(items);
        }
    }
    move(x, y){
        const bugs = document.querySelectorAll('.bug__items');
        this.timer = setInterval(() => {
            bugs.forEach((bug) => {
                const x1 = randomLocation(-50, 50);
                const y1 = randomLocation(-50, 50);

                let bugX = parseFloat(bug.style.left);
                let bugY = parseFloat(bug.style.top);
                bugX += x1;
                bugY += y1;

                if(bugX > 0 && bugX < x){
                    bug.style.left = `${bugX}px`;
                }
                if(bugY > 0 && bugY < y){
                    bug.style.top = `${bugY}px`;
                }
                bug.style.transition = 'all ease 1000ms';
            })
        }, 100);
    }
    moveStop(){
        clearInterval(this.timer);
    }
}

function randomLocation(x, y){
    return Math.random() * (y - x) + x;
}