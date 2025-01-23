const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
let slideWidth = slides[0].clientWidth;
let currentIndex = 1; // Начинаем с первого реального слайда
let autoScrollInterval;

// Клонируем первый и последний слайды для бесшовной прокрутки
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Обновляем слайды после клонирования
const allSlides = document.querySelectorAll('.slide');

// Устанавливаем начальную позицию
track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

// Обновление позиции слайдера
function updateSliderPosition() {
    track.style.transition = 'transform 0.3s ease-in-out'; // Скорость анимации
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

// Сброс перехода для бесшовного эффекта
function resetSliderPosition() {
    if (currentIndex === allSlides.length - 1) {
        track.style.transition = 'none';
        currentIndex = 1; // Переход на первый реальный слайд
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    } else if (currentIndex === 0) {
        track.style.transition = 'none';
        currentIndex = allSlides.length - 2; // Переход на последний реальный слайд
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
}

// Автоматическая прокрутка
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        currentIndex++;
        updateSliderPosition();
    }, 2000); // Скорость автопрокрутки (2 секунды)
}

// Остановка автопрокрутки
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Обновление ширины слайдов при изменении размера окна
window.addEventListener('resize', () => {
    slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});

// Обработчик окончания перехода
track.addEventListener('transitionend', resetSliderPosition);

// Пролистывание назад
document.querySelector('.slider-button.left').addEventListener('click', () => {
    stopAutoScroll(); // Останавливаем автопрокрутку
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : allSlides.length - 2; 
    updateSliderPosition();
    startAutoScroll(); // Перезапускаем автопрокрутку
});

// Пролистывание вперед
document.querySelector('.slider-button.right').addEventListener('click', () => {
    stopAutoScroll(); // Останавливаем автопрокрутку
    currentIndex = (currentIndex < allSlides.length - 1) ? currentIndex + 1 : 1; 
    updateSliderPosition();
    startAutoScroll(); // Перезапускаем автопрокрутку
});

// Запуск автопрокрутки при загрузке
startAutoScroll();
