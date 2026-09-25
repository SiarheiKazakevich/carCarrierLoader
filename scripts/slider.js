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

// ==================================================
// КАТАЛОГ ФОТОГРАФИЙ
// ==================================================
let photoCatalog = {};
let catalogReady = false;

//Загружаем photos.json один раз
const catalogPromise = fetch('./photos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить photos.json');
    }
    return response.json();
  })
  .then(data => {
    photoCatalog = data;
    catalogReady = true;
    console.log('Каталог фотографий загружен');
    return data;
  })
  .catch(error => {
    console.error('Ошибка загрузки каталога:', error);
    alert('Не удалось загрузить каталог фотографий');
    throw error;
  });

// ==================================================
// КЛИК ПО КНОПКЕ МАШИНЫ
// ==================================================
buttons.forEach(button => {
  button.addEventListener('click', function () {
    //Кнопка "добавить"
    if (button.classList.contains('add')) {
      return;
    }
    const carName = button.textContent.trim();
    currentCar = carName;
    openSlider(carName);
  });
});

// ==================================================
// ОТКРЫТЬ ОСНОВНОЙ СЛАЙДЕР
// ==================================================
async function openSlider(carName) {

  // Если JSON ещё не загрузился —
  // ждём его завершения
  if (!catalogReady) {
    try {
      await catalogPromise;
    } catch {
      return;
    }
  }




  const carData = photoCatalog[carName];
  if (!carData || !carData.main) {
    alert(`Фотографии для "${carName}" не найдены`);
    return;
  }
  currentCar = carName;
  currentSlide = 0;
  slidesContainer.innerHTML = '';
  totalSlides = carData.main.length;
  photoSlider.classList.add('active');

  //создаем все слайды без немедленной загрузки всех фото
  carData.main.forEach((fileName, index) => {
    createMainSlide(
      carName,
      fileName,
      index
    );
  });

  //Показываем первое фото
  updateSlide();

  /*//загружаем первое фото с высоким приоритетом
  const firstImage = slidesContainer.querySelector('img');

  if (firstImage) {
    firstImage.loading = 'eager'; // Возможна ошибка
    firstImage.fetchPriority = 'high';
  }*/

  //загружаем первое фото
  loadImage(0);
  //подготавливаем соседнее фото
  preloadNearbyImages(0);
}

// ==================================================
// СОЗДАТЬ ОСНОВНОЙ СЛАЙД
// ==================================================
function createMainSlide(
  carName,
  fileName,
  index
) {
  const slide = document.createElement('div');
  slide.className = 'slide main-photo-slide';
  const img = document.createElement('img');
  // ВАЖНО:
  // пока не загружаем фотографию
  img.dataset.src = `photos/${carName}/${fileName}`;
  img.alt = `${carName}, фото ${index + 1}`;
  img.loading = 'lazy';
  img.decoding = 'async';

  //Клик по основной фотографии
  img.addEventListener('click', function () {
    openInfoSlider(
      carName,
      index + 1
    );
  });
  slide.appendChild(img);

  //проверяем дополнительные фотографии через JSON
  const infoFiles = photoCatalog[carName].info?.[String(index + 1)];
  if (infoFiles && infoFiles.length > 0) {
    const label = document.createElement('div');
    label.className = 'additional-info-label';
    label.textContent = 'ⓘ Доп. инфо';
    slide.appendChild(label);
  }
  slidesContainer.appendChild(slide);
}

// ==================================================
// ЗАГРУЗИТЬ КОНКРЕТНОЕ ИЗОБРАЖЕНИЕ
// ==================================================
function loadImage(index, priority = 'auto') {
  const images = slidesContainer.querySelectorAll('img');
  if (index < 0 ||
    index >= images.length
  ) {
    return;
  }
  const img = images[index];
  //Если уже загружено - ничего не делаем
  if (img.src) {
    return;
  }
  img.src = img.dataset.src;
  img.fetchPriority = priority;
}

// ==================================================
// ПРЕДВАРИТЕЛЬНАЯ ЗАГРУЗКА СОСЕДНИХ ФОТО
// ==================================================
function preloadNearbyImages(index) {
  //предыдущее фото
  loadImage(index - 1);
  //следующее фото
  loadImage(index + 1);
}

// ==================================================
// ПЕРЕЙТИ К ОСНОВНОМУ СЛАЙДУ
// ==================================================
function updateSlide() {
  const slides = slidesContainer.querySelectorAll('.slide');
  if (!slides[currentSlide]) {
    return;
  }
  slides[currentSlide].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  loadImage(
    currentSlide,
    'high'
  );

  //Подготавливаем соседние изображения
  preloadNearbyImages(currentSlide);
}

// ==================================================
// ПРЕДВАРИТЕЛЬНАЯ ЗАГРУЗКА СОСЕДНИХ ФОТО
// ==================================================
/*function preloadNearbyImages(index) {
  const images = slidesContainer.querySelectorAll('img');

  const indexesToPreload = [
    index - 1,
    index + 1
  ];
  indexesToPreload.forEach(preloadIndex => {
    if (
      preloadIndex >= 0 && preloadIndex < images.length
    ) {
      const img = images[preloadIndex];
      img.loading = 'eager';

      //Браузер начнет загружать соседнее фото
      img.src = img.src;
    }
  });
}*/

// ==================================================
// СЛЕДУЮЩЕЕ ОСНОВНОЕ ФОТО
// ==================================================
nextButton.addEventListener('click', function () {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide();
  }
});

// ==================================================
// ПРЕДЫДУЩЕЕ ОСНОВНОЕ ФОТО
// ==================================================
prevButton.addEventListener('click', function () {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
});

// ==================================================
// ЗАКРЫТЬ ОСНОВНОЙ СЛАЙДЕР
// ==================================================
closeButton.addEventListener('click', function () {
  photoSlider.classList.remove('active');
});

// ==================================================
// ОТКРЫТЬ ДОПОЛНИТЕЛЬНЫЙ СЛАЙДЕР
// ==================================================
function openInfoSlider(carName, photoNumber) {
  const carData = photoCatalog[carName];
  const infoFiles = carData?.info?.[String(photoNumber)];
  if (!infoFiles || infoFiles.length === 0) {
    alert(
      `Для фотографии №${photoNumber} автомобиля "${carName}" дополнительных фото нет.`
    );
    return;
  }
  infoSlidesContainer.innerHTML = '';
  currentInfoSlide = 0;
  totalInfoSlides = infoFiles.length;

  //Создаем дополнительные слайды
  infoFiles.forEach((fileName, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    const img = document.createElement('img');
    img.dataset.src = `photos/${carName}/${photoNumber}/${fileName}`;
    img.alt = `${carName}, дополнительное фото ${index + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';

    slide.appendChild(img);
    infoSlidesContainer.appendChild(slide);

  });

  //Сохраняем позицию основного фото
  currentSlide = photoNumber - 1;
  photoSlider.classList.remove('active');
  infoSlider.classList.add('active');
  updateInfoSlide();
  //загружаем первое доп.фото
  loadInfoImage(0);
  //загружаем соседнее
  preloadInfoImages(0);
}

// ==================================================
// ЗАГРУЗИТЬ ДОПОЛНИТЕЛЬНОЕ ФОТО
// ==================================================
function loadInfoImage(index, priority = 'auto') {
  const images = infoSlidesContainer.querySelectorAll('img');
  if (index < 0 || index >= images.length) {
    return;
  }
  const img = images[index];
  if (img.src) {
    return;
  }
  img.src = img.dataset.src;
  img.fetchPriority = priority;
}

// ==================================================
// ЗАГРУЗИТЬ СОСЕДНИЕ ДОПОЛНИТЕЛЬНЫЕ ФОТО
// ==================================================
function preloadInfoImages(index) {
  loadInfoImage(index - 1);
  loadInfoImage(index + 1);
}
// ==================================================
// ПЕРЕЙТИ К ДОПОЛНИТЕЛЬНОМУ СЛАЙДУ
// ==================================================
function updateInfoSlide() {
  const slides = infoSlidesContainer.querySelectorAll('.slide');
  if (!slides[currentInfoSlide]) {
    return;
  }
  slides[currentInfoSlide].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  loadInfoImage(currentInfoSlide, 'high');
  preloadInfoImages(currentInfoSlide);
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
  infoSlider.classList.remove('active');
  photoSlider.classList.add('active');
  updateSlide();
});