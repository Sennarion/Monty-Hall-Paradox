const wrapperRef = document.querySelector('.doors-wrapper');
const doorsRef = document.querySelectorAll('.door');
const percentRef = document.querySelector('.percent');

const resultRef = document.querySelector('.result');
const buttonRef = document.querySelector('.try-again');

const backdropRef = document.querySelector('.backdrop');

function createRandomNumber() {
  return Math.floor(Math.random() * 3 + 1);
}

const staticsArr = [];

wrapperRef.addEventListener('click', startGame, { once: true });

function startGame(e) {
  if (e.target === wrapperRef) {
    return;
  }

  const randomNumber = createRandomNumber();

  doorsRef.forEach(el => {
    if (Number(el.dataset.number) === randomNumber) {
      console.log(el.dataset.number);
      el.closest('.door-wrapper').classList.add('winning');
    }
  });

  const wrongDoor = findWrongDoor(e, randomNumber);

  openDoor(wrongDoor);

  wrapperRef.addEventListener('click', finishGame, {
    once: true,
  });
}

function finishGame(e) {
  if (e.target === wrapperRef) {
    return;
  }
  e.target.classList.add('open');
  if (e.target.closest('.door-wrapper').classList.contains('winning')) {
    staticsArr.push(1);
    resultRef.textContent = 'You won :)';
  } else {
    staticsArr.push(0);
    resultRef.textContent = 'You lose :(';
  }
  percentRef.textContent = calcStatistics();
  toggleModal();
}

function findWrongDoor(door, number) {
  const wrongDoors = [...doorsRef].filter(
    el =>
      Number(el.dataset.number) !== Number(door.target.dataset.number) &&
      Number(el.dataset.number) !== number
  );

  return wrongDoors[Math.floor(Math.random() * wrongDoors.length)];
}

function calcStatistics() {
  const trueResults = staticsArr.filter(el => el === 1);
  return (trueResults.length / staticsArr.length) * 100;
}

function openDoor(door) {
  door.classList.add('open');
}

function resetGame() {
  wrapperRef.removeEventListener('click', startGame);
  doorsRef.forEach(el => {
    if (el.classList.contains('open')) {
      el.classList.remove('open');
    }
    if (el.closest('.door-wrapper').classList.contains('winning')) {
      el.closest('.door-wrapper').classList.remove('winning');
    }
  });
  wrapperRef.addEventListener('click', startGame, { once: true });
  toggleModal();
}

buttonRef.addEventListener('click', resetGame);

function toggleModal() {
  backdropRef.classList.toggle('active');
}
