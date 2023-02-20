"use strict";
const refs = {
    doorsWrapperRef: document.querySelector('.doors-wrapper'),
    doorsRef: document.querySelectorAll('.door-wrapper'),
    percentRef: document.querySelector('.percent'),
    resultRef: document.querySelector('.result'),
    imageRef: document.querySelector('.modal-img'),
    buttonRef: document.querySelector('.button'),
    backdropRef: document.querySelector('.backdrop'),
};
const sessionStatistics = [];
function createRandomNumber() {
    return Math.floor(Math.random() * 3 + 1);
}
function toggleModal() {
    refs.backdropRef.classList.toggle('active');
}
function calcStatistics() {
    const winsQuantity = sessionStatistics.filter(el => el === 1);
    return Number(((winsQuantity.length / sessionStatistics.length) * 100).toFixed());
}
function findRandomWrongDoor(door, number) {
    const wrongDoors = [...refs.doorsRef].filter(el => {
        const doorWrapper = door.closest('.door-wrapper');
        return (Number(el.dataset.number) !== Number(doorWrapper.dataset.number) &&
            Number(el.dataset.number) !== number);
    });
    return wrongDoors[Math.floor(Math.random() * wrongDoors.length)];
}
function findWinningDoor(number) {
    return [...refs.doorsRef].find(el => Number(el.dataset.number) === number);
}
function startGame(e) {
    const target = e.target;
    if (target === refs.doorsWrapperRef) {
        return;
    }
    const randomNumber = createRandomNumber();
    const wrongDoor = findRandomWrongDoor(target, randomNumber);
    wrongDoor.classList.add('open');
    const winningDoor = findWinningDoor(randomNumber);
    winningDoor === null || winningDoor === void 0 ? void 0 : winningDoor.classList.add('winning');
    refs.doorsWrapperRef.addEventListener('click', finishGame, {
        once: true,
    });
}
function finishGame(e) {
    const target = e.target;
    if (target === refs.doorsWrapperRef) {
        return;
    }
    const doorWrapper = target.closest('.door-wrapper');
    if (doorWrapper) {
        doorWrapper.classList.add('open');
    }
    if (doorWrapper === null || doorWrapper === void 0 ? void 0 : doorWrapper.classList.contains('winning')) {
        sessionStatistics.push(1);
        refs.resultRef.textContent = 'Вітаю, ти виграв автомобіль :)';
        refs.imageRef.src = './images/car.svg';
    }
    else {
        sessionStatistics.push(0);
        refs.resultRef.textContent = 'Нажаль, цього разу лише коза  :(';
        refs.imageRef.src = './images/goat.svg';
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
//# sourceMappingURL=script.js.map