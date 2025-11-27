'use strict';

window.onload = function () {
    // Os comandos abaixo servem para atualizar o ano de direito autoral do site automaticamente.
    let date = new Date;
    let year = date.getFullYear();

    window.document.getElementById('copyright-year').innerHTML = year;
}

const openBtn = window.document.querySelector(".fa-bars");
const closeBtn = window.document.querySelector(".fa-xmark");

const buttons = document.querySelectorAll('.menu-toggle');
const menuBar = document.querySelector('.menu-bar');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        menuBar.classList.toggle('active');
        btn.classList.toggle('active');

        const icon = btn.querySelector('.menu-icon');

        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});

// Parte dos planos:
// APENAS navegação manual - SEM autoplay
function initPlansCarousel() {
    if (window.innerWidth > 923) return;

    const plansCarousel = document.getElementById('plans-carousel');
    const cards = plansCarousel.querySelectorAll('.card-plan');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    if (!plansCarousel || cards.length === 0) return;

    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = index;
        const cardWidth = cards[0].offsetWidth + 20;
        const offset = (plansCarousel.offsetWidth - cardWidth) / 2;
        
        plansCarousel.scrollTo({
            left: (cardWidth * index) - offset,
            behavior: 'smooth'
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Clique nos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Atualiza dots ao scrollar
    let scrollTimeout;
    plansCarousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const cardWidth = cards[0].offsetWidth + 20;
            const offset = (plansCarousel.offsetWidth - cardWidth) / 2;
            const scrollLeft = plansCarousel.scrollLeft + offset;
            const newIndex = Math.round(scrollLeft / cardWidth);
            
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
                currentIndex = newIndex;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }, 150);
    });

    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;

    plansCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    plansCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        
        if (touchEndX < touchStartX - 50) {
            currentIndex = Math.min(currentIndex + 1, cards.length - 1);
            goToSlide(currentIndex);
        }
        if (touchEndX > touchStartX + 50) {
            currentIndex = Math.max(currentIndex - 1, 0);
            goToSlide(currentIndex);
        }
    });
}

initPlansCarousel();