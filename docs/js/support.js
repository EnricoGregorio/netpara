'use strict';

// Pegar a cidade de referência das informações:
// Captura a cidade da URL
function getCityFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('cidade');
}

// Configurações por cidade
const cityConfig = {
    'ipixuna': {
        title: 'Suporte Net Pará | Ipixuna do Pará',
        location: 'Tv. Padre José de Anchieta, Ipixuna do Pará - PA, 68637-000'
    },
    'paragominas': {
        title: 'Suporte Net Pará | Paragominas',
        location: 'Rua Santa Terezinha 245, Modulo I, Célio Miranda, Paragominas – PA, CEP 68625-080'
    },
    'forquilha': {
        title: 'Suporte Net Pará | Vila Forquilha',
        location: 'Rua Nossa Senhora da Conceição, 83, Forquilha - PA, 68680-000'
    },
    'palmares': {
        title: 'Suporte Net Pará | Vila Palmares',
        location: 'R. ANGELIM, 42 - Distrito Vila Palmares, Tailândia - PA, 68699-000'
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

// Animação do menu
const buttons = document.querySelectorAll('.menu-toggle');
const menuBar = document.querySelector('.menu-bar');
const links = document.querySelectorAll('.link');

function closeMenu() {
    menuBar.classList.remove('active');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        const icon = btn.querySelector('.menu-icon');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
}

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

buttons.forEach(btn => {
    btn.addEventListener('click', toggleMenu);
});

links.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
    const isClickInsideMenu = menuBar.contains(e.target);
    const isClickOnButton = Array.from(buttons).some(btn => btn.contains(e.target));
    if (!isClickInsideMenu && !isClickOnButton && menuBar.classList.contains('active')) {
        closeMenu();
    }
});

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
            // ========== FECHA ==========
            // 1. Anima conteúdo primeiro
            answer.style.opacity = '0';
            answer.style.transform = 'translateY(-10px)';
            answer.style.padding = '0';
            
            // 2. Depois colapsa altura
            setTimeout(() => {
                content.style.maxHeight = '0';
            }, 50);
            
            // 3. Remove atributo open após animação
            setTimeout(() => {
                item.removeAttribute('open');
            }, 550); // ← IMPORTANTE: espera a transição terminar
            
        } else {
            // ========== ABRE ==========
            // 1. Adiciona atributo open
            item.setAttribute('open', '');
            
            // 2. Calcula altura real
            const realHeight = answer.scrollHeight + 32; // padding
            
            // 3. Expande altura (usa requestAnimationFrame para garantir que CSS foi aplicado)
            requestAnimationFrame(() => {
                content.style.maxHeight = realHeight + 'px';
            });
            
            // 4. Anima conteúdo com delay
            setTimeout(() => {
                answer.style.opacity = '1';
                answer.style.transform = 'translateY(0)';
            }, 100);
        }
    });
});

// Validação do telefone:
function phoneFormatter(value) {
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    value = value.slice(0, 11);
    
    // Aplica a formatação
    if (value.length <= 10) {
        // Formato: (00) 0000-0000
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        // Formato: (00) 00000-0000
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    
    return value;
}

// Seleciona o input de telefone
const inputPhone = document.getElementById('fphone');

if (inputPhone) {
    // Formata enquanto digita
    inputPhone.addEventListener('input', (e) => {
        e.target.value = phoneFormatter(e.target.value);
    });
    
    // Formata ao sair do campo (blur)
    inputPhone.addEventListener('blur', (e) => {
        e.target.value = phoneFormatter(e.target.value);
    });
    
    // Formata ao pressionar Enter ou Tab
    inputPhone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.target.value = phoneFormatter(e.target.value);
        }
    });
}

// Atualiza o ano
window.onload = function () {
    // Para aplicar as alterações com base na cidade.
    applyCityConfig();

    let date = new Date();
    let year = date.getFullYear();
    const copyrightElement = document.getElementById('copyright-year');
    if (copyrightElement) {
        copyrightElement.innerHTML = year;
    }
}

// Bloco do envio do e-mail:
const form = document.querySelector(".message-form");
const statusMsg = document.getElementById("status-msg");
form.addEventListener("submit", function(e) {
    e.preventDefault();

    statusMsg.textContent = "Enviando...";
    
    emailjs.sendForm("service_9ctd3ah", "template_pelyhu6", this)
        .then(() => {
            statusMsg.textContent = "Mensagem enviada com sucesso!";
            form.reset();
        })
        .catch((error) => {
            console.error("Erro:", error);
            statusMsg.textContent = "Erro ao enviar. Tente novamente.";
        });
});