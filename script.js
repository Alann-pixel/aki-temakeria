/* ==================================================
   AKI TEMAKERIA
   SCRIPT.JS
================================================== */


/* ================= MENU MOBILE ================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});


/* FECHAR MENU AO CLICAR EM UM LINK */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* ================= HEADER ================= */

const header = document.getElementById("header");

let lastScroll = 0;

window.addEventListener("scroll", () => {

const currentScroll = window.scrollY;

/* Efeito visual do header */
if (currentScroll > 50) {
    header.classList.add("scrolled");
} else {
    header.classList.remove("scrolled");
}

/* Esconde o header ao descer */
if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hide");
} 
/* Mostra novamente ao subir */
else {
    header.classList.remove("hide");
}

lastScroll = currentScroll;

});



/* ================= ANIMAÇÕES ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});

/* ================= CATEGORIAS DO CARDÁPIO ================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");

const menuCategories =
    document.querySelectorAll(".menu-category");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.category;


        /* Remove active dos botões */

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        /* Ativa o botão escolhido */

        button.classList.add("active");


        /* Esconde todas as categorias */

        menuCategories.forEach(category => {
            category.classList.remove("active");
        });


        /* Mostra a categoria escolhida */

        const selectedMenu =
            document.getElementById(selectedCategory);


        if (selectedMenu) {
            selectedMenu.classList.add("active");
        }

    });

});

/* ================= ANO AUTOMÁTICO ================= */

const yearElements = document.querySelectorAll(".footer-bottom p");

const currentYear = new Date().getFullYear();

if (yearElements.length > 0) {

    yearElements[0].textContent =
        `© ${currentYear} Aki Temakeria. Todos os direitos reservados.`;

}


/* ================= WHATSAPP ================= */

/*
    TROQUE PELO NÚMERO REAL DO RESTAURANTE.

    Formato:
    5584999999999

    Não coloque:
    +
    espaços
    parênteses
    traços
*/

const whatsappNumber = "5500000000000";

const whatsappMessage =
    "Olá! Vim pelo site da Aki Temakeria e gostaria de fazer um pedido.";


const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


const whatsappButton =
    document.querySelector(".whatsapp");


if (whatsappButton) {

    whatsappButton.href = whatsappLink;

}


/* ================= ESC PARA FECHAR MENU ================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        nav.classList.remove("active");

    }


});

/* ================= CARROSSEL DA GALERIA ================= */

const galleryGrid = document.querySelector(".gallery-grid");
const galleryLeft = document.querySelector(".gallery-arrow-left");
const galleryRight = document.querySelector(".gallery-arrow-right");

if (galleryGrid && galleryLeft && galleryRight) {

    galleryRight.addEventListener("click", () => {

        galleryGrid.scrollBy({
            left: galleryGrid.clientWidth * 0.9,
            behavior: "smooth"
        });

    });

    galleryLeft.addEventListener("click", () => {

        galleryGrid.scrollBy({
            left: -galleryGrid.clientWidth * 0.9,
            behavior: "smooth"
        });

    });
/* ================= LIGHTBOX DA GALERIA ================= */

const galleryLightbox = document.getElementById("gallery-lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

if (
    galleryLightbox &&
    lightboxContent &&
    lightboxClose &&
    lightboxPrev &&
    lightboxNext
) {

    /* PEGA TODAS AS FOTOS E VÍDEOS DA GALERIA */

    const galleryMedia = document.querySelectorAll(
        ".gallery-item img, .gallery-item video"
    );

    let currentLightboxIndex = 0;


    /* ================= MOSTRAR MÍDIA ================= */

    function showLightboxMedia(index) {

        /* Faz a navegação circular */

        if (index < 0) {
            index = galleryMedia.length - 1;
        }

        if (index >= galleryMedia.length) {
            index = 0;
        }

        currentLightboxIndex = index;

        /* Limpa o conteúdo anterior */

        lightboxContent.innerHTML = "";

        /* Pega a mídia atual */

        const media = galleryMedia[currentLightboxIndex];

        /* Cria uma cópia */

        const clone = media.cloneNode(true);

        /* Configuração especial para vídeos */

        if (clone.tagName === "VIDEO") {

            clone.controls = true;
            clone.autoplay = true;
            clone.muted = false;
            clone.loop = false;

        }

        /* Coloca a mídia no Lightbox */

        lightboxContent.appendChild(clone);

    }


    /* ================= ABRIR LIGHTBOX ================= */

    galleryMedia.forEach((media, index) => {

        media.addEventListener("click", () => {

            currentLightboxIndex = index;

            showLightboxMedia(currentLightboxIndex);

            galleryLightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* ================= SETA ESQUERDA ================= */

    lightboxPrev.addEventListener("click", (event) => {

        event.stopPropagation();

        showLightboxMedia(currentLightboxIndex - 1);

    });


    /* ================= SETA DIREITA ================= */

    lightboxNext.addEventListener("click", (event) => {

        event.stopPropagation();


        
    });


    /* ================= FECHAR LIGHTBOX ================= */

    function closeGalleryLightbox() {

        galleryLightbox.classList.remove("active");

        lightboxContent.innerHTML = "";

        document.body.style.overflow = "";

    }


    /* ================= BOTÃO X ================= */

    lightboxClose.addEventListener(
        "click",
        closeGalleryLightbox
    );


    /* ================= CLICAR FORA ================= */

    galleryLightbox.addEventListener("click", (event) => {

        if (event.target === galleryLightbox) {

            closeGalleryLightbox();

        }

    });


    /* ================= TECLADO ================= */

    document.addEventListener("keydown", (event) => {

        if (!galleryLightbox.classList.contains("active")) {
            return;
        }

        /* ESC */

        if (event.key === "Escape") {

            closeGalleryLightbox();

        }

        /* SETA ESQUERDA DO TECLADO */

        if (event.key === "ArrowLeft") {

            showLightboxMedia(currentLightboxIndex - 1);

        }

        /* SETA DIREITA DO TECLADO */

        if (event.key === "ArrowRight") {

            showLightboxMedia(currentLightboxIndex + 1);

        }

    }); 

}

}
