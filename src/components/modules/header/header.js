(function () {
  const pageHeader = document.querySelector('.page__header');
  const introduction = document.getElementById('introduction');
  const bottomNavigation = document.querySelector(`.bottom-navigation`);
  const topWrapper = document.querySelector(`.header__top .header__wrapper`);
  const bottomWrapper = document.querySelector(`.header__bottom .header__wrapper`);
  const headerContacts = document.querySelector(`.header-contacts`);
  const headerSocial = document.querySelector(`.header-social`);
  const headerToggleButton = document.querySelector(`.header__toggle-button`);
  const body = document.querySelector(`body`);
  let currentIntroductionMarginTop = introduction ? parseInt(getComputedStyle(introduction).marginTop, 10) : 0;
  let currentPageWidth = document.documentElement.clientWidth;

  /*position fixed and head height compensation start*/

  const ResolutionWidth = {
    'BIG': 2099,
    'SMALL': 1400,
    'MOBILE': 1080,
    'TABLET': 1000,
    'BIG_PHONE': 767,
    'SMALL_PHONE': 374
  };
  const IntroductionMarginTopValue = {
    'BIG': 82,
    'MIDDLE': 55.6,
    'SMALL': 49,
    'MOBILE': 49,
    'TABLET': 0,
    'BIG_PHONE': 0,
    'SMALL_PHONE': 0
  };

  const toggleBody = () => {
    if (document.querySelector(`.bottom-navigation--active`)) {
      body.style.height = `100vh`;
      body.style.overflowY = `hidden`;
    } else {
      body.style.height = ``;
      body.style.overflowY = ``;
    }
  }

  const headerButtonClickHandler = () => {
    headerToggleButton.classList.toggle(`header__toggle-button--active`);
    bottomNavigation.classList.toggle(`bottom-navigation--active`)
    toggleBody();
  };

  headerToggleButton.addEventListener(`click`, headerButtonClickHandler);

  const toggleToMobile = () => {
    bottomNavigation.insertAdjacentElement(`beforeend`, headerContacts);
    bottomNavigation.insertAdjacentElement(`beforeend`, headerSocial);
  };

  const toggleToDesktop = () => {
    topWrapper.insertAdjacentElement(`beforeend`, headerContacts);
    bottomWrapper.insertAdjacentElement(`beforeend`, headerSocial);
  };

  const checkIsNeedToggleHeader = () => {
    if (currentPageWidth <= ResolutionWidth.BIG_PHONE) {
      toggleToMobile();
    } else if (currentPageWidth > ResolutionWidth.BIG_PHONE) {
      toggleToDesktop();
    }
  };

  checkIsNeedToggleHeader();

  window.addEventListener('resize', function () {
    currentPageWidth = document.documentElement.clientWidth;

    if (currentPageWidth > ResolutionWidth.BIG) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.BIG;
    } else if (currentPageWidth <= ResolutionWidth.BIG && currentPageWidth > ResolutionWidth.SMALL) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.MIDDLE;
    } else if (currentPageWidth <= ResolutionWidth.SMALL && currentPageWidth > ResolutionWidth.MOBILE) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.SMALL;
    } else if (currentPageWidth <= ResolutionWidth.MOBILE && currentPageWidth > ResolutionWidth.TABLET) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.MOBILE;
    } else if (currentPageWidth <= ResolutionWidth.TABLET && currentPageWidth > ResolutionWidth.BIG_PHONE) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.TABLET;
    } else if (currentPageWidth <= ResolutionWidth.BIG_PHONE && currentPageWidth > ResolutionWidth.SMALL_PHONE) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.BIG_PHONE;
    } else if (currentPageWidth <= ResolutionWidth.SMALL_PHONE) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.SMALL_PHONE;
    }

    introduction.style.marginTop = currentIntroductionMarginTop + 'px';
    checkIsNeedToggleHeader();
  });


  const lockHeader = function () {
    pageHeader.style.position = 'fixed';
    pageHeader.style.left = '50%';
    pageHeader.style.transform = 'translateX(-50%)';

    headHeightCompensation();
  };

  const headHeightCompensation = function () {
    const headerHeight = pageHeader.offsetHeight;

    introduction.style.marginTop = headerHeight + currentIntroductionMarginTop + 'px';
  };

  const unlockHeader = function () {
    pageHeader.style.position = '';
    pageHeader.style.left = '0';
    pageHeader.style.transform = 'translateX(0)';

    introduction.style.marginTop = currentIntroductionMarginTop + 'px';
  };

  const checkWindowPosition = function (callback1, callback2) {
    window.pageYOffset > 1 ? callback1() : callback2();
  };

  window.addEventListener('scroll', function () {
    if (currentPageWidth > ResolutionWidth.TABLET) {
      checkWindowPosition(lockHeader, unlockHeader)
    }
  });
  /*position fixed and head height compensation end*/

  bottomNavigation.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`bottom-navigation__link`)
        && bottomNavigation.classList.contains(`bottom-navigation--active`))
    {
      headerButtonClickHandler();
    }
  })

  /*smooth scroll to the anchor*/
  let pageHeaderHeight = pageHeader.offsetHeight;

  const linkNav = document.querySelectorAll('.scroll-element');

  const V = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)

  for (let i = 0; i < linkNav.length; i++) {

    linkNav[i].addEventListener('click', function (e) { //по клику на ссылку

      // e.preventDefault(); //отменяем стандартное поведение

      let w = window.pageYOffset,  // производим прокрутка прокрутка
          hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
      let t = document.querySelector(hash).getBoundingClientRect().top - pageHeaderHeight - 40,  // отступ от окна браузера до id
          start = null;

      requestAnimationFrame(step);
      requestAnimationFrame(step);

      function step(time) {
        if (start === null) start = time;
        let progress = time - start,
            r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step)
        } else {
          location.hash = hash  // URL с хэшем
        }
      }
    }, false);
  }
})();