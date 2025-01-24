const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
let slideWidth = slides[0].clientWidth;
let currentIndex = 1; 
let autoScrollInterval;


const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);


const allSlides = document.querySelectorAll('.slide');


track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;


function updateSliderPosition() {
    track.style.transition = 'transform 0.3s ease-in-out'; 
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}


function resetSliderPosition() {
    if (currentIndex === allSlides.length - 1) {
        track.style.transition = 'none';
        currentIndex = 1; 
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    } else if (currentIndex === 0) {
        track.style.transition = 'none';
        currentIndex = allSlides.length - 2; 
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
}


function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        currentIndex++;
        updateSliderPosition();
    }, 2000); 
}


function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}


window.addEventListener('resize', () => {
    slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});


track.addEventListener('transitionend', resetSliderPosition);


document.querySelector('.slider-button.left').addEventListener('click', () => {
    stopAutoScroll(); 
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : allSlides.length - 2; 
    updateSliderPosition();
    startAutoScroll(); 
});


document.querySelector('.slider-button.right').addEventListener('click', () => {
    stopAutoScroll(); 
    currentIndex = (currentIndex < allSlides.length - 1) ? currentIndex + 1 : 1; 
    updateSliderPosition();
    startAutoScroll(); 
});


startAutoScroll();
