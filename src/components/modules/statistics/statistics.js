const statisticsBlock = document.querySelector('.statistics');
const elementNumberOne = document.getElementById('statistics-number-1');
const elementNumberTwo = document.getElementById('statistics-number-2');
const elementNumberThree = document.getElementById('statistics-number-3');
const elementNumberFour = document.getElementById('statistics-number-4');

const necessaryNumberOne = parseInt(elementNumberOne.textContent, 10);
const necessaryNumberTwo = parseInt(elementNumberTwo.textContent, 10);
const necessaryNumberThree = parseInt(elementNumberThree.textContent, 10);
const necessaryNumberFour = parseInt(elementNumberFour.textContent, 10);

statisticsBlock.style.opacity = 0;

statisticsBlock.style.transition = `opacity .3s ease`;

let isAlreadyWorked = false;

const outputNumber = (number, element, time, step) => {
    let currentValueNumber = 0;

    const intervalTime = Math.round(time / (number / step));

    const interval = setInterval(function () {
        currentValueNumber += step;

        if (currentValueNumber >= number) {
            clearInterval(interval);
        }

        element.innerHTML = currentValueNumber;
    }, intervalTime);
};

export const startIncreasingNumbers = () => {
    statisticsBlock.style.opacity = 1;

    if (!isAlreadyWorked) {
        outputNumber(necessaryNumberOne, elementNumberOne, 3000, 7);
        outputNumber(necessaryNumberTwo, elementNumberTwo, 3000, 1);
        outputNumber(necessaryNumberThree, elementNumberThree, 3000, 1);
        outputNumber(necessaryNumberFour, elementNumberFour, 3000, 4);

        isAlreadyWorked = true;
    }
};
