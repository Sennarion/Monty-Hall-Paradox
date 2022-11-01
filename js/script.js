const refs = {
  doorsWrapperRef: document.querySelector('.doors-wrapper'),
  doorsRef: document.querySelectorAll('.door-wrapper'),
  percentRef: document.querySelector('.percent'),
  resultRef: document.querySelector('.result'),
  imageRef: document.querySelector('.modal-img'),
  buttonRef: document.querySelector('.button'),
  backdropRef: document.querySelector('.backdrop'),
};

const staticsArr = [];

function createRandomNumber() {
  return Math.floor(Math.random() * 3 + 1);
}

function toggleModal() {
  refs.backdropRef.classList.toggle('active');
}

function calcStatistics() {
  const trueResults = staticsArr.filter(el => el === 1);
  return ((trueResults.length / staticsArr.length) * 100).toFixed();
}

function findRandomWrongDoor(door, number) {
  const wrongDoors = [...refs.doorsRef].filter(
    el =>
      Number(el.dataset.number) !== Number(door.target.closest('.door-wrapper').dataset.number) &&
      Number(el.dataset.number) !== number
  );

  return wrongDoors[Math.floor(Math.random() * wrongDoors.length)];
}

function findWinningDoor(number) {
  return [...refs.doorsRef].find(el => Number(el.dataset.number) === number);
}

function startGame(e) {
  if (e.target === refs.doorsWrapperRef) {
    return;
  }

  const randomNumber = createRandomNumber();

  const wrongDoor = findRandomWrongDoor(e, randomNumber);
  wrongDoor.classList.add('open');

  const winningDoor = findWinningDoor(randomNumber);
  winningDoor.classList.add('winning');

  refs.doorsWrapperRef.addEventListener('click', finishGame, {
    once: true,
  });
}

function finishGame(e) {
  if (e.target === refs.doorsWrapperRef) {
    return;
  }

  e.target.closest('.door-wrapper').classList.add('open');

  if (e.target.closest('.door-wrapper').classList.contains('winning')) {
    staticsArr.push(1);
    refs.resultRef.textContent = 'Ти виграв автомобіль :)';
    refs.imageRef.src = './images/car.svg';
  } else {
    staticsArr.push(0);
    refs.resultRef.textContent = 'Ти програв, тому тримай цукерку :(';
    refs.imageRef.src = './images/candy.svg';
  }

  const result = calcStatistics();
  refs.percentRef.textContent = `${result}%`;

  toggleModal();
}

function resetGame() {
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
