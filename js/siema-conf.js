const foodGallery = new Siema({
  selector: '.food-gallery__images',
  duration: 200,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  threshold: 20,
  loop: false,
});
document.querySelector('.food-gallery__btn--prev').addEventListener('click', () =>   foodGallery.prev());
document.querySelector('.food-gallery__btn--next').addEventListener('click', () =>   foodGallery.next());
