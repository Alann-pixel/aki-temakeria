
/* ==================================================
   AKI TEMAKERIA
   SCRIPT.JS
================================================== */


/* ================= SUPABASE ================= */

const SUPABASE_URL = "https://dndcjwnyuqkznzjrldwz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_RNTe7dYz8ypSqsrQff1HUA_qFCqkjOi";

let supabaseClient = null;

if (window.supabase) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
}


/* ================= MENU MOBILE ================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

}


/* ================= FECHAR MENU AO CLICAR EM UM LINK ================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {
            nav.classList.remove("active");
        }

    });

});


/* ================= HEADER ================= */

const header = document.getElementById("header");

let lastScroll = 0;

if (header) {

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

}


/* ================= ANIMAÇÕES ================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

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

}


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

const yearElements =
    document.querySelectorAll(".footer-bottom p");

const currentYear =
    new Date().getFullYear();

if (yearElements.length > 0) {

    yearElements[0].textContent =
        `© ${currentYear} Aki Temakeria. Todos os direitos reservados.`;

}


/* ================= WHATSAPP ================= */

/*
    Número real do restaurante.

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
    "Olá! Vim pelo site do Aki Temakeria e gostaria de fazer um pedido.";


const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


const whatsappButton =
    document.querySelector(".whatsapp");


if (whatsappButton) {

    whatsappButton.href = whatsappLink;

}


/* ================= ESC PARA FECHAR MENU ================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && nav) {

        nav.classList.remove("active");

    }

});


/* ================= CARROSSEL DA GALERIA ================= */

const galleryGrid =
    document.querySelector(".gallery-grid");

const galleryLeft =
    document.querySelector(".gallery-arrow-left");

const galleryRight =
    document.querySelector(".gallery-arrow-right");


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

}


/* ================= LIGHTBOX DA GALERIA ================= */

const galleryLightbox =
    document.getElementById("gallery-lightbox");

const lightboxContent =
    document.getElementById("lightbox-content");

const lightboxClose =
    document.getElementById("lightbox-close");

const lightboxPrev =
    document.getElementById("lightbox-prev");

const lightboxNext =
    document.getElementById("lightbox-next");


if (
    galleryLightbox &&
    lightboxContent &&
    lightboxClose &&
    lightboxPrev &&
    lightboxNext
) {

    /* Pega todas as fotos e vídeos da galeria */

    const galleryMedia =
        document.querySelectorAll(
            ".gallery-item img, .gallery-item video"
        );


    let currentLightboxIndex = 0;


    /* ================= MOSTRAR MÍDIA ================= */

    function showLightboxMedia(index) {

        if (galleryMedia.length === 0) {

            return;

        }


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

        const media =
            galleryMedia[currentLightboxIndex];


        if (!media) {

            return;

        }


        /* Cria uma cópia */

        const clone =
            media.cloneNode(true);


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

        showLightboxMedia(
            currentLightboxIndex - 1
        );

    });


    /* ================= SETA DIREITA ================= */

    lightboxNext.addEventListener("click", (event) => {

        event.stopPropagation();

        showLightboxMedia(
            currentLightboxIndex + 1
        );

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

            showLightboxMedia(
                currentLightboxIndex - 1
            );

        }


        /* SETA DIREITA DO TECLADO */

        if (event.key === "ArrowRight") {

            showLightboxMedia(
                currentLightboxIndex + 1
            );

        }

    });

}


/* ================= AVALIAÇÃO POR ESTRELAS ================= */

const ratingButtons =
    document.querySelectorAll("#rating button");

let selectedRating = 0;


ratingButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const clickedRating =
            Number(button.dataset.rating);


        /* Se clicar novamente na mesma estrela,
           limpa a avaliação */

        if (selectedRating === clickedRating) {

            selectedRating = 0;

        } else {

            selectedRating = clickedRating;

        }


        ratingButtons.forEach((star) => {

            const starRating =
                Number(star.dataset.rating);


            if (starRating <= selectedRating) {

                star.classList.add("active");

            } else {

                star.classList.remove("active");

            }

        });

    });

});


/* ================= ENVIO DA AVALIAÇÃO ================= */

const reviewForm =
    document.getElementById("review-form");

const reviewName =
    document.getElementById("review-name");

const reviewMessage =
    document.getElementById("review-message");

const reviewModal =
    document.getElementById("review-modal");

const reviewModalClose =
    document.getElementById("review-modal-close");

const reviewModalButton =
    document.getElementById("review-modal-button");

const reviewModalOverlay =
    document.querySelector(".review-modal-overlay");


let enviandoAvaliacao = false;


if (
    reviewForm &&
    reviewName &&
    reviewMessage &&
    supabaseClient
) {

    reviewForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        if (enviandoAvaliacao) {

            return;

        }


        /* Verifica se uma estrela foi selecionada */

        if (selectedRating === 0) {

            alert(
                "Selecione uma nota de 1 a 5 estrelas."
            );

            return;

        }


        /* Verifica nome e comentário */

        if (
            reviewName.value.trim() === "" ||
            reviewMessage.value.trim() === ""
        ) {

            alert(
                "Preencha seu nome e seu comentário."
            );

            return;

        }


        enviandoAvaliacao = true;


        const { error } =
            await supabaseClient
                .from("avaliacoes")
                .insert([
                    {
                        nome: reviewName.value.trim(),

                        nota: selectedRating,

                        comentario:
                            reviewMessage.value.trim(),

                        status: "pendente",

                        created_at:
                            new Date().toISOString()
                    }
                ]);


        /* Se houver erro */

        if (error) {

            console.error(
                "Erro ao enviar avaliação:",
                error
            );

            alert(
                "Não foi possível enviar sua avaliação. Tente novamente."
            );

            enviandoAvaliacao = false;

            return;

        }


        /* Mostra o modal somente se ele existir */

        if (reviewModal) {

            reviewModal.classList.add("active");

            reviewModal.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        /* Limpa o formulário */

        reviewForm.reset();


        /* Limpa a nota selecionada */

        selectedRating = 0;


        ratingButtons.forEach((star) => {

            star.classList.remove("active");

        });


        enviandoAvaliacao = false;

    });


    /* ================= FECHAR MODAL DE AVALIAÇÃO ================= */

    function fecharReviewModal() {

        if (reviewModal) {

            reviewModal.classList.remove("active");

            reviewModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (document.activeElement) {

            document.activeElement.blur();

        }

    }


    if (reviewModalClose) {

        reviewModalClose.addEventListener(
            "click",
            fecharReviewModal
        );

    }


    if (reviewModalButton) {

        reviewModalButton.addEventListener(
            "click",
            fecharReviewModal
        );

    }


    if (reviewModalOverlay) {

        reviewModalOverlay.addEventListener(
            "click",
            fecharReviewModal
        );

    }

}


/* ================= CARREGAR AVALIAÇÕES APROVADAS ================= */

const approvedReviews =
    document.getElementById("approved-reviews");


async function carregarAvaliacoes() {

    if (
        !approvedReviews ||
        !supabaseClient
    ) {

        return;

    }


    const { data, error } =
        await supabaseClient
            .from("avaliacoes")
            .select(
                "nome, nota, comentario, created_at"
            )
            .eq("status", "aprovada")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Erro ao carregar avaliações:",
            error
        );

        return;

    }


    approvedReviews.innerHTML = "";


    if (!data || data.length === 0) {

        return;

    }


    data.forEach((avaliacao) => {

        const review =
            document.createElement("div");


        review.classList.add(
            "approved-review"
        );


        const nota =
            Number(avaliacao.nota);


        const stars =
            "★".repeat(
                Math.max(
                    0,
                    Math.min(5, nota)
                )
            );


        const dataFormatada =
            avaliacao.created_at
                ? new Date(
                    avaliacao.created_at
                ).toLocaleDateString("pt-BR")
                : "";


        /* ================= CABEÇALHO ================= */

        const reviewHeader =
            document.createElement("div");


        reviewHeader.classList.add(
            "approved-review-header"
        );


        /* ================= NOME ================= */

        const name =
            document.createElement("strong");


        name.textContent =
            avaliacao.nome || "Cliente";


        /* ================= ESTRELAS ================= */

        const starsElement =
            document.createElement("span");


        starsElement.classList.add(
            "approved-review-stars"
        );


        starsElement.textContent =
            stars;


        reviewHeader.appendChild(name);

        reviewHeader.appendChild(
            starsElement
        );


        /* ================= COMENTÁRIO ================= */

        const comment =
            document.createElement("p");


        comment.textContent =
            avaliacao.comentario || "";


        /* ================= DATA ================= */

        const date =
            document.createElement("small");


        date.classList.add(
            "approved-review-date"
        );


        date.textContent =
            dataFormatada;


        /* ================= MONTA A AVALIAÇÃO ================= */

        review.appendChild(
            reviewHeader
        );

        review.appendChild(
            comment
        );

        review.appendChild(
            date
        );


        approvedReviews.appendChild(
            review
        );

    });

}


/* ================= INICIAR AVALIAÇÕES ================= */

carregarAvaliacoes();
