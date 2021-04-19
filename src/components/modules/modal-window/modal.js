(function () {
  const questionsButton = document.querySelector('.questions__button');
  const modalWindow = document.querySelector('.modal-window');
  const closeButton = document.querySelector('.modal-window__close-btn');
  const applyButton = document.querySelector('.modal-window__apply-btn');
  const pageMain = document.querySelector('.page__main');
  const pageHeader = document.querySelector('.page__header');
  const body = document.querySelector("body");
  const contactsIframe = document.querySelector('.contacts__iframe')
  const allLinks = body.querySelectorAll('a');
  const allButtons = body.querySelectorAll('button');

  const removeTabNavigation = function (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === closeButton || array[i] === applyButton) {
        continue;
      }
      array[i].setAttribute('tabindex', '-1');
    }
    contactsIframe.style.display = 'none';
  };

  const addTabNavigation = function (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].setAttribute('tabindex', '0');
    }
    contactsIframe.style.display = 'block';
  };

  const handleEscKeyDown = (evt) => {
    if (evt.code === `Escape`) {
      evt.preventDefault();

      closeModal();
    }
  };

  const showModal = () => {
    modalWindow.classList.add('modal-window__overlay--open');
    setTimeout(function () {
      pageMain.classList.add('filter-blur');
    }, 300);
    setTimeout(function () {
      pageHeader.classList.add('filter-blur');
    }, 300);
    body.classList.add('modal-open');
    removeTabNavigation(allLinks);
    removeTabNavigation(allButtons);

    document.addEventListener(`keydown`, handleEscKeyDown);
  };

  const closeModal = () => {
    modalWindow.classList.remove('modal-window__overlay--open');
    pageMain.classList.remove('filter-blur');
    pageHeader.classList.remove('filter-blur');
    body.classList.remove('modal-open');
    addTabNavigation(allLinks);
    addTabNavigation(allButtons);

    document.removeEventListener(`keydown`, handleEscKeyDown);
  };

  questionsButton.addEventListener('click', showModal)

  closeButton.addEventListener('click', closeModal)
}());