import './styles/normalize.css';
import './styles/main.scss';

import "./components/modules/header/header";
import './components/modules/modal-window/modal';

import {startIncreasingNumbers} from "./components/modules/statistics/statistics";
import CasesHoverMove from "./components/modules/cases/cases-hover-move";
import {ChiefSlider} from "./js/chiefSlider";

// убирает фокус при клике на элемент. Фокус с клавиатуры остаётся доступным
const selectors = [`a[href]`, `button`];

document.addEventListener(`click`, (evt) => {
    selectors.forEach((selector) => {
        const clickedElement = evt.target.closest(selector);

        if (clickedElement && clickedElement === document.activeElement) {
            clickedElement.blur();
        }
    });
});

// иниализаци эффекта наведения мыши в блоке Кейсы
const containers = document.querySelectorAll(`.cases__item`);

for (let i = 0; i < containers.length; i++) {
    const hoverMove = new CasesHoverMove(containers[i], `.cases-frame__description`);
    hoverMove.init();
}

// инициализация слайдера. Блок Производство
document.addEventListener('DOMContentLoaded', function() {
    const $slider = document.getElementById('production');

    new ChiefSlider($slider, {
        loop: true,
        autoplay: true,
        interval: 5000,
        refresh: true,
    });
});

// инициализация слайдера. Блок Блог>
document.addEventListener('DOMContentLoaded', function() {
    const $slider = document.getElementById('blog');

    new ChiefSlider($slider, {
        loop: false,
        autoplay: false,
        interval: 5000,
        refresh: true,
    });
});

// debounce
const DEBOUNCE_INTERVAL = 300;

export const debounce = (callback, wait = DEBOUNCE_INTERVAL) => {
    let timeout = null;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), wait);
    };
};

// анимация

const statistics = document.querySelector('.statistics');
let statisticsCoords = statistics.getBoundingClientRect().top + (statistics.offsetHeight / 2);

let windowHeight = document.documentElement.clientHeight;
let bottomHeightValue = 0;

const changeHeightSettings = debounce(() => {
    windowHeight = document.documentElement.clientHeight;
    statisticsCoords = statistics.getBoundingClientRect().top + (statistics.offsetHeight / 2);
})

window.addEventListener(`resize`, changeHeightSettings);

window.addEventListener('scroll', function () {
    bottomHeightValue = windowHeight + window.pageYOffset;
    if (bottomHeightValue >= statisticsCoords) {
        startIncreasingNumbers();
    }
});
