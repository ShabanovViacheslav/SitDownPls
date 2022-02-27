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

  // catalog

  function setTitleView () {
    const title = document.querySelector('.catalog__title');
    title.textContent = (window.innerWidth < 1919) ? 'Фильтры: ' : 'Фильтровать по: ';
  }

  setTitleView ();

  new Swiper('.swiper_catalog', {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 16,
    breakpoints: {
      768 : {
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
      }, 
    },
    grid: {
      rows: 3,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '" aria-label="Следующий слайд">' + (index + 1) + "</span>";
      },
    },
  });

  let range = document.querySelector('.catalog__range');

  noUiSlider.create(range, {
    start: [2000, 130000],
    connect: true,
    range: {
        'min': 10,
        'max': 150000
    }
  });

  let values = [
    document.getElementById('from'),
    document.getElementById('to')
  ];

  range.noUiSlider.on('update', function (val, handle) {
      values[handle].value = Math.round(val[handle]);
      if (document.querySelector('.catalog__tag_price') && handle === 1) {
        let p = document.querySelector('.catalog__tag_price p');
        p.textContent = `До ${Math.round(val[handle])}`;
      };
  });

  values[0].addEventListener('change', function (e) {
    e.preventDefault();
    range.noUiSlider.set([e.currentTarget.value, null]);
  });

  values[1].addEventListener('change', function (e) {
    e.preventDefault();
    range.noUiSlider.set([null, e.currentTarget.value]);
  });

  if(window.innerWidth < 1920) {
    const btns = document.querySelectorAll('.catalog__btn');
    const lists = document.querySelectorAll('.catalog__sublist');
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('catalog__btn_open');
        lists[i].classList.toggle('catalog__sublist_visible');
      })
    }
    if(window.innerWidth < 1024) {
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', (e) => {
          e.preventDefault();
          e.currentTarget.classList.toggle('catalog__btn_active');
          lists[i].classList.toggle('catalog__sublist_active');
        })
      }
    }
  }

  const checkElements = document.querySelectorAll('.catalog__check');
  const tagElement = document.querySelector('.catalog__tags');

  for (let i = 0; i < checkElements.length; i++) {
    checkElements[i].addEventListener('change', (e) => {
      if (Number(e.currentTarget.dataset.status) === 0) {
        e.currentTarget.dataset.status = 1;

        let div = document.createElement('div');
        div.className = 'catalog__tag';
        div.classList.add(`catalog__tag_${e.currentTarget.dataset.type}`);
        div.dataset.item = e.currentTarget.id;
        div.innerHTML = (e.currentTarget.labels[0].textContent === 'Не важно') ?
          '<p>Нет скидки</p>' :
          `<p>${e.currentTarget.labels[0].textContent}</p>`;
        let btn = document.createElement('button');
        btn.className = 'catalog__close';
        btn.setAttribute('aria-label', 'Снять фильтр');

        for(let i=1; i<=2; i++) {
          let line = document.createElement('span');
          line.className = 'catalog__line';
          btn.append(line);
        };
          
        div.append(btn);

        tagElement.append(div);

        let close = tagElement.querySelector(`div[data-item="${e.currentTarget.id}"] button`);
        close.addEventListener('click', (ev) => {
          e.target.dataset.status = 0;
          e.target.checked = false;
          ev.currentTarget.parentElement.remove();
        })        
      } else {
        e.currentTarget.dataset.status = 0;
        tagElement.querySelector(`div[data-item="${e.currentTarget.id}"]`).remove();
      };
    })
  };

  const checkElement = document.querySelector('#to');

  checkElement.addEventListener('change', (e) => {
    if (!document.querySelector('.catalog__tag_price')) {
      let div = document.createElement('div');
      div.className = 'catalog__tag';
      div.classList.add(`catalog__tag_${e.currentTarget.dataset.type}`);
      div.dataset.item = e.currentTarget.id;
      div.innerHTML = `<p>До ${e.currentTarget.value}</p>`;

      let btn = document.createElement('button');
      btn.className = 'catalog__close';
      btn.setAttribute('aria-label', 'Снять фильтр');

      for(let i=1; i<=2; i++) {
        let line = document.createElement('span');
        line.className = 'catalog__line';
        btn.append(line);
      };
        
      div.append(btn);

      tagElement.append(div);
    } else {
      let p = document.querySelector('.catalog__tag_price p');
      p.textContent = `До ${e.currentTarget.value}`;
    }

    let close = tagElement.querySelector(`div[data-item="${e.currentTarget.id}"] button`);
    close.addEventListener('click', (ev) => {
      e.target.dataset.status = 0;
      e.target.checked = false;
      ev.currentTarget.parentElement.remove();
    })
  })

  const btnElements = document.querySelectorAll('.catalog__close');

  for (let i = 0; i < btnElements.length; i++) {
    btnElements[i].addEventListener('click', (e) => {
      let selector = e.currentTarget.parentElement.dataset.item;
      let element = document.querySelector(`#${selector}`);
      if (element.type === 'number') {
        element.value = '';
      } else {
        element.checked = false;
        element.dataset.status = 0;
      }
      e.currentTarget.parentElement.remove();
    }, {
      once: true,
    })
  }

  const addElements = document.querySelectorAll('.catalog__add');

  for (let i = 0; i < addElements.length; i++) {
    addElements[i].addEventListener('click', (e) => {
      e.preventDefault();
      let currentValue = e.currentTarget.textContent;
      let parentEl = e.currentTarget.parentElement.parentElement;
      let exampleEl = parentEl.querySelectorAll('li[data-example="1"]');
      exampleEl.forEach((item) => {
        let classValue = item.classList[0];
        item.classList.toggle(`${classValue}_hidden`);
      });
      e.currentTarget.textContent = e.currentTarget.dataset.text;
      e.currentTarget.dataset.text = currentValue;
    })
  }

  const contrEls = document.querySelectorAll('.noUi-handle');
  const barEl = document.querySelector('.noUi-connect');

  contrEls.forEach((item) => {
    item.addEventListener('focus', () => {
      barEl.classList.add('noUi-connect-focus');
    });

    item.addEventListener('blur', () => {
      barEl.classList.remove('noUi-connect-focus');
    });
  });

  window.addEventListener('resize', ()=> {
    setTitleView();
  });
})();


