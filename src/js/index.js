(function(){
  "use strict";

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

  new Swiper('.swiper_hero', {
    loop: true,
    autoplay: {
      delay: 10000,
    },
    speed: 500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    allowTouchMove: false,
  });

  new Swiper('.swiper_offer', {
    allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'offer__btn_disabled'
    },
    slidesPerView: "auto",
    slidesPerGroup: 1,
    spaceBetween: 0,
    breakpoints: {
      768: {
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      1024: {
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
    },
  });

  const btnPrev = document.querySelector('.offer__btn_prev');
  const btnNext = document.querySelector('.offer__btn_next');

  btnPrev.setAttribute('aria-label', 'Предыдущие предложения');
  btnNext.setAttribute('aria-label', 'Cледующие предложения');
})();


