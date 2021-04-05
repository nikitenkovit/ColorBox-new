(function () {
  const pageHeader = document.querySelector('.page__header');
  const introduction = document.querySelector('.introduction');
  let currentIntroductionMarginTop = parseInt(getComputedStyle(introduction).marginTop, 10);
  let currentPageWidth = document.documentElement.clientWidth;

  /*position fixed and head height compensation start*/

  const ResolutionWidth = {
    'BIG': 2099,
    'SMALL': 1400,
    'MOBILE': 1080,
    'TABLET': 1020,
    'BIG_PHONE': 767,
    'SMALL_PHONE': 374
  };
  const IntroductionMarginTopValue = {
    'BIG': 82,
    'MIDDLE': 55.6,
    'SMALL': 49,
    'MOBILE': 142.5,
    'TABLET': 99.75,
    'BIG_PHONE': 70,
    'SMALL_PHONE': 60
  };

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
      unlockHeader();
    } else if (currentPageWidth <= ResolutionWidth.TABLET && currentPageWidth > ResolutionWidth.BIG_PHONE) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.TABLET;
      unlockHeader();
    } else if (currentPageWidth <= ResolutionWidth.BIG_PHONE && currentPageWidth > ResolutionWidth.SMALL_PHONE) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.BIG_PHONE;
      unlockHeader();
    } else if (currentPageWidth <= ResolutionWidth.SMALL_PHONE) {
      currentIntroductionMarginTop = IntroductionMarginTopValue.SMALL_PHONE;
      unlockHeader();
    }

    introduction.style.marginTop = currentIntroductionMarginTop + 'px';
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
    pageHeader.style.position = 'static';
    pageHeader.style.left = '0';
    pageHeader.style.transform = 'translateX(0)';

    introduction.style.marginTop = currentIntroductionMarginTop + 'px';
  };

  const checkWindowPosition = function (callback1, callback2) {
    window.pageYOffset > 1 ? callback1() : callback2();
  };

  window.addEventListener('scroll', function () {

    if (currentPageWidth > ResolutionWidth.MOBILE) {
      checkWindowPosition(lockHeader, unlockHeader)
    }
  });
  /*position fixed and head height compensation end*/

  /*smooth scroll to the anchor*/
  let pageHeaderHeight = pageHeader.offsetHeight;

  if (currentPageWidth <= ResolutionWidth.MOBILE) {
    pageHeaderHeight = 30;
  }

  window.addEventListener('resize', function () {
    pageHeaderHeight = pageHeader.offsetHeight;
    if (currentPageWidth <= ResolutionWidth.MOBILE) {
      pageHeaderHeight = 30;
    }
  });

  const linkNav = document.querySelectorAll('.scroll-element');

  const V = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)

  for (let i = 0; i < linkNav.length; i++) {

    linkNav[i].addEventListener('click', function (e) { //по клику на ссылку

      e.preventDefault(); //отменяем стандартное поведение

      let w = window.pageYOffset,  // производим прокрутка прокрутка
          hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
      let t = document.querySelector(hash).getBoundingClientRect().top - pageHeaderHeight,  // отступ от окна браузера до id
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