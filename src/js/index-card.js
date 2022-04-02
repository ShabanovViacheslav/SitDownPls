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

  // similar

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

  // modul

  const btn = buy;
  const modul = document.querySelector('.modul');
  const input = document.querySelector('.modul__input_name');
  const box = document.querySelector('.modul__box_main');
  
  btn.addEventListener('click', () => {
    modul.classList.toggle('modul_visible');
    box.classList.toggle('modul__box_visible');
    input.focus();
  });

  const greet = document.querySelector('.modul__greet');
  const thanks = document.querySelector('.modul__thanks');
  const close = closemain;

  close.addEventListener('click', () => {
    modul.classList.toggle('modul_visible');
    box.classList.toggle('modul__box_visible');
    if(thanks.classList.contains('modul__thanks_visible')) {
      greet.classList.toggle('modul__greet_hidden');
      thanks.classList.toggle('modul__thanks_visible');
    }
  });

  const validation = new JustValidate('.modul__form', {
    rules: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 15,
      },
      phone: {
        required: true,
      },
      agreement: {
        required: true,
      },
    },
    colorWrong: '#FF6972',
    messages: {
      name: 'Недопустимый формат',
      phone: 'Недопустимый формат',
      agreement: 'Примите соглашение',
    },
    submitHandler: function (form, values, ajax) {
      greet.classList.toggle('modul__greet_hidden');
      thanks.classList.toggle('modul__thanks_visible');
      close.focus();
      ajax({
        url: 'mail.php',
        method: 'POST',
        data: values,
        async: true,
        callback: function()  {
          form.reset();
          getModal();
        }
      });
    },
  });

  const swBtn = document.querySelector('.stuff__btn');
  const swBox = document.querySelector('.modul__box_swiper');

  swBtn.addEventListener('click', () => {
    modul.classList.toggle('modul_visible');
    swBox.classList.toggle('modul__box_visiblesw');
  });

  const closeSw = closeswiper;

  closeSw.addEventListener('click', () => {
    modul.classList.toggle('modul_visible');
    swBox.classList.toggle('modul__box_visiblesw');
  });

  let swiper2 = new Swiper('.modul__thumbs', {
    loop: true,
    navigation: {
        nextEl: ".modul__btn_next",
        prevEl: ".modul__btn_prev",
      },
    slidesPerView: 2,
    initialSlide: 1,
    breakpoints: {
      320: {
        slidesPerView: 1,
        initialSlide: 3,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        initialSlide: 2,
      },
      1920: {
        slidesPerView: 4,
        initialSlide: 1,
      },
    },
    freeMode: true,
    watchSlidesProgress: true,
  });

  let swiper = new Swiper(".modul__swiper", {
    loop: true,
    thumbs: {
      swiper: swiper2,
      autoScrollOffset: 2,
    },
  });

  const phone = document.querySelector(".modul__input_phone");
  let im = new Inputmask("+7(999) 999-99-99");
  im.mask(phone);

})();


