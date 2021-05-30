import './styles/normalize.css';
import './styles/main.scss';

import "./components/modules/header/header";
import './components/modules/modal-window/modal';

import CasesHoverMove from "./components/modules/cases/cases-hover-move";
import {ChiefSlider} from "./js/chiefSlider";
import {phoneMask} from "./js/phone-mask";
import {statisticsFunction} from "./components/modules/statistics/statistics";

// анимация блока статистика

statisticsFunction();

// маска для номера телефона

phoneMask();

// иниализаци эффекта наведения мыши в блоке Кейсы
const containers = document.querySelectorAll(`.cases__item`);

for (let i = 0; i < containers.length; i++) {
  const hoverMove = new CasesHoverMove(containers[i], `.cases-frame__description`);
  hoverMove.init();
}

// инициализация слайдера

if (document.querySelector(`.page__main`)) {
  document.addEventListener('DOMContentLoaded', function () {
    const sliderProduction = document.getElementById('production');
    const sliderBlog = document.getElementById('blog');

    new ChiefSlider(sliderProduction, {
      loop: true,
      autoplay: true,
      interval: 5000,
      refresh: true,
    });

    new ChiefSlider(sliderBlog, {
      loop: false,
      autoplay: false,
      interval: 5000,
      refresh: true,
    });
  });
}

// форма

const form = document.querySelector(`.modal-window__form`);

if (form) {
  const allFields = form.querySelectorAll(`input, textarea`);
  const successfulMessage = document.querySelector(`.modal-window__successful-message`);

  const clearAllFields = () => {
    for (const field of allFields) {
      field.value = ``;
    }
  };

  const showSuccessfulMessage = () => {
    successfulMessage.classList.add(`modal-window__successful-message--active`);

    setTimeout(() => {
      successfulMessage.classList.remove(`modal-window__successful-message--active`);
    }, 3000)
  }

  const showError = () => {
    form.style.animation = `shake .6s`

    setTimeout(() => {
      form.style.animation = ``
    }, 600)
  }

  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {

      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log(this);
        showSuccessfulMessage();

        clearAllFields();
      } else if (this.readyState === XMLHttpRequest.DONE && this.status > 400) {
        showError();
      }
    }

    request.open(this.method, this.action, true);

    const data = new FormData(this);

    request.send(data);
  });
}
