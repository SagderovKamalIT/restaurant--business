const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.slider-button.left');
const nextButton = document.querySelector('.slider-button.right');
let slideWidth = slides[0].clientWidth; 
let currentIndex = 0;

function updateSliderPosition() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function updateSlideWidth() {
    slideWidth = slides[0].clientWidth; 
    updateSliderPosition();
}


prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 2; 
    updateSliderPosition();
});


nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 2) ? currentIndex + 1 : 0; 
    updateSliderPosition();
});

window.addEventListener('resize', updateSlideWidth);