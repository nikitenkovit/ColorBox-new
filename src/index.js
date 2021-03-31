import './styles/normalize.css';
import './styles/main.scss';

import "./components/modules/header/header";
import './components/modules/modal-window/modal';

import {startIncreasingNumbers} from "./components/modules/statistics/statistics";

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
import CasesHoverMove from "./components/modules/cases/cases-hover-move";

const containers = document.querySelectorAll(`.cases__item`);

for (let i = 0; i < containers.length; i++) {
    const hoverMove = new CasesHoverMove(containers[i], `.cases-frame__description`);
    hoverMove.init();
}

// инициализация слайдера. Блок Производство
import {ChiefSlider} from "./components/modules/production/chiefSlider";

document.addEventListener('DOMContentLoaded', function() {
    const $slider = document.querySelector('[data-slider="chiefslider"]');

    new ChiefSlider($slider, {
        loop: true,
        autoplay: true,
        interval: 5000,
        refresh: true,
    });
});

// анимация

const statistics = document.querySelector('.statistics');
const statisticsCoords = statistics.getBoundingClientRect().top + (statistics.offsetHeight / 2);
const casesList = document.querySelector('.cases__list')
const casesListCoords = casesList.getBoundingClientRect().top + (casesList.offsetHeight / 6.5);
const blogWrapper = document.querySelector('.blog__wrapper');
const blogWrapperCoords = blogWrapper.getBoundingClientRect().top + (blogWrapper.offsetHeight / 1.2);
const clientsList = document.querySelector('.clients__list');
const clientsListCoords = clientsList.getBoundingClientRect().top + (clientsList.offsetHeight / 1.4);

let windowHeight = document.documentElement.clientHeight;
let bottomHeightValue = 0;

window.addEventListener('scroll', function () {

    bottomHeightValue = windowHeight + window.pageYOffset;
    if (bottomHeightValue >= statisticsCoords) {
        startIncreasingNumbers();
    }
    if (bottomHeightValue >= casesListCoords) {
        casesList.classList.add('cases__list--show');
    }
    if (bottomHeightValue >= blogWrapperCoords) {
        blogWrapper.classList.add('blog__wrapper--show');
    }
    if (bottomHeightValue >= clientsListCoords) {
        clientsList.classList.add('clients__list--show');
    }
});
