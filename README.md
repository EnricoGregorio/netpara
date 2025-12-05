# 🌐 Net Pará – Website Oficial

Repositório do site institucional da **Net Pará**, provedor regional de internet fibra óptica, desenvolvido para apresentar planos, benefícios, suporte e canais de atendimento aos clientes.

Este projeto foi construído com foco em **desempenho, acessibilidade, responsividade e clareza visual**, oferecendo uma experiência moderna tanto para desktop quanto mobile.

---

## 🚀 Tecnologias utilizadas

O site foi desenvolvido utilizando apenas tecnologias nativas do front-end:

* **HTML5** – Estrutura, semântica e SEO
* **CSS3** – Estilização, layouts responsivos, animações e efeitos
* **JavaScript (Vanilla JS)** – Interações dinâmicas (menu mobile, dropdowns, FAQ, formulários etc.)
* **EmailJS** – Envio de mensagens via formulário sem backend
* **Font Awesome** – Ícones utilizados em menus, botões e FAQ

---

## 📂 Estrutura do projeto

```
/
├── docs/               # Pasta publicada no GitHub Pages
│   ├── index.html      # Página inicial
│   ├── home.html       # Página principal do site
│   ├── support.html    # Página de suporte e contato
│   ├── styles/         # Arquivos CSS
│   ├── js/             # Scripts JS
│   ├── images/         # Recursos gráficos
│   └── favicon/        # Ícones do site
├── LICENSE
└── README.md
```

---

## 📱 Responsividade

O layout foi planejado para ser **totalmente responsivo**, desde telas grandes até smartphones, com:

* Menu mobile com animação e transições suaves
* Grid responsivo para seções como *landing*, *benefits*, *about-us* e *FAQ*
* Ajustes automáticos de tipografia, espaçamento e imagens

---

## 📝 Funcionalidades principais

### ✔️ **Menu responsivo com animação**

* Ícone de hambúrguer que rotaciona para "X"
* Dropdown suave utilizando `max-height`, `opacity` e `transform`

### ✔️ **Dropdown dinâmico de cidades**

* Seleção de cidade com redirecionamento baseado no atributo `data-city`
* JS simples e sem dependências externas

### ✔️ **FAQ animado**

* Componente `<details>` estilizado com animação de abertura
* Ícone rotaciona ao expandir cada pergunta

### ✔️ **Formulário com EmailJS**

* Envio direto para **[e-mail de sua preferência]**
* Campos: nome, e-mail, telefone e mensagem
* Código seguro utilizando **Service ID**, **Template ID** e **Public Key**

---

## 🌎 Publicação com GitHub Pages

O repositório está configurado com o padrão:

* **Branch:** `main`
* **Pasta publicada:** `docs/`

Seu site fica acessível em:

```
https://SEU_USUARIO.github.io/SEU_REPOSITORIO/
```

---

## 📦 Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

2. Acesse o diretório:

```bash
cd SEU_REPOSITORIO/docs
```

3. Abra o `index.html` no navegador.

*(Não é necessário servidor local.)*

---

## 🛠️ Melhorias futuras

Algumas melhorias sugeridas que poderão ser adicionadas:

* Dark Mode
* Globalização (i18n)
* Otimização automática de imagens
* Pré-processadores (Sass) ou frameworks (Tailwind) se desejado

---

## 📄 Licença

Distribuído sob a licença **MIT**.
Você pode usar, modificar e distribuir livremente.

---

## 💬 Contato

Para dúvidas ou sugestões:

📧 **[enricogregorio5@gmail.com](mailto:enricogregorio5@gmail.com)**

---

Se quiser, posso incluir badges, screenshots do site, GIF da versão mobile, ou mesmo transformar o README em algo mais visual e estilizado. 😊
