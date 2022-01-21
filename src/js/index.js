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

  // hero

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

  // offer

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

  // rate

  const btnRate = document.querySelector('.btn_primaryrate');
  const cards = document.querySelectorAll('.card_rate');

  function setCardsView (elements, selector) {
    for (let i of elements) {
      if(window.innerWidth < 1920 && i.dataset.size === '1024') {
        i.classList.add(selector);
      } else if (window.innerWidth >= 1920 && i.dataset.size === '1024') {
        i.classList.remove(selector);
      }
    }
  };

  setCardsView(cards, 'card_hidden');

  function getVisibleCards () {
    let n = (window.innerWidth < 1023) ? 2 :
      (window.innerWidth < 1919) ? 3 :
      4;
    let isEmpty = false;
    outer: for (let i of cards) {
      while(n) {
        if (i.classList.contains('card_hidden')) {
          btnRate.addEventListener('click', (e) => {
            i.classList.remove('card_hidden');
            e.currentTarget.scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
            getVisibleCards();
          },
          {once: true})
          isEmpty = true;
          n -= 1;
          continue outer;
        }
        continue outer;
      }
    }
    if (!isEmpty) {
      btnRate.classList.add('card_hidden');
    }
  }

  getVisibleCards();

  // categories

  const linkElements = document.querySelectorAll('.categories__link');

  function setLinkView (element) {
    for (let i of element) {
      i.firstChild.textContent = (window.innerWidth < 768) ? '' : 'В каталог ';
    }
  }

  setLinkView(linkElements);

  window.addEventListener('resize', ()=> {
    setCardsView(cards, 'card_hidden');
    setLinkView(linkElements);
  });
})();


