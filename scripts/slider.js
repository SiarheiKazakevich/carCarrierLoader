const buttons = document.querySelectorAll('.slider-item');
const photoSlider = document.getElementById('photoSlider');
const slidesContainer = document.getElementById('slides');
const closeButton = document.getElementById('closeSlider');

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentSlide = 0;
let totalSlides = 0;

/* ================================= */
/*       КЛИК ПО КНОПКЕ МАШИНЫ       */
/* ================================= */
buttons.forEach(button => {
  button.addEventListener('click', function () {
    /* Получаем название машины */
    const carName = button.textContent.trim();
    /* Кнопка "добавить" нам не нужна */
    if (button.classList.contains('add')) {
      return;
    }
    /* Открываем фотографии */
    openSlider(carName);
  });
});

/* ================================= */
/*          ОТКРЫТЬ СЛАЙДЕР          */
/* ================================= */

function openSlider(carName) {
  /* Очищаем старые фотографии */
  slidesContainer.innerHTML = '';
  currentSlide = 0;
  totalSlides = 0;
  /*
          Проверяем фотографии по очереди:
  
          photos/Renault Master/1.jpg
          photos/Renault Master/2.jpg
          photos/Renault Master/3.jpg
          ...
      */
  let number = 1;

  function loadPhoto() {
    const imagePath = `photos/${carName}/${number}.jpg`;
    const image = new Image();
    image.onload = function () {
      /*
                Фотография существует.
                Добавляем её в слайдер.
            */
      const slide = document.createElement('div');
      slide.className = 'slide';
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = carName;
      slide.appendChild(img);
      slidesContainer.appendChild(slide);
      totalSlides++;
      number++;
      /* Проверяем следующую */
      loadPhoto();
    };

    image.onerror = function () {
      /*
                Фотографии больше нет.
                Значит заканчиваем поиск.
            */
      if (totalSlides === 0) {
        alert(
          `Фотографии для "${carName}" не найдены`
        );
        return;
      }
      /* Открываем слайдер */
      photoSlider.classList.add('active');
      updateSlide();
    };
    image.src = imagePath;
  }
  loadPhoto();
}

/* ================================= */
/*        ПЕРЕЙТИ К СЛАЙДУ           */
/* ================================= */

function updateSlide() {
  const slides = document.querySelectorAll('.slide');
  if (!slides[currentSlide]) {
    return;
  }
  slides[currentSlide].scrollIntoView({
    behavior: 'smooth'
  });
}

/* ================================= */
/*          СЛЕДУЮЩЕЕ ФОТО           */
/* ================================= */

nextButton.addEventListener('click', function () {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide();
  }
});

/* ================================= */
/*          ПРЕДЫДУЩЕЕ ФОТО          */
/* ================================= */

prevButton.addEventListener('click', function () {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
});

/* ================================= */
/*             НАЗАД                 */
/* ================================= */

closeButton.addEventListener('click', function () {
  photoSlider.classList.remove('active');
});