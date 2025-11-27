'use strict';

window.onload = function () {
    // Comando para deixar o ícone X do menu de navegação 'escondido' por padrão no mobile.
    window.document.querySelector(".fa-xmark").style.display = 'none';

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