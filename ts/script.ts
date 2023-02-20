const refs = {
  doorsWrapperRef: document.querySelector('.doors-wrapper') as HTMLElement,
  doorsRef: document.querySelectorAll('.door-wrapper') as NodeListOf<HTMLElement>,
  percentRef: document.querySelector('.percent') as HTMLElement,
  resultRef: document.querySelector('.result') as HTMLElement,
  imageRef: document.querySelector('.modal-img') as HTMLImageElement,
  buttonRef: document.querySelector('.button') as HTMLElement,
  backdropRef: document.querySelector('.backdrop') as HTMLElement,
};

const sessionStatistics: Array<number> = [];

function createRandomNumber(): number {
  return Math.floor(Math.random() * 3 + 1);
}

function toggleModal(): void {
  refs.backdropRef.classList.toggle('active');
}

function calcStatistics(): number {
  const winsQuantity = sessionStatistics.filter(el => el === 1);
  return Number(((winsQuantity.length / sessionStatistics.length) * 100).toFixed());
}

function findRandomWrongDoor(door: HTMLElement, number: number): HTMLElement {
  const wrongDoors = [...refs.doorsRef].filter(el => {
    const doorWrapper: HTMLElement = door.closest('.door-wrapper')!;
    return (
      Number(el.dataset.number) !== Number(doorWrapper.dataset.number) &&
      Number(el.dataset.number) !== number
    );
  });

  return wrongDoors[Math.floor(Math.random() * wrongDoors.length)];
}

function findWinningDoor(number: number) {
  return [...refs.doorsRef].find(el => Number(el.dataset.number) === number);
}

function startGame(e: MouseEvent): void {
  const target = e.target as HTMLElement;

  if (target === refs.doorsWrapperRef) {
    return;
  }

  const randomNumber = createRandomNumber();

  const wrongDoor = findRandomWrongDoor(target, randomNumber);
  wrongDoor.classList.add('open');

  const winningDoor = findWinningDoor(randomNumber);
  winningDoor?.classList.add('winning');

  refs.doorsWrapperRef.addEventListener('click', finishGame, {
    once: true,
  });
}

function finishGame(e: MouseEvent): void {
  const target = e.target as HTMLElement;

  if (target === refs.doorsWrapperRef) {
    return;
  }

  const doorWrapper = target.closest('.door-wrapper');
  if (doorWrapper) {
    doorWrapper.classList.add('open');
  }

  if (doorWrapper?.classList.contains('winning')) {
    sessionStatistics.push(1);
    refs.resultRef.textContent = 'Вітаю, ти виграв автомобіль :)';
    refs.imageRef.src = './images/car.svg';
  } else {
    sessionStatistics.push(0);
    refs.resultRef.textContent = 'Нажаль, цього разу лише коза  :(';
    refs.imageRef.src = './images/goat.svg';
  }

  const result = calcStatistics();
  refs.percentRef.textContent = `${result}%`;

  toggleModal();
}

function resetGame(): void {
  refs.doorsWrapperRef.removeEventListener('click', startGame);

  refs.doorsRef.forEach(el => {
    if (el.classList.contains('open')) {
      el.classList.remove('open');
    }
    if (el.classList.contains('winning')) {
      el.classList.remove('winning');
    }
  });

  refs.doorsWrapperRef.addEventListener('click', startGame, { once: true });

  toggleModal();
}

refs.doorsWrapperRef.addEventListener('click', startGame, { once: true });
refs.buttonRef.addEventListener('click', resetGame);
