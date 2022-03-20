(function(){
  "use strict";

  // header

  const selectElements = document.querySelectorAll('.header__select');

  for(let i of selectElements) {
    new Choices(i, {
      searchEnabled: false,
      itemSelectText: '',
    });
  }

  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__nav');
  const subMenu = document.querySelector('.header__subnav');
  
  burger.addEventListener('click', () => {
    menu.classList.toggle('header__nav_visible');
    burger.classList.toggle('header__burger_close');
    subMenu.classList.toggle('header__subnav_visible');
  })

  // card

  new Swiper('.swiper_similar', {
    allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'similar__btn_disabled'
    },
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
      1920: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 32,
      },
    },
    a11y: {
      nextSlideMessage: 'Cледующие предложения',
      prevSlideMessage: 'Предыдущие предложения',
    },
  });

  
})();


