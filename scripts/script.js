document.querySelectorAll(".folder-button").forEach(button => {

  button.addEventListener("click", () => {

    const folder = button.closest(".folder");

    folder.classList.toggle("open");

  });

});


/*
 * Вертикальные слайдеры N1...N4
 */

document.querySelectorAll(".slider-trigger").forEach(button => {

  button.addEventListener("click", () => {

    const parent = button.parentElement;

    const slider = parent.querySelector(":scope > .vertical-slider");

    if (!slider) return;


    /*
     * Закрываем соседние панели.
     *
     * Если хочешь, чтобы одновременно могли
     * быть открыты несколько N — этот блок можно удалить.
     */

    const currentList = button.closest("ul");

    currentList
      .querySelectorAll(":scope > li > .vertical-slider.open, :scope > li > .node > .vertical-slider.open")
      .forEach(openSlider => {

        if (openSlider !== slider) {
          openSlider.classList.remove("open");
        }

      });


    slider.classList.toggle("open");

  });

});