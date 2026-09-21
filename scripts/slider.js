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
/*          ОТКРЫТЬ СЛАЙДЕР     читает только фото jpeg формат     */
/* ================================= */

//function openSlider(carName) {
/* Очищаем старые фотографии 
slidesContainer.innerHTML = '';
currentSlide = 0;
totalSlides = 0;*/
/*
        Проверяем фотографии по очереди:
 
        photos/Renault Master/1.jpg
        photos/Renault Master/2.jpg
        photos/Renault Master/3.jpg
        ...
    
let number = 1;

function loadPhoto() {
  const imagePath = `photos/${carName}/${number}.jpg`;
  const image = new Image();
  image.onload = function () {

    const photoNumber = number;*/

/*
          Фотография существует.
          Добавляем её в слайдер.
     
const slide = document.createElement('div');
slide.className = 'slide main-photo-slide'; // добавили main-photo-slide для Infolabel
const img = document.createElement('img');
img.src = imagePath;
img.alt = carName;

// ==========================================
// ПРОВЕРЯЕМ, ЕСТЬ ЛИ ДОПОЛНИТЕЛЬНЫЕ ФОТО
// ========================================== от 105 до 117
const infoCheck = new Image();
infoCheck.onload = function () { 

  // Дополнительные фото существуют
  // добавляем надпись доп.инфо

  const infoLabel = document.createElement('div');
  infoLabel.className = 'additional-info-label';
  infoLabel.innerHTML = 'ⓘ Доп. инфо';
  slide.appendChild(infoLabel);
};
// Проверяем первое дополнительное фото
infoCheck.src = `photos/${carName}/${photoNumber}/1.jpg`;

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
number++;*/
/* Проверяем следующую 
loadPhoto();
};

image.onerror = function () {*/
/*
          Фотографии больше нет.
          Значит заканчиваем поиск.
      
if (totalSlides === 0) {
  alert(
    `Фотографии для "${carName}" не найдены`
  );
  return;
}*/
/* Открываем слайдер 
photoSlider.classList.add('active');
updateSlide();
};
image.src = imagePath;
}
loadPhoto();
}
*/
/* ================================= */
/*   начало       ОТКРЫТЬ СЛАЙДЕР     читает  фото jpeg и webp формат     */
/* ================================= */

function openSlider(carName) {
  currentCar = carName;
  currentSlide = 0;
  totalSlides = 0;

  slidesContainer.innerHTML = '';

  //Открываем слайдер СРАЗУ
  photoSlider.classList.add('active');

  //Начинаем загружать фотографии
  loadNextPhoto(carName, 1);
}
// ==============================
// ЗАГРУЗИТЬ СЛЕДУЮЩУЮ ФОТОГРАФИЮ
// ==============================
function loadNextPhoto(carName, number) {
  findImage(
    `photos/${carName}/${number}`,
    function (imagePath) {
      //фотография найдена
      createMainSlide(
        carName,
        number,
        imagePath
      );
      totalSlides++;

      //Показываем первое фото
      if (number === 1) {
        updateSlide();
      }
      //ищем следующую
      loadNextPhoto(
        carName,
        number + 1
      );
    },
    function () {
      //фотографии закончились
      if (totalSlides === 0) {
        photoSlider.classList.remove('active');
        alert(
          `Фотографии для "${carName}" не найдены`
        );
      }
    }
  );
}
// ======================
// ПОИСК WEBP / JPG / JPEG
// ======================

function findImage(basePath, success, error) {
  const extensions = [
    '.webp',
    '.jpg',
    '.jpeg'
  ];
  let index = 0;

  function tryNext() {
    if (index >= extensions.length) {
      error();
      return;
    }
    const image = new Image();
    image.onload = function () {
      success(
        basePath + extensions[index]
      );
    };
    image.onerror = function () {
      index++;
      tryNext();
    };
    image.src = basePath + extensions[index];
  }
  tryNext();
}
// =====================
// СОЗДАТЬ ОСНОВНОЙ СЛАЙД
// =====================
function createMainSlide(
  carName,
  photoNumber,
  imagePath
) {
  const slide = document.createElement('div');
  slide.className = 'slide main-photo-slide';
  const img = document.createElement('img');
  img.alt = carName;

  //Первое фото грузим приоритетно
  if (photoNumber === 1) {
    img.fetchPriority = 'high';
  } else {
    img.loading = 'lazy';
  }
  img.decoding = 'async';
  img.src = imagePath;
  // =======================
  // ПРОВЕРКА ДОП. ИНФОРМАЦИИ
  // =======================
  checkAdditionalInfo(
    carName,
    photoNumber,
    slide
  );
  // ===========
  // КЛИК ПО ФОТО
  // ===========
  img.addEventListener('click', function () {
    openInfoSlider(
      carName,
      photoNumber
    );
  });
  slide.appendChild(img);
  slidesContainer.appendChild(slide);
}
// ======================
// ПРОВЕРИТЬ ДОП. ИНФОРМАЦИЮ
// ======================
function checkAdditionalInfo(carName, photoNumber, slide) {
  findImage(
    `photos/${carName}/${photoNumber}/1`,
    function () {
      //дополнительное фото существует
      const label = document.createElement('div');
      label.className = 'additional-info-label';
      label.textContent = 'ⓘ Доп. инфо';
      slide.appendChild(label);
    },
    function () {
      //доп. информации нет
    }
  );
}





/* ================================= */
/*  конец        ОТКРЫТЬ СЛАЙДЕР     читает  фото jpeg и webp формат     */
/* ================================= */

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