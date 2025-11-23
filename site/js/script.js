'use strict';

// Página index.html

const btn = document.querySelector('.btn-select');
const cities = document.querySelector('.options-cities');
const options = document.querySelectorAll('.option');

btn.addEventListener('click', () => {
    cities.classList.toggle('active');
    btn.classList.toggle('active'); // gira a seta
});

options.forEach(opt => {
    opt.addEventListener("click", () => {
        const cidade = opt.dataset.city;

        window.location.href = `../pages/home.html?cidade=${cidade}`;
    });
});