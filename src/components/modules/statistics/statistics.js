const DEBOUNCE_INTERVAL = 300;

const debounce = (callback, wait = DEBOUNCE_INTERVAL) => {
    let timeout = null;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), wait);
    };
};

export const statisticsFunction = () => {
  const statisticsBlock = document.querySelector('.statistics');

  if (statisticsBlock) {
    const elementNumberOne = document.querySelector('.statistics-number-1');
    const elementNumberTwo = document.querySelector('.statistics-number-2');
    const elementNumberThree = document.querySelector('.statistics-number-3');
    const elementNumberFour = document.querySelector('.statistics-number-4');

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

    const startIncreasingNumbers = () => {
      statisticsBlock.style.opacity = 1;

      if (!isAlreadyWorked) {
        outputNumber(necessaryNumberOne, elementNumberOne, 3000, 7);
        outputNumber(necessaryNumberTwo, elementNumberTwo, 3000, 1);
        outputNumber(necessaryNumberThree, elementNumberThree, 3000, 1);
        outputNumber(necessaryNumberFour, elementNumberFour, 3000, 4);

        isAlreadyWorked = true;
      }
    };

    let statisticsCoords = statisticsBlock.getBoundingClientRect().top + (statisticsBlock.offsetHeight / 2);

    let windowHeight = document.documentElement.clientHeight;
    let bottomHeightValue = 0;

    const changeHeightSettings = debounce(() => {
      windowHeight = document.documentElement.clientHeight;
      statisticsCoords = statisticsBlock.getBoundingClientRect().top + (statisticsBlock.offsetHeight / 2);
    })

    window.addEventListener(`resize`, changeHeightSettings);

    window.addEventListener('scroll', function () {
      bottomHeightValue = windowHeight + window.pageYOffset;
      if (bottomHeightValue >= statisticsCoords) {
        startIncreasingNumbers();
      }
    });
  }
};

