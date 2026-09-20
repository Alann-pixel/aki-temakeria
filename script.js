/* ==================================================
   AKI TEMAKERIA
   SCRIPT.JS
================================================== */
// ================= SUPABASE =================

const SUPABASE_URL = "https://dndcjwnyuqkznzjrldwz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_RNTe7dYz8ypSqsrQff1HUA_qFCqkjOi";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

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

const whatsappNumber = "5584991841279";

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
        showLightboxMedia(currentLightboxIndex + 1);


        
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

// ================= AVALIAÇÃO POR ESTRELAS =================

const ratingButtons = document.querySelectorAll("#rating button");

let selectedRating = 0;

ratingButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const clickedRating = Number(button.dataset.rating);

        // Se clicar novamente na mesma estrela, limpa a avaliação
        if (selectedRating === clickedRating) {
            selectedRating = 0;
        } else {
            selectedRating = clickedRating;
        }

        ratingButtons.forEach((star) => {

            const starRating = Number(star.dataset.rating);

            if (starRating <= selectedRating) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }

        });

    });
});


// ================= ENVIO DA AVALIAÇÃO =================

const reviewForm = document.getElementById("review-form");
const reviewName = document.getElementById("review-name");
const reviewMessage = document.getElementById("review-message");

let enviandoAvaliacao = false;

reviewForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (enviandoAvaliacao) {
        return;
    }

    if (selectedRating === 0) {
        alert("Selecione uma nota de 1 a 5 estrelas.");
        return;
    }

    enviandoAvaliacao = true;

    const { error } = await supabaseClient
        .from("avaliacoes")
        .insert([
            {
                nome: reviewName.value.trim(),
                nota: selectedRating,
                comentario: reviewMessage.value.trim(),
                status: "pendente",
                created_at: new Date().toISOString()
            }
        ]);

    if (error) {
        console.error("Erro ao enviar avaliação:", error);
        alert("Não foi possível enviar sua avaliação. Tente novamente.");
        enviandoAvaliacao = false;
        return;
    }

    alert("Obrigado pela sua avaliação!");

    reviewForm.reset();

    selectedRating = 0;

    ratingButtons.forEach((star) => {
        star.classList.remove("active");
    });

    enviandoAvaliacao = false;
});

// ================= CARREGAR AVALIAÇÕES APROVADAS =================

const approvedReviews = document.getElementById("approved-reviews");

async function carregarAvaliacoes() {

    if (!approvedReviews) {
        return;
    }

    const { data, error } = await supabaseClient
        .from("avaliacoes")
        .select("nome, nota, comentario, created_at")
        .eq("status", "aprovada")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Erro ao carregar avaliações:", error);
        return;
    }

    approvedReviews.innerHTML = "";

    data.forEach((avaliacao) => {

        const review = document.createElement("div");
        review.classList.add("approved-review");

        const stars = "★".repeat(avaliacao.nota);
        const dataFormatada = new Date(avaliacao.created_at).toLocaleDateString(
    "pt-BR"
);
review.innerHTML = `
    <div class="approved-review-header">
        <strong>${avaliacao.nome}</strong>
        <span class="approved-review-stars">${stars}</span>
    </div>

    <p>${avaliacao.comentario}</p>

    <small class="approved-review-date">${dataFormatada}</small>
`;
        approvedReviews.appendChild(review);

    });

}

carregarAvaliacoes();