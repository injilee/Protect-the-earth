# Protect-the-earth 🌎

It is a game to catch bugs wandering around the Earth. <br/>
지구를 지키기 위해 버그를 잡는 게임입니다.

# Let's play game

https://injilee.github.io/Protect-the-earth

# 스택

-  [x] Vanilla JS
-  [x] HTML
-  [x] CSS

# 기능 구현

Random Location

-  [x] 플레이 시작마다 각각 벌레(10마리), 당근(10개)를 랜덤하게 위치

Timer

-  [x] 10초 카운트 다운
-  [x] 00:00 유지
-  [x] 정지 버튼 클릭 시 카운트 정지
-  [x] 게임 종료 시 카운트 정지

Counter

-  [x] 벌레 클릭 시 남은 벌레 마리 수를 화면에 출력
-  [x] 값이 0이 되면 게임 성공 메시지 출력
-  [x] 당근을 클릭 시 게임 오버 메시지 출력과 함께 리플레이 팝업

Audio

-  [x] 개체에 맞는 사운드 효과 재생
-  [x] 게임 종료 시 배경음악 중지

## 2. 기능 구현

### 1) GameBuilder

### Builder Pattern 이용

```jsx
const gamePlay = new Game(10, 10, 10);
```

게임 실행 버튼을 클릭하면 위 코드처럼 생성자에 인자를 전달하게 되면 어떤 값인지 확인할 수 없고 인자가 3개 이상이 될 경우에는 가독성이 떨어지며 오타로 인한 오류가 발생할 수 있습니다.

-  수정한 코드

```jsx
const gamePlay = new GameBuilder().setTimerDuration(10).setBugCount(10).setCarrotCount(10).build();
```

method chaining을 사용해 메소드를 호출하였습니다.

-  GameBuilder

```jsx
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
```

인자가 전달되고, Game 생성과 동시에 오브젝트가 리턴됩니다.

### 2) Field

### Field 내 아이템(벌레, 당근) 랜덤하게 배치하기

```jsx
this.field = document.querySelector('.play-station');
this.fieldRect = field.getBoundingClientRect();

this.fieldWidth = this.fieldRect.width - ITEM_SIZE;
this.fieldHeight = this.fieldRect.height - ITEM_SIZE;
```

벌레와 당근을 랜덤하게 배치할 Field를 만들어 getBoundingClientRect() 함수로 Field element의 위치 정보를 받아옵니다. 벌레와 당근의 크기를 제외해줘야 아이템들이 Field 바깥으로 나가지 않게 할 수 있습니다.

```jsx
addItem(className, count, imgSrc) {
      const x1 = 0;
      const y1 = 0;

      for (let i = 0; i < count; i++) {
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
```

for loop 로 모든 아이템 element 들을 생성하여 field 위치에 배치하여 field의 자식 요소로 넣습니다.

```jsx
function randomLocation(x, y) {
   return Math.random() * (y - x) + x;
}
```

Math.random() 함수를 이용해 아이템들을 랜덤한 위치시킵니다. 이 상태에서는 아이템의 동작이 발생하지 않습니다. Move() 함수에서 벌레의 위치만 변경합니다. 간단한 로직을 처리하므로 randomLocation 함수는 game class 외부 함수로 두었습니다.

### 3) Move

```jsx
move(x, y) {
      const bugs = document.querySelectorAll('.bug__items');
      this.timer = setInterval(() => {
         bugs.forEach(bug => {
            const x1 = randomLocation(-50, 50);
            const y1 = randomLocation(-50, 50);

            let bugX = parseFloat(bug.style.left);
            let bugY = parseFloat(bug.style.top);
            bugX += x1;
            bugY += y1;

            if (bugX > 0 && bugX < x) {
               bug.style.left = `${bugX}px`;
            }
            if (bugY > 0 && bugY < y) {
               bug.style.top = `${bugY}px`;
            }
            bug.style.transition = 'all ease 1000ms';
         });
      }, 100);
   }

   moveStop() {
      clearInterval(this.timer);
   }
```

게임이 시작되어 끝나는 10초 동안 움직임을 주기 위해 setInterval() 함수가 실행되는 동안, 벌레의 위치가 변경되도록 합니다. 10초가 끝나면 clearInterval() 함수로 타이머를 중단합니다.

<br/>

```jsx
let bugX = parseFloat(bug.style.left);
let bugY = parseFloat(bug.style.top);
```

벌레를 잡아야 하는 게임이므로 벌레의 위치를 아래 코드처럼 bugX , bugY 변수에 담아놓습니다. console로 확인해보면 ‘270.348px 13.2432px’ 문자열이 포함된 값이 출력되기 때문에 ‘px’ 문자열을 제외한 실수만 추출하기 위해 parseFloat() 함수를 사용합니다.

<br/>

# 리팩토링

-  [x] 중복 코드 제거
-  [x] 상수 변수 추가
-  [x] 함수 수정
-  [x] JS 파일 모듈화
-  [x] 변수명 수정

# 반응형 디자인

-  [x] 미디어쿼리 생성 및 수정
-  [x] 브라우저 창 크기 변경 시 Field item 위치 자동 변경
-  [x] 크로스 브라우징
