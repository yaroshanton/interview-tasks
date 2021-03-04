// Реализация подгрузки изображений из масива "данных" при загрузке страницы
// для возможности хранения данных в localStorage

const images = document.querySelector('.colection');

const arrayOfPictures = {
    1: '1.jpg',
    2: '2.jpg',
    3: '3.jpg',
    4: '4.jpg',
    5: '5.jpg',
    6: '6.jpg',
    7: '7.jpg',
    8: '8.jpg',
    9: '9.jpg',
    10: '10.jpg',
    11: '11.jpg',
    12: '12.jpg',
}

const pickPictures = () => Object.values(arrayOfPictures).map(picture => {
    if (getStorage() !== null && getStorage().includes(picture)) {
        return '';
    } else {
        const itemList = document.createElement('li');
        itemList.classList.add('item')
        itemList.innerHTML = `<img class="image" n="1" src="img/${picture}" alt="${picture}">
            <button class="button">Скрыть</button>`;
        return itemList;
    }
});

images.append(...pickPictures())


// Удаление Фото

images.addEventListener('click', onButtonClick);

function onButtonClick(event) {
    if (event.target.nodeName === 'BUTTON') {
        event.target.parentNode.remove();
        const indexOfImage = event.target.parentNode.querySelector('img').alt;

        let arrayStorage = getStorage();
        if (arrayStorage === null) arrayStorage = [];

        localStorage.setItem("entry", JSON.stringify(indexOfImage));
        arrayStorage.push(indexOfImage);
        localStorage.setItem("allEntries", JSON.stringify(arrayStorage));
    }
}

//внешняя функция для повторного вызова
function getStorage() {
    return JSON.parse(localStorage.getItem("allEntries"));
}

// Обработка даты и количества картинок

const title = document.querySelector('.title');
const arrayImages = [...images.children];

const DateNow = function () {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) day = '0' + day;

    let month = date.getMonth();
    if (month < 10) month = '0' + month;

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let year = date.getFullYear();

    return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes;
}

title.innerHTML = (`<h1>Картинок: ${arrayImages.length}. Дата: ${DateNow()}</h2>`);


// Модалка

const modalWindowRef = {
    lightbox: document.querySelector('.lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    content: document.querySelector('.lightbox__content'),
    image: document.querySelector('.lightbox__image'),
    button: document.querySelector('.lightbox__button'),
};
const closeModalRef = document.querySelector('button[data-action="close-lightbox"]');


images.addEventListener('click', onGalleryItemClick)

function onGalleryItemClick(event) {
    event.preventDefault()

    if (event.target.nodeName === 'IMG') {
        modalWindowRef.image.src = event.target.src;
        modalWindowRef.lightbox.classList.add('is-open')
    };
};

closeModalRef.addEventListener('click', onCloseModal);

function onCloseModal() {
    modalWindowRef.lightbox.classList.remove('is-open');
    modalWindowRef.image.src = '';
}

// Возвращение Картинок (кнопка)

const buttonBack = document.querySelector('.button-back');

buttonBack.addEventListener('click', onButtonBackClick)

function onButtonBackClick() {
    localStorage.clear()
    location.reload()
}

