'use strict';

// Captura a cidade da URL
function getCityFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('cidade');
}

// Configurações por cidade
const cityConfig = {
    'ipixuna': {
        title: 'Net Pará | Ipixuna do Pará',
        location: 'Tv. Padre José de Anchieta, Ipixuna do Pará - PA, 68637-000'
    },
    'paragominas': {
        title: 'Net Pará | Paragominas',
        location: 'Rua Santa Terezinha 245, Modulo I, Célio Miranda, Paragominas – PA, CEP 68625-080'
    },
    'forquilha': {
        title: 'Net Pará | Vila Forquilha',
        location: 'Rua Nossa Senhora da Conceição, 83, Forquilha - PA, 68680-000'
    },
    'palmares': {
        title: 'Net Pará | Vila Palmares',
        location: 'R. Angelim, 42 - Distrito Vila Palmares, Tailândia - PA, 68699-000'
    }
};

function applyCityConfig() {
    const city = getCityFromURL();

    // Se não tiver cidade na URL, usa padrão
    if (!city || !cityConfig[city]) {
        return; // mantém os textos originais do HTML
    }

    if (city && cityConfig[city]) {
        const config = cityConfig[city];

        // Altera o título da página
        document.title = config.title;

        const local = document.querySelectorAll('.local');
        local.forEach(elemento => {
            elemento.textContent = config.location;
        });
    }
}

window.onload = function () {
    // Para aplicar as alterações com base na cidade.
    applyCityConfig();

    // Os comandos abaixo servem para atualizar o ano de direito autoral do site automaticamente.
    let date = new Date;
    let year = date.getFullYear();

    window.document.getElementById('copyright-year').innerHTML = year;
}

// Bloco para passar a cidade selecionada para a próxima página.
function passCityToLinks() {
    const cidade = getCityFromURL();
    
    if (cidade) {
        // Seleciona TODOS os links de Suporte
        const linksSupport = document.querySelectorAll('a[href*="support.html"]');
        
        linksSupport.forEach(link => {
            const url = new URL(link.href);
            url.searchParams.set('cidade', cidade);
            link.href = url.toString();
        });
        
        // Também para links do footer
        const linksClient = document.querySelectorAll('a[href*="client"]');
        linksClient.forEach(link => {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set('cidade', cidade);
            link.href = url.toString();
        });
    }
}

// Executa ao carregar
window.addEventListener('DOMContentLoaded', passCityToLinks);

// Animação do menu

const buttons = document.querySelectorAll('.menu-toggle');
const menuBar = document.querySelector('.menu-bar');
const links = document.querySelectorAll('.link');

// Função para fechar o menu
function closeMenu() {
    menuBar.classList.remove('active');

    buttons.forEach(btn => {
        btn.classList.remove('active');

        const icon = btn.querySelector('.menu-icon');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
}

// Função para alternar o menu
function toggleMenu() {
    menuBar.classList.toggle('active');

    buttons.forEach(btn => {
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
}

// Clique no botão do menu
buttons.forEach(btn => {
    btn.addEventListener('click', toggleMenu);
});

// Clique nos links - fecha o menu
links.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (e) => {
    const isClickInsideMenu = menuBar.contains(e.target);
    const isClickOnButton = Array.from(buttons).some(btn => btn.contains(e.target));

    if (!isClickInsideMenu && !isClickOnButton && menuBar.classList.contains('active')) {
        closeMenu();
    }
});

// Parte dos planos:
// APENAS navegação manual
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

// ANIMAÇÃO FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    const content = item.querySelector('div');
    const answer = item.querySelector('.faq-answer');
    
    // Define transições inline para garantir que funcionem
    content.style.transition = 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    answer.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Estado inicial fechado
    if (!item.hasAttribute('open')) {
        content.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.transform = 'translateY(-10px)';
        answer.style.padding = '0';
    }
    
    summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isOpen = item.hasAttribute('open');
        
        if (isOpen) {
            // Anima conteúdo primeiro
            answer.style.opacity = '0';
            answer.style.transform = 'translateY(-10px)';
            answer.style.padding = '0';
            
            // Depois colapsa altura
            setTimeout(() => {
                content.style.maxHeight = '0';
            }, 50);
            
            // Remove atributo open após animação
            setTimeout(() => {
                item.removeAttribute('open');
            }, 550); // espera a transição terminar
            
        } else {
            // Adiciona atributo open
            item.setAttribute('open', '');
            
            // Calcula altura real
            const realHeight = answer.scrollHeight + 32; // padding
            
            // Expande altura (usa requestAnimationFrame para garantir que CSS foi aplicado)
            requestAnimationFrame(() => {
                content.style.maxHeight = realHeight + 'px';
            });
            
            // Anima conteúdo com delay
            setTimeout(() => {
                answer.style.opacity = '1';
                answer.style.transform = 'translateY(0)';
            }, 100);
        }
    });
});