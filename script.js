// Karuzela zdjęć
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');
const dots = document.querySelectorAll('.dot');
let autoPlayInterval;

// Funkcja pokazująca konkretny slajd
function showSlide(index) {
    // Upewnij się, że index jest w prawidłowym zakresie
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Ukryj wszystkie slajdy
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Usuń aktywność ze wszystkich kropek
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Pokaż aktualny slajd
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Następny slajd
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Poprzedni slajd
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Automatyczne przewijanie
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000); // Zmiana co 4 sekundy
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Obsługa przycisków strzałek
document.querySelector('.carousel-button.next').addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay(); // Zrestartuj auto-play po manualnej zmianie
});

document.querySelector('.carousel-button.prev').addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay();
});

// Obsługa kropek
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoPlay();
        startAutoPlay();
    });
});

// Obsługa gestów na mobile (swipe)
let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    }
}

// Zatrzymaj auto-play gdy użytkownik najedzie myszką (desktop)
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Uruchom auto-play przy załadowaniu strony
startAutoPlay();