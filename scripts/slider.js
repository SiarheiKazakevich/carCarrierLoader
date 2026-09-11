const buttons = document.querySelectorAll('.slider-item');

// ==================================================
// ОСНОВНОЙ СЛАЙДЕР
// ==================================================

const photoSlider = document.getElementById('photoSlider');
const slidesContainer = document.getElementById('slides');
const closeButton = document.getElementById('closeSlider');

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentSlide = 0;
let totalSlides = 0;

//Какая машина сейчас открыта
let currentCar = '';

// ==================================================
// ДОПОЛНИТЕЛЬНЫЙ СЛАЙДЕР
// ==================================================

const infoSlider = document.getElementById('infoSlider');
const infoSlidesContainer = document.getElementById('infoSlides');
const closeInfoButton = document.getElementById('closeInfoSlider');

const infoPrevButton = document.getElementById('infoPrev');
const infoNextButton = document.getElementById('infoNext');

let currentInfoSlide = 0;
let totalInfoSlides = 0;






/* ================================= */
/*       КЛИК ПО КНОПКЕ МАШИНЫ       */
/* ================================= */
buttons.forEach(button => {
  button.addEventListener('click', function () {

    // кнопка "добавить"
    if (button.classList.contains('add')) {
      return;
    }

    /* Получаем название машины */
    const carName = button.textContent.trim();
    /* Кнопка "добавить" нам не нужна 
    if (button.classList.contains('add')) {
      return;
    }*/

    //Запоминаем машину
    currentCar = carName;


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

      const photoNumber = number;

      /*
                Фотография существует.
                Добавляем её в слайдер.
            */
      const slide = document.createElement('div');
      slide.className = 'slide';
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = carName;

      // ВАЖНО:
      // Клик по основной фотографии
      // открывает дополнительный слайдер

      img.addEventListener('click', function () {
        openInfoSlider(
          carName,
          photoNumber
        );
      });



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
  const slides = document.querySelectorAll('#slides .slide');
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

// ==================================================
// ОТКРЫТЬ ДОПОЛНИТЕЛЬНЫЙ СЛАЙДЕР
// ==================================================

function openInfoSlider(carName, photoNumber) {
  // Очищаем старые дополнительные фото
  infoSlidesContainer.innerHTML = '';

  currentInfoSlide = 0;
  totalInfoSlides = 0;

  /*
        Например:

        carName = Renault Master
        photoNumber = 1

        Получаем:

        photos/Renault Master/2/
    */

  const folderNumber = photoNumber;

  let number = 1;

  function loadInfoPhoto() {
    const imagePath = `photos/${carName}/${folderNumber}/${number}.jpg`;
    const image = new Image();
    image.onload = function () {
      // Создаём слайд
      const slide = document.createElement('div');
      slide.className = 'slide';

      const img = document.createElement('img');
      img.src = imagePath;

      img.alt = `${carName} дополнительная информация`;
      slide.appendChild(img);
      infoSlidesContainer.appendChild(slide);
      totalInfoSlides++;
      number++;

      //Ищем следующую
      loadInfoPhoto();
    };

    image.onerror = function () {
      // Дополнительных фотографий нет
      if (totalInfoSlides === 0) {
        alert(
          `Для фотографии №${photoNumber} автомобиля "${carName}" дополнительных фото нет.`
        );
        return;
      }
      //запоминаем основной слайд
      currentSlide = photoNumber - 1;

      // Сначала скрываем основной слайдер
      photoSlider.classList.remove('active');

      // Открываем дополнительный
      infoSlider.classList.add('active');

      updateInfoSlide();
    };
    image.src = imagePath;
  }
  loadInfoPhoto();
}

// ==================================================
// ПЕРЕЙТИ К ДОПОЛНИТЕЛЬНОМУ СЛАЙДУ
// ==================================================

function updateInfoSlide() {
  const slides = document.querySelectorAll('#infoSlides .slide');

  if (!slides[currentInfoSlide]) {
    return;
  }
  slides[currentInfoSlide].scrollIntoView({
    behavior: 'smooth'
  });
}

// ==================================================
// СЛЕДУЮЩЕЕ ДОПОЛНИТЕЛЬНОЕ ФОТО
// ==================================================

infoNextButton.addEventListener('click', function () {
  if (currentInfoSlide < totalInfoSlides - 1) {
    currentInfoSlide++;
    updateInfoSlide();

  }
});

// ==================================================
// ПРЕДЫДУЩЕЕ ДОПОЛНИТЕЛЬНОЕ ФОТО
// ==================================================

infoPrevButton.addEventListener('click', function () {
  if (currentInfoSlide > 0) {
    currentInfoSlide--;
    updateInfoSlide();
  }
});

// ==================================================
// НАЗАД К ОСНОВНЫМ ФОТО
// ==================================================

closeInfoButton.addEventListener('click', function () {
  // Закрываем дополнительные фото
  infoSlider.classList.remove('active');
  // Открываем основные
  photoSlider.classList.add('active');
  updateSlide();
});