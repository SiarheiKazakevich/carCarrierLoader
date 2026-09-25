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