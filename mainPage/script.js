

const contUs = document.getElementById('buttonCallUs');
const modal = document.querySelector('.modal');
const close = document.getElementById('close-modal');
const mContainer = document.querySelector('.modal-container');
const contUs2 = document.querySelector('.foot-c-us');

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = function () { };
}

function toOpenModal() {
  modal.classList.add('opened-modal');
  disableScroll();
  window.removeEventListener('scroll', hScroll);
}


contUs.addEventListener('click', () => {
  toOpenModal();
})
contUs2.addEventListener('click', () => {
  toOpenModal();
})
close.addEventListener('click', () => {
  if (modal.classList.contains('opened-modal')) {
    modal.classList.remove('opened-modal');
    enableScroll();
    window.addEventListener('scroll', hScroll);
  }
})


document.onclick = (event) => {
  if (event.target == mContainer.parentElement) {
    modal.classList.remove('opened-modal');
    enableScroll();
    window.addEventListener('scroll', hScroll);
  };
  if (event.target == modalLocations) {
    modalLocations.classList.remove('opened-locations');
    enableScroll();
  };
}


const copy = document.querySelector('.copy');

copy.addEventListener('click', () => {
  const content = copy.previousElementSibling.innerHTML;
  navigator.clipboard.writeText(content);
})



const locationLink = document.getElementById('locationLink');
const modalLocations = document.querySelector('.modal-locations');
const closeLocButt = document.querySelector('.close-loc-modal');


locationLink.addEventListener('click', () => {
  modalLocations.classList.add('opened-locations');
  disableScroll();
})

closeLocButt.addEventListener('click', () => {
  modalLocations.classList.remove('opened-locations');
  enableScroll();
})

const locForm = document.getElementById('locForm');
locForm.addEventListener('submit', (event) => {
  event.preventDefault();
})


ymaps.ready(init);
function init() {
  let myMap = new ymaps.Map("map", {
    center: [37.586183, -79.879361],
    zoom: 5
  });

  myMap.geoObjects.add(new ymaps.Placemark([37.413448, -79.147928], {
    balloonContent: 'Адрес 1'
  }, {
    preset: 'islands#icon',
    iconColor: '#0095b6'
  }));

  myMap.geoObjects.add(new ymaps.Placemark([37.796698, -81.250390], {
    balloonContent: 'Адрес 2'
  }, {
    preset: 'islands#icon',
    iconColor: '#0095b6'
  }));
}





const slider = document.querySelector('.slider');
const container = slider.querySelector('.slider__container');
const items = slider.querySelectorAll('.slider__item');
const prevBtn = slider.querySelector('.slider__arrow--prev');
const nextBtn = slider.querySelector('.slider__arrow--next');

let currentIndex = 0;
let lastIndex = items.length - 2;
let isAnimating = false;

function goTo(index) {
  if (index < 0) {
    index = lastIndex;
  } else if (index > lastIndex) {
    index = 0;
  }
  if (window.outerWidth <= 600) {
    container.style.transform = `translateX(-${index * 100}%)`;
  } else
    container.style.transform = `translateX(-${index * 50}%)`;
  currentIndex = index;
}
let counter = 0;

function goToPrev() {
  if (!isAnimating) {
    isAnimating = true;
    goTo(currentIndex - 1);
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
}

function goToNext() {

  if (!isAnimating) {
    isAnimating = true;
    if (window.outerWidth <= 600) {
      if (!counter) goTo(currentIndex + 2);
      else goTo(currentIndex + 1);
    } else goTo(currentIndex + 1);

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  counter++;
}

prevBtn.addEventListener('click', goToPrev);
nextBtn.addEventListener('click', goToNext);



const burg = document.querySelector('.burg');
const hContainer = document.getElementById('headerContainer');
const hLinks = document.getElementById('headerLinks');
const contacts = document.getElementById('buttonCallUs');
const cart = document.getElementById('cart');
const bClose = document.querySelector('.close-burg');
const header = document.querySelector('header');
let heaHeight;
burg.addEventListener('click', () => {
  hContainer.style.height = '300px';
  hLinks.style.display = 'flex';
  hLinks.style.flexBasis = 'column';
  hLinks.style.alignItems = 'center';
  burg.style.display = 'none';
  cart.style.display = 'block';
  bClose.style.display = 'block';
  contacts.style.display = 'block';
  heaHeight = hContainer.clientHeight;
  mode.parentElement.style.display = 'block';
})

bClose.addEventListener('click', () => {
  hContainer.style.height = heaHeight + 'px';
  hLinks.style.display = 'none';
  burg.style.display = 'block';
  bClose.style.display = 'none';
  contacts.style.display = 'none';
  cart.style.display = 'none';
  mode.parentElement.style.display = 'none';
})


const mPreview = document.getElementById('mainPreview');
const logo = document.getElementById('logo');
const mode = document.getElementById('modeImg');
let hBool = false;

const hScroll = () => {
  if (window.innerWidth > 750) {
    header.style.background = ' linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.39557072829131656) 62%, rgba(0,0,0,0.009016106442576999) 90%)';
    mPreview.style.margin = '0';
    hLinks.querySelectorAll('a,p').forEach((Element) => {
      Element.style.color = 'white';
      Element.classList.add('after');
    });
    logo.src = 'mainPage/styles/logoWhite.png';

    if (modeType)
      mode.src = 'mainPage/styles/nModeLight.png';
    else mode.src = 'mainPage/styles/dModeLight.png';

    hBool = true;




    if (mPreview.getBoundingClientRect().top >= -40) {
      if (modeType) {
        header.style.background = 'white';
        hLinks.querySelectorAll('a,p').forEach((Element) => {
          Element.style.color = 'black';
          Element.classList.remove('after');
        });
        logo.src = 'mainPage/styles/logo.png';

      } else header.style.background = 'black';
      mPreview.style.marginTop = hContainer.getBoundingClientRect().height + 'px';



      if (!modeType)
        mode.src = 'mainPage/styles/dModeLight.png';
      else mode.src = 'mainPage/styles/nMode.png';
      hBool = false;
    }
  }
}

window.addEventListener('scroll', hScroll);

let modeType = true;
const buttonMode = document.getElementById('mode');
const orderNow = document.getElementById('orderNow');
const benefitsP = document.querySelectorAll('.benefits p');
const news = document.querySelector('.news');
const sliderElems = document.querySelectorAll('.slider__item div');
const sliderArrows = document.querySelectorAll('.slider__arrow');
const sliderP = document.querySelectorAll('.slider__item div p');
const addToCart = document.querySelectorAll('.addToCart');
const mainMenuButtons = document.querySelectorAll('.main-menu div button');
const footLogo = document.querySelector('.foot-about img');
const hName = document.querySelector('.head-name');



function toSwitchToBlack() {
  document.body.style.background = 'black';
  if (!hBool) header.style.background = 'black';
  logo.src = 'mainPage/styles/logoWhite.png';
  contUs.style.color = 'black';
  hLinks.querySelectorAll('a,p').forEach((Element) => {
    Element.style.color = 'white';
    Element.classList.add('after');
  });
  cart.style.color = 'black';
  mode.src = 'mainPage/styles/dModeLight.png';
  mPreview.style.background = 'url("mainPage/styles/hummus1Dark.png")';
  mPreview.style.backgroundSize = 'cover';
  mPreview.style.backgroundPosition = 'center';
  orderNow.style.color = 'black';
  benefitsP.forEach(p => p.style.color = 'white');
  news.style.color = 'white';
  sliderElems.forEach(div => div.style.boxShadow = '1px 0px 20px 0px #FCAF25');
  sliderArrows.forEach(arrow => arrow.style.color = 'white');
  sliderP.forEach(p => p.style.color = 'white');
  addToCart.forEach(button => button.style.color = 'black');
  mainMenuButtons.forEach(button => button.style.color = 'white');
  footLogo.src = 'mainPage/styles/footLogoWhite.png';
  modal.children[0].style.background = '#4c402c';
  modalLocations.children[0].style.background = '#4c402c';
  hName.style.color = 'white';

  modeType = false;
  localStorage.modeType = 'black';
};

function toSwitchToWhite() {
  document.body.style.background = 'white';

  if (!hBool) {
    header.style.background = 'white';
    hLinks.querySelectorAll('a,p').forEach((Element) => {
      Element.style.color = 'black';
      Element.classList.remove('after');
    });
    logo.src = 'mainPage/styles/logo.png';
    mode.src = 'mainPage/styles/nMode.png';

  } else mode.src = 'mainPage/styles/nModeLight.png';


  contUs.style.color = 'white';

  cart.style.color = 'white';
  mPreview.style.background = 'url("mainPage/styles/hummus1.png")';
  mPreview.style.backgroundSize = 'cover';
  mPreview.style.backgroundPosition = 'center';
  orderNow.style.color = 'white';
  benefitsP.forEach(p => p.style.color = 'black');
  news.style.color = 'black';
  sliderElems.forEach(div => div.style.boxShadow = '0px 0px 20px 0px rgba(0, 0, 0, 0.15)');
  sliderArrows.forEach(arrow => arrow.style.color = 'black');
  sliderP.forEach(p => p.style.color = 'black');
  addToCart.forEach(button => button.style.color = 'white');
  mainMenuButtons.forEach(button => button.style.color = 'black');
  footLogo.src = 'mainPage/styles/logo1.png';
  modalLocations.children[0].style.background = '#856b3d';
  modal.children[0].style.background = '#856b3d';
  modeType = true;
  hName.style.color = 'black';

  localStorage.modeType = 'white';

}

function toChangeMode() {
  if (modeType) toSwitchToBlack()
  else toSwitchToWhite();
}

buttonMode.addEventListener('click', toChangeMode)

window.addEventListener('load', () => {
  if (localStorage.modeType == 'black') toSwitchToBlack();
});