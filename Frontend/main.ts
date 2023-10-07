'use strict';

const tinderContainer: HTMLElement = document.querySelector('.tinder');
const allCards: NodeListOf<HTMLElement> = document.querySelectorAll('.tinder--card');
const nope: HTMLElement = document.getElementById('nope');
const love: HTMLElement = document.getElementById('love');

function initCards(): void {
  const newCards: NodeListOf<HTMLElement> = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach((card, index) => {
    card.style.zIndex = (allCards.length - index).toString();
    card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
    card.style.opacity = ((10 - index) / 10).toString();
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach((el: HTMLElement) => {
  const hammertime = new Hammer(el);

  hammertime.on('pan', (event: any) => {
    el.classList.add('moving');
  });

  hammertime.on('pan', (event: any) => {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
  });

  hammertime.on('panend', (event: any) => {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    const moveOutWidth: number = document.body.clientWidth;
    const keep: boolean = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      const endX: number = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      const toX: number = event.deltaX > 0 ? endX : -endX;
      const endY: number = Math.abs(event.velocityY) * moveOutWidth;
      const toY: number = event.deltaY > 0 ? endY : -endY;
      const xMulti: number = event.deltaX * 0.03;
      const yMulti: number = event.deltaY / 80;
      const rotate: number = xMulti * yMulti;

      event.target.style.transform = `translate(${toX}px, ${(toY + event.deltaY)}px) rotate(${rotate}deg)`;
      initCards();
    }
  });
});

function createButtonListener(love: boolean): (event: Event) => void {
  return function (event: Event): void {
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.tinder--card:not(.removed)');
    const moveOutWidth: number = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    const card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
    } else {
      card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
    }

    initCards();

    event.preventDefault();
  };
}

const nopeListener: (event: Event) => void = createButtonListener(false);
const loveListener: (event: Event) => void = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
