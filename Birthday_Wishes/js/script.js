/* =========================================================
   VERSION 3
   SCRIPT.JS PART 1
   LOADER + NAVIGATION + MUSIC
========================================================= */
if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {
    gsap.registerPlugin(
        ScrollTrigger
    );
}


"use strict";
"use strict";

/* Register GSAP Plugins */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {
    gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    LoaderModule.init();

    AOSModule.init();

    NavigationModule.init();

    MusicModule.init();

});

/* =========================================================
   LOADER MODULE
========================================================= */

const LoaderModule = (() => {

    const loader =
        document.getElementById(
            "loader"
        );

    const loaderBar =
        document.getElementById(
            "loaderBar"
        );

    function startLoaderProgress() {

        if (!loaderBar) return;

        let progress = 0;

        const interval =
            setInterval(() => {

                progress += 2;

                loaderBar.style.width =
                    progress + "%";

                if (
                    progress >= 100
                ) {

                    clearInterval(
                        interval
                    );
                }

            }, 30);
    }

    function hideLoader() {

        if (!loader) return;

        setTimeout(() => {

            loader.style.transition =
                "opacity 0.8s ease";

            loader.style.opacity =
                "0";

            setTimeout(() => {
                const audio =
                    document.getElementById(
                        "birthdayAudioPlayer"
                    );
                audio?.play()
                    .catch(() => {
                        console.log(
                            "Autoplay blocked"
                        );
                        const prompt =
                            document.getElementById(
                                "musicPrompt"
                            );
                        if (prompt) {
                            prompt.style.display =
                                "block";
                        }
                    });


                loader.remove();

            }, 800);

        }, 1500);
    }

    return {

        init() {

            /* Start Progress Bar */

            startLoaderProgress();

            /* Hide When Page Fully Loads */

            window.addEventListener(
                "load",
                hideLoader
            );
        }
    };

})();

/* =========================================================
   AOS ANIMATION INIT
========================================================= */

const AOSModule = (() => {

    return {

        init() {

            if (
                typeof AOS !==
                "undefined"
            ) {

                AOS.init({

                    duration: 1000,

                    easing:
                        "ease-out-cubic",

                    once: true,

                    offset: 100
                });
            }
        }
    };

})();

/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const NavigationModule = (() => {

    const navLinks =
        document.querySelectorAll(
            '.nav-links a'
        );

    const navbar =
        document.querySelector(
            '.navbar'
        );

    function smoothScroll() {

        navLinks.forEach(link => {

            link.addEventListener(
                'click',
                e => {

                    e.preventDefault();

                    const targetId =
                        link.getAttribute(
                            'href'
                        );

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    target.scrollIntoView({

                        behavior:
                            'smooth',

                        block:
                            'start'
                    });
                }
            );
        });
    }

    function navbarScrollEffect() {

        window.addEventListener(
            'scroll',
            () => {

                if (
                    window.scrollY > 60
                ) {

                    navbar?.classList.add(
                        'scrolled'
                    );

                } else {

                    navbar?.classList.remove(
                        'scrolled'
                    );
                }
            }
        );
    }

    function activeSection() {

        const sections =
            document.querySelectorAll(
                'section[id]'
            );

        window.addEventListener(
            'scroll',
            () => {

                let current = '';

                sections.forEach(
                    section => {

                        const top =
                            section.offsetTop -
                            180;

                        if (
                            window.scrollY >= top
                        ) {

                            current =
                                section.id;
                        }
                    }
                );

                navLinks.forEach(
                    link => {

                        link.classList.remove(
                            'active'
                        );

                        if (

                            link.getAttribute(
                                'href'
                            ) ===

                            `#${current}`

                        ) {

                            link.classList.add(
                                'active'
                            );
                        }
                    }
                );
            }
        );
    }

    return {

        init() {

            smoothScroll();

            navbarScrollEffect();

            activeSection();
        }
    };

})();
 
/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );

const navLinks =
    document.querySelector(
        ".nav-links"
    );

menuToggle?.addEventListener(
    "click",
    () => {

        navLinks?.classList.toggle(
            "active"
        );

        menuToggle.classList.toggle(
            "active"
        );
    }
);

/* Close Menu After Click */

document
.querySelectorAll(
    ".nav-links a"
)
.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks?.classList.remove(
                "active"
            );

            menuToggle?.classList.remove(
                "active"
            );
        }
    );
});


/* =========================================================
   MUSIC MODULE
========================================================= */

const MusicModule = (() => {

    const musicBtn =
        document.getElementById(
            'musicToggle'
        );

    const audio =
        document.getElementById(
            'birthdayAudioPlayer'
        );

    let isPlaying = false;

    async function playMusic() {

        if (!audio) return;

        try {

            await audio.play();

            isPlaying = true;

            musicBtn?.classList.add(
                'playing'
            );

        } catch (error) {

            console.warn(
                'Autoplay blocked:',
                error
            );
        }
    }

    function pauseMusic() {

        if (!audio) return;

        audio.pause();

        isPlaying = false;

        musicBtn?.classList.remove(
            'playing'
        );
    }

    function toggleMusic() {

        if (isPlaying) {

            pauseMusic();

        } else {

            playMusic();
        }
    }

    function musicButtonAnimation() {

        if (!musicBtn) return;

        musicBtn.addEventListener(
            'mouseenter',
            () => {

                musicBtn.style.transform =
                    'scale(1.1)';
            }
        );

        musicBtn.addEventListener(
            'mouseleave',
            () => {

                musicBtn.style.transform =
                    '';
            }
        );
    }

    return {

        init() {

            musicBtn?.addEventListener(
                'click',
                toggleMusic
            );

            musicButtonAnimation();

            audio?.addEventListener(
                "play",
                () => {
                    isPlaying = true;
                    musicBtn?.classList.add(
                        "playing"
                    );
                }
            );

            audio?.addEventListener(
                "pause",
                () => {
                    isPlaying = false;
                    musicBtn?.classList.remove(
                        "playing"
                    );
                }
            );

            /* Mobile Fallback: If autoplay is blocked,
            start music on first user tap */
            const musicPrompt =
                document.getElementById(
                    "musicPrompt"
                );
            musicPrompt?.addEventListener(
                "click",
                async () => {
                    try {
                        await audio.play();
                        isPlaying = true;
                        musicBtn?.classList.add(
                            "playing"
                        );
                        musicPrompt.remove();
                    } catch (e) {
                        console.warn(
                            "Music start failed",
                            e
                        );
                    }
                }
            );

        }
    };

})();

/* =========================================================
   ACTIVE NAV LINK STYLE
========================================================= */

(function createActiveNavStyle() {

    const style =
        document.createElement(
            'style'
        );

    style.textContent = `

        .nav-links a.active {

            color: var(--gold);

            font-weight: 600;
        }

        .music-btn.playing {

            animation:
                pulseMusic 1.5s infinite;
        }

        @keyframes pulseMusic {

            0% {

                transform: scale(1);
            }

            50% {

                transform: scale(1.12);
            }

            100% {

                transform: scale(1);
            }
        }
    `;

    document.head.appendChild(
        style
    );

})();
/* =========================================================
   VERSION 3
   SCRIPT.JS PART 2
   PREMIUM GALLERY SYSTEM
========================================================= */

const GalleryModule = (() => {

    const galleryImages =
        document.querySelectorAll(
            ".gallery-img"
        );

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const closeButton =
        document.getElementById(
            "closeLightbox"
        );

    let currentIndex = 0;

    let imageList = [];

    function collectImages() {

        imageList =
            Array.from(
                galleryImages
            );
    }

    function openLightbox(index) {

        if (
            !lightbox ||
            !lightboxImage
        ) return;

        currentIndex = index;

        lightboxImage.src =
            imageList[index].src;

        lightbox.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

        animateLightbox();
    }

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";
    }

    function nextImage() {

        currentIndex++;

        if (
            currentIndex >=
            imageList.length
        ) {

            currentIndex = 0;
        }

        updateLightboxImage();
    }

    function previousImage() {

        currentIndex--;

        if (
            currentIndex < 0
        ) {

            currentIndex =
                imageList.length - 1;
        }

        updateLightboxImage();
    }

    function updateLightboxImage() {

        if (!lightboxImage) return;

        lightboxImage.style.opacity =
            "0";

        setTimeout(() => {

            lightboxImage.src =
                imageList[
                    currentIndex
                ].src;

            lightboxImage.style.opacity =
                "1";

        }, 150);
    }

    function animateLightbox() {

        if (
            typeof gsap ===
            "undefined"
        ) return;

        gsap.fromTo(

            "#lightboxImage",

            {
                scale: 0.85,
                opacity: 0
            },

            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out"
            }
        );
    }

    function keyboardNavigation(e) {

        if (
            !lightbox?.classList.contains(
                "active"
            )
        ) return;

        switch (e.key) {

            case "Escape":

                closeLightbox();

                break;

            case "ArrowRight":

                nextImage();

                break;

            case "ArrowLeft":

                previousImage();

                break;
        }
    }

    function addGalleryHoverEffects() {

        galleryImages.forEach(
            image => {

                image.addEventListener(
                    "mouseenter",
                    () => {

                        if (
                            typeof gsap !==
                            "undefined"
                        ) {

                            gsap.to(
                                image,
                                {
                                    scale: 1.05,
                                    duration: 0.4
                                }
                            );
                        }
                    }
                );

                image.addEventListener(
                    "mouseleave",
                    () => {

                        if (
                            typeof gsap !==
                            "undefined"
                        ) {

                            gsap.to(
                                image,
                                {
                                    scale: 1,
                                    duration: 0.4
                                }
                            );
                        }
                    }
                );
            }
        );
    }

    function addImageClickEvents() {

        imageList.forEach(
            (
                image,
                index
            ) => {

                image.addEventListener(
                    "click",
                    () => {

                        openLightbox(
                            index
                        );
                    }
                );
            }
        );
    }

    function clickOutsideClose() {

        lightbox?.addEventListener(
            "click",
            e => {

                if (
                    e.target ===
                    lightbox
                ) {

                    closeLightbox();
                }
            }
        );
    }

    function createNavigationButtons() {

        if (!lightbox) return;

        const previousBtn =
            document.createElement(
                "button"
            );

        previousBtn.className =
            "lightbox-prev";

        previousBtn.innerHTML =
            "❮";

        const nextBtn =
            document.createElement(
                "button"
            );

        nextBtn.className =
            "lightbox-next";

        nextBtn.innerHTML =
            "❯";

        lightbox.appendChild(
            previousBtn
        );

        lightbox.appendChild(
            nextBtn
        );

        previousBtn.addEventListener(
            "click",
            e => {

                e.stopPropagation();

                previousImage();
            }
        );

        nextBtn.addEventListener(
            "click",
            e => {

                e.stopPropagation();

                nextImage();
            }
        );
    }

    function createImageCounter() {

        if (!lightbox) return;

        const counter =
            document.createElement(
                "div"
            );

        counter.id =
            "lightboxCounter";

        counter.className =
            "lightbox-counter";

        lightbox.appendChild(
            counter
        );

        const updateCounter = () => {

            counter.textContent =
                `${currentIndex + 1} / ${imageList.length}`;
        };

        const observer =
            new MutationObserver(
                updateCounter
            );

        observer.observe(
            lightboxImage,
            {
                attributes: true
            }
        );

        updateCounter();
    }

    return {

        init() {

            collectImages();

            addImageClickEvents();

            addGalleryHoverEffects();

            createNavigationButtons();

            createImageCounter();

            clickOutsideClose();

            closeButton?.addEventListener(
                "click",
                closeLightbox
            );

            document.addEventListener(
                "keydown",
                keyboardNavigation
            );
        }
    };

})();

/* =========================================================
   GALLERY SCROLL REVEAL
========================================================= */

const GalleryAnimationModule = (() => {

    function animateCards() {

        const cards =
            document.querySelectorAll(
                ".gallery-card"
            );

        if (
            typeof gsap ===
                "undefined" ||
            !cards.length
        ) return;

        cards.forEach(
            (
                card,
                index
            ) => {

                gsap.from(
                    card,
                    {
                        opacity: 0,
                        y: 60,
                        duration: 0.8,
                        delay:
                            index * 0.05,

                        scrollTrigger: {

                            trigger:
                                card,

                            start:
                                "top 85%"
                        }
                    }
                );
            }
        );
    }

    return {

        init() {

            animateCards();
        }
    };

})();

/* =========================================================
   INITIALIZE PART 2
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        GalleryModule.init();

        GalleryAnimationModule.init();
    }
);
/* =========================================================
   VERSION 3
   SCRIPT.JS PART 3
   GIFT REVEAL + CELEBRATION EFFECTS
========================================================= */

const GiftModule = (() => {

    const giftBox =
        document.getElementById(
            "giftBox"
        );

    const giftReveal =
        document.getElementById(
            "giftReveal"
        );

    let opened = false;

    function openGift() {

        if (
            opened ||
            !giftBox
        ) return;

        opened = true;

        /* Hide Gift Box */

        giftBox.style.opacity = "0";

        giftBox.style.transform =
            "scale(0.8)";
        
        setTimeout(() => {

            giftBox.style.display =
                "none";
        }, 600);

        /* Show Birthday Letter */

        setTimeout(() => {
            giftReveal?.classList.add(
                "active"
            );
            startLetterTyping();

            HeartsModule.burst();

        }, 700);


        /* Effects */

        launchCelebration();

        /* Scroll To Message */

        setTimeout(() => {

            giftReveal?.scrollIntoView({

                behavior: "smooth",
                block: "center"

            });

        }, 700);

        /* GSAP Animation */

        if (
            typeof gsap !==
            "undefined"
        ) {

            gsap.fromTo(

                ".birthday-letter",

                {
                    y: 50,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                }
            );
        }
    }

    return {

        init() {

            giftBox?.addEventListener(
                "click",
                openGift
            );
        }
    };

})();


/* =========================================================
   PREMIUM BIRTHDAY LETTER TYPEWRITER
========================================================= */

function startLetterTyping() {

    const message = `

Happy Birthday, rekha. 

Today, we celebrate the incredible gift of you and the beautiful light you bring into this world.

Your heart is a sanctuary of kindness, and your soul radiates a warmth that gently touches everyone lucky enough to know you. You have an extraordinary way of making the world brighter, lifting others up simply by being yourself. As you step into this new chapter of your life, I hope you pause to realize just how deeply you are loved, appreciated, and cherished.

May this year wrap you in endless peace, comfort you in moments of doubt, and bring you quiet joys that make your heart overflow. I pray you are blessed with the courage to pursue your deepest dreams and the strength to see your own immense worth. May your path be lined with genuine laughter, beautiful memories, and people who protect your happiness as fiercely as you do theirs.

Thank you for being such a beautiful inspiration and a constant anchor of love. Your journey is a magnificent story, and the best chapters are still waiting to be written.

May all your quiet wishes come true today. Happy Birthday, dearest rekha.❤️

`;

    const target =
        document.getElementById(
            "typewriterMessage"
        );

    if (!target) return;

    let index = 0;

    target.innerHTML = "";

    const interval =
        setInterval(() => {

            target.innerHTML +=
                message.charAt(index) === "\n"
                    ? "<br>"
                    : message.charAt(index);

            index++;

            if (
                index >=
                message.length
            ) {

                clearInterval(
                    interval
                );
            }

        }, 35);
}

/* =========================================================
   VIEW MEMORIES BUTTON
========================================================= */
document
.getElementById(
    "viewMemoriesBtn"
)
?.addEventListener(
    "click",
    () => {

        document
        .getElementById(
            "gallery"
        )
        ?.scrollIntoView({

            behavior:
                "smooth"
        });
    }
);
/* =========================================================
   FLOATING HEARTS
========================================================= */

const HeartsModule = (() => {

    const container =
        document.getElementById(
            "hearts-container"
        );

    function createHeart(
        burstMode = false
    ) {

        const heart =
            document.createElement(
                "img"
            );

        heart.src =
            "assets/icons/heart.png";

        heart.className =
            "floating-heart";

        if (burstMode) {

            heart.style.position =
                "fixed";

            heart.style.left =
                Math.random() * 100 + "%";

            heart.style.top =
                "65%";

            heart.style.width =
                Math.random() * 80 + 80 + "px";

            heart.style.zIndex =
                "99999";

            document.body.appendChild(
                heart
            );

            setTimeout(() => {

                heart.remove();

            }, 5000);

        } else {

            if (!container) return;

            heart.style.left =
                Math.random() * 100 + "%";

            heart.style.bottom =
                "-50px";

            heart.style.width =
                Math.random() * 60 + 60 + "px";

            heart.style.animationDuration =
                Math.random() * 3 + 5 + "s";

            container.appendChild(
                heart
            );

            setTimeout(() => {

                heart.remove();

            }, 8000);
        }
    }

    return {

        start() {

            setInterval(
                () => createHeart(false),
                1200
            );
        },

        burst() {

            for (
                let i = 0;
                i < 30;
                i++
            ) {

                setTimeout(
                    () => createHeart(true),
                    i * 80
                );
            }
        }
    };

})();

/* =========================================================
   SPARKLES
========================================================= */

const SparkleModule = (() => {

    const container =
        document.getElementById(
            "sparkles-container"
        );

    function createSparkle() {

        if (!container) return;

        const sparkle =
            document.createElement(
                "img"
            );

        sparkle.src =
            "assets/icons/sparkle.png";

        sparkle.className =
            "sparkle";

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.top =
            Math.random() * 100 + "%";

        sparkle.style.width =
            Math.random() * 25 + 25 + "px";

        container.appendChild(
            sparkle
        );

        setTimeout(() => {

            sparkle.remove();

        }, 4000);
    }

    return {

        start() {

            setInterval(
                createSparkle,
                1500
            );
        },

        burst() {

            for (
                let i = 0;
                i < 30;
                i++
            ) {

                setTimeout(
                    createSparkle,
                    i * 60
                );
            }
        }
    };

})();

/* =========================================================
   PREMIUM CONFETTI
========================================================= */

const ConfettiModule = (() => {

    function createConfettiPiece() {

        const confetti =
            document.createElement(
                "div"
            );

        confetti.className =
            "confetti-piece";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.background =
            [
                "#f4d88b",
                "#f7c4d6",
                "#c89b3c",
                "#ffffff"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];

        confetti.style.animationDuration =
            Math.random() * 2 + 3 + "s";

        document.body.appendChild(
            confetti
        );

        setTimeout(() => {

            confetti.remove();

        }, 6000);
    }

    return {

        burst() {

            for (
                let i = 0;
                i < 120;
                i++
            ) {

                setTimeout(
                    createConfettiPiece,
                    i * 15
                );
            }
        }
    };

})();

/* =========================================================
   CELEBRATION ENGINE
========================================================= */

function launchCelebration() {

    HeartsModule.burst();

    SparkleModule.burst();

    ConfettiModule.burst();

    if (
        navigator.vibrate
    ) {

        navigator.vibrate([
            200,
            100,
            200
        ]);
    }
}

/* =========================================================
   SCROLL CELEBRATION
========================================================= */

const ScrollCelebrationModule = (() => {

    let triggered = false;

    function celebrateAtGallery() {

        const gallery =
            document.getElementById(
                "gallery"
            );

        if (!gallery) return;

        const rect =
            gallery.getBoundingClientRect();

        if (

            rect.top <
                window.innerHeight * 0.6 &&

            !triggered

        ) {

            triggered = true;

            SparkleModule.burst();
        }
    }

    return {

        init() {

            window.addEventListener(
                "scroll",
                celebrateAtGallery
            );
        }
    };

})();

/* =========================================================
   CELEBRATION BUTTONS
========================================================= */

const CelebrationButtonsModule = (() => {

    const primaryButton =
        document.querySelector(
            ".btn-primary"
        );

    const secondaryButton =
        document.querySelector(
            ".btn-secondary"
        );

    function addEffects(button) {

        if (!button) return;

        button.addEventListener(
            "mouseenter",
            () => {

                SparkleModule.burst();
            }
        );
    }

    return {

        init() {

            addEffects(
                primaryButton
            );

            addEffects(
                secondaryButton
            );
        }
    };

})();

/* =========================================================
   INITIALIZE PART 3
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        GiftModule.init();

        HeartsModule.start();

        SparkleModule.start();

        ScrollCelebrationModule.init();

        CelebrationButtonsModule.init();
    }
);
/* =========================================================
   VERSION 3
   SCRIPT.JS PART 4
   HERO + GSAP + PERFORMANCE + FINAL INIT
========================================================= */

/* =========================================================
   HERO PARALLAX EFFECT
========================================================= */

const HeroModule = (() => {

    const heroImage =
        document.querySelector(
            ".hero-image img"
        );

    const heroCake =
        document.querySelector(
            ".hero-cake"
        );

    const balloons =
        document.querySelector(
            ".hero-balloons"
        );

    function mouseParallax(e) {

        const x =
            (
                e.clientX /
                window.innerWidth -
                0.5
            ) * 30;

        const y =
            (
                e.clientY /
                window.innerHeight -
                0.5
            ) * 30;

        if (heroImage) {

            heroImage.style.transform =
                `translate(${x}px, ${y}px)`;
        }

        if (heroCake) {

            heroCake.style.transform =
                `translate(${x * 0.5}px, ${y * 0.5}px)`;
        }

        if (balloons) {

            balloons.style.transform =
                `translate(${x * -0.3}px, ${y * -0.3}px)`;
        }
    }

    return {

        init() {

            if (
                window.innerWidth > 992
            ) {

                window.addEventListener(
                    "mousemove",
                    mouseParallax
                );
            }
        }
    };

})();

/* =========================================================
   PREMIUM GSAP ANIMATIONS
========================================================= */

const GSAPModule = (() => {

    function heroEntrance() {

        if (
            typeof gsap ===
            "undefined"
        ) return;

        const tl =
            gsap.timeline();

        tl.from(
            ".hero-tag",
            {
                opacity: 0,
                y: -40,
                duration: 0.8
            }
        )

        .from(
            ".hero-content h1",
            {
                opacity: 0,
                y: 60,
                duration: 1
            },
            "-=0.4"
        )

        .from(
            ".hero-content p",
            {
                opacity: 0,
                y: 40,
                duration: 0.8
            },
            "-=0.5"
        )

        .from(
            ".hero-content h3",
            {
                opacity: 0,
                y: 40,
                duration: 0.8
            },
            "-=0.5"
        )

        .from(
            ".hero-buttons",
            {
                opacity: 0,
                y: 40,
                duration: 0.8
            },
            "-=0.5"
        )

        .from(
            ".hero-image",
            {
                opacity: 0,
                scale: 0.8,
                duration: 1.2
            },
            "-=1"
        );
    }

    function floatingElements() {

        if (
            typeof gsap ===
            "undefined"
        ) return;

        gsap.to(
            ".hero-cake",
            {
                y: -25,
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: "power1.inOut"
            }
        );

        gsap.to(
            ".hero-balloons",
            {
                y: -30,
                repeat: -1,
                yoyo: true,
                duration: 4,
                ease: "power1.inOut"
            }
        );
    }

    function cardHoverAnimations() {

        if (
            typeof gsap ===
            "undefined"
        ) return;

        const cards =
            document.querySelectorAll(
                ".memory-card, .wish-card"
            );

        cards.forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        card,
                        {
                            y: -10,
                            duration: 0.3
                        }
                    );
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        card,
                        {
                            y: 0,
                            duration: 0.3
                        }
                    );
                }
            );
        });
    }

    return {

        init() {

            heroEntrance();

            floatingElements();

            cardHoverAnimations();
        }
    };

})();

/* =========================================================
   IMAGE PRELOADER
========================================================= */

const PerformanceModule = (() => {

    function preloadImages() {

        const images = [

            "assets/gallery/gallery-1.jpg",
            "assets/gallery/gallery-2.jpg",
            "assets/gallery/gallery-3.jpg",
            "assets/gallery/gallery-4.jpg",
            "assets/gallery/gallery-5.jpg",
            "assets/gallery/gallery-6.jpg",
            "assets/gallery/gallery-7.jpg",
            "assets/gallery/gallery-8.jpg",
            "assets/gallery/gallery-9.jpg",
            "assets/gallery/gallery-10.jpg",
            "assets/gallery/gallery-11.jpg",
            "assets/gallery/gallery-12.jpg",

            "assets/images/hero-cake.png",
            "assets/images/gift-closed.png",
            "assets/images/gift-opened.png",
            "assets/images/balloons.png",
            "assets/images/balloons.png",

            "assets/icons/heart.png",
            "assets/icons/favicon.png",
            "assets/icons/star.png",
            "assets/icons/music.png",
            "assets/icons/sparkle.png"
        ];

        images.forEach(src => {

            const img =
                new Image();

            img.src = src;
        });
    }

    function lazyLoadImages() {

        const images =
            document.querySelectorAll(
                "img"
            );

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "loaded"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },

                {
                    threshold: 0.1
                }
            );

        images.forEach(
            image =>
                observer.observe(
                    image
                )
        );
    }

    return {

        init() {

            preloadImages();

            lazyLoadImages();
        }
    };

})();

/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */

const ProgressModule = (() => {

    function createProgressBar() {

        const progress =
            document.createElement(
                "div"
            );

        progress.id =
            "scrollProgress";

        document.body.appendChild(
            progress
        );

        window.addEventListener(
            "scroll",
            () => {

                const totalHeight =
                    document.documentElement.scrollHeight -
                    window.innerHeight;

                const current =
                    (
                        window.scrollY /
                        totalHeight
                    ) * 100;

                progress.style.width =
                    current + "%";
            }
        );
    }

    return {

        init() {

            createProgressBar();
        }
    };

})();

/* =========================================================
   FINAL WEBSITE BOOTSTRAP
========================================================= */

const App = (() => {

    function initializeWebsite() {

        HeroModule.init();

        GSAPModule.init();

        PerformanceModule.init();

        ProgressModule.init();

        console.log(
            "%c🎂 Happy Birthday rekha Website Loaded Successfully",
            "color:#c89b3c;font-size:14px;font-weight:bold;"
        );
    }

    return {

        init() {

            initializeWebsite();
        }
    };

})();

/* =========================================================
   FINAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.init();
    }
);

/* =========================================================
   VERSION 3 COMPLETE
========================================================= */