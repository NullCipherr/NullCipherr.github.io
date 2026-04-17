/**
 * @fileoverview Lógica client-side para o Portfólio de Andrei Roberto da Costa.
 * O código foi mantido de forma performática e purista através de Vanilla JS.
 */

(() => {
    'use strict';

    const desktopNavBreakpoint = 1080;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const shouldSaveData = Boolean(
        connection && (connection.saveData || ['slow-2g', '2g'].includes(connection.effectiveType))
    );
    let mobileMenuKeyHandler = null;

    /**
     * Inicializa o Intersection Observer para animações de fade-in contínuo e bonito.
     */
    const initScrollObserver = () => {
        const fadeElements = document.querySelectorAll('.fade-element');

        if (prefersReducedMotion) {
            fadeElements.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    };

    /**
     * Gerencia a navegação suave (Smooth Scroll) para âncoras internas.
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                // Fecha menu mobile se estiver aberto ao navegar
                closeMobileMenu();

                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            });
        });
    };

    /**
     * Menu Mobile
     */
    const initMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        let lastFocusedElement = null;

        if (!menuToggle || !navLinks) return;

        const handleMenuKeyboard = event => {
            const isMenuActive = navLinks.classList.contains('active');
            if (!isMenuActive) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                closeMobileMenu();
                menuToggle.focus();
                return;
            }

            if (event.key !== 'Tab') return;

            const focusableElements = navLinks.querySelectorAll(focusableSelector);
            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        const openMenu = () => {
            lastFocusedElement = document.activeElement;
            navLinks.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', menuToggle.getAttribute('data-menu-close-label') || 'Fechar menu');
            document.body.style.overflow = 'hidden';
            mobileMenuKeyHandler = handleMenuKeyboard;
            document.addEventListener('keydown', mobileMenuKeyHandler);

            const firstFocusable = navLinks.querySelector(focusableSelector);
            if (firstFocusable) {
                firstFocusable.focus();
            }
        };

        menuToggle.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
                if (lastFocusedElement instanceof HTMLElement) {
                    lastFocusedElement.focus();
                }
                return;
            }

            openMenu();
        });

        // Corrigir bug de resize: se o usuário abrir o menu e aumentar a tela, o scroll volta ao normal
        window.addEventListener('resize', () => {
            if (window.innerWidth >= desktopNavBreakpoint) {
                closeMobileMenu();
            }
        });
    };

    /**
     * Fecha o menu mobile e restaura o scroll.
     */
    const closeMobileMenu = () => {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');

        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }

        if (mobileMenuKeyHandler) {
            document.removeEventListener('keydown', mobileMenuKeyHandler);
            mobileMenuKeyHandler = null;
        }

        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', menuToggle.getAttribute('data-menu-open-label') || 'Abrir menu');
        }
        // Sempre garante que o overflow volte ao normal ao fechar ou redimensionar
        document.body.style.overflow = '';
    };

    /**
     * Gerencia o lazy loading do background do Hero e dispara as animações.
     */
    const initHeroVideo = () => {
        const heroSection = document.getElementById('hero');
        const video = document.getElementById('hero-video');
        const heroContent = document.querySelector('#hero .hero-content');

        if (!video || !heroSection) return;

        const shouldDisableHeroVideo =
            prefersReducedMotion || shouldSaveData || window.matchMedia('(max-width: 850px)').matches;

        const revealHeroContent = (delay = 150) => {
            if (!heroContent) return;
            window.setTimeout(() => {
                heroContent.classList.add('is-visible');
            }, delay);
        };

        if (shouldDisableHeroVideo) {
            video.classList.add('is-disabled');
            revealHeroContent(0);
            return;
        }

        // Ajusta a velocidade do vídeo (0.8 = 20% mais lento)
        video.playbackRate = 0.925;

        const handleVideoReady = () => {
            // Adiciona classe para transição de opacidade no CSS
            video.classList.add('loaded');

            // Inicia o autoplay (mutado)
            video.play().catch(error => {
                console.warn("Autoplay impedido:", error);
            });
        };

        const loadVideoSources = () => {
            let sourcesUpdated = false;
            video.querySelectorAll('source[data-src]').forEach(source => {
                const dataSrc = source.getAttribute('data-src');
                if (dataSrc && !source.getAttribute('src')) {
                    source.setAttribute('src', dataSrc);
                    sourcesUpdated = true;
                }
            });

            if (sourcesUpdated) {
                video.load();
            }
        };

        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                loadVideoSources();
                videoObserver.disconnect();
            });
        }, { threshold: 0.15 });

        videoObserver.observe(heroSection);

        // Suavização do loop
        video.addEventListener('waiting', () => {
            video.classList.add('is-buffering');
        });

        video.addEventListener('playing', () => {
            video.classList.remove('is-buffering');
        });

        // Verifica se o vídeo já carregou
        if (video.readyState >= 3) {
            handleVideoReady();
        } else {
            video.addEventListener('canplaythrough', handleVideoReady, { once: true });
        }

        revealHeroContent(200);
    };

    /**
     * Ano Atual
     */
    const setCurrentYear = () => {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    /**
     * Gerencia a opacidade do header com base no scroll.
     */
    const initHeaderScroll = () => {
        const header = document.querySelector('.glass-header');
        if (!header) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Verifica o estado inicial
    };

    /**
     * Gerencia a tradução do site (I18n)
     */
    const initI18n = async () => {
        const langToggle = document.querySelector('.lang-toggle');
        const defaultLang = 'pt-br';
        let currentLang = localStorage.getItem('preferred-lang') || defaultLang;

        const translations = {};

        /**
         * Carrega o arquivo JSON de tradução.
         */
        const loadTranslations = async (lang) => {
            if (translations[lang]) return translations[lang];
            try {
                const response = await fetch(`./locales/${lang}.json`);
                if (!response.ok) throw new Error(`Could not load ${lang} translation`);
                translations[lang] = await response.json();
                return translations[lang];
            } catch (error) {
                console.error("Translation Error:", error);
                return null;
            }
        };

        /**
         * Aplica as traduções ao DOM.
         */
        const applyTranslations = (lang, data) => {
            if (!data) return;

            // Traduz elementos de texto simples
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (data[key]) {
                    el.textContent = data[key];
                }
            });

            // Traduz elementos que precisam de HTML (como <br>)
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                if (data[key]) {
                    el.innerHTML = data[key];
                }
            });

            // Traduz atributos (Ex: data-i18n-attr="alt:img_alt")
            document.querySelectorAll('[data-i18n-attr]').forEach(el => {
                const attrMaps = el.getAttribute('data-i18n-attr').split(',');
                attrMaps.forEach(map => {
                    const [attr, key] = map.split(':').map(s => s.trim());
                    if (data[key]) {
                        el.setAttribute(attr, data[key]);
                    }
                });
            });

            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute(
                    'aria-label',
                    isExpanded
                        ? (menuToggle.getAttribute('data-menu-close-label') || 'Fechar menu')
                        : (menuToggle.getAttribute('data-menu-open-label') || 'Abrir menu')
                );
            }

            // Atualiza o atributo lang do HTML
            document.documentElement.lang = lang === 'pt-br' ? 'pt-BR' : 'en';

            // Atualiza o estado do toggle
            if (langToggle) {
                const isEnglish = lang === 'en';
                const nextLangAriaKey = isEnglish ? 'lang_pt_aria' : 'lang_en_aria';
                const fallbackAria = isEnglish
                    ? 'Switch language to Portuguese'
                    : 'Trocar idioma para Inglês';

                langToggle.classList.toggle('is-en', isEnglish);
                langToggle.setAttribute('aria-pressed', String(isEnglish));
                langToggle.setAttribute('aria-label', data[nextLangAriaKey] || fallbackAria);
            }

            // Salva a preferência
            localStorage.setItem('preferred-lang', lang);
        };

        // Event Listener para o toggle de idioma
        if (langToggle) {
            langToggle.addEventListener('click', async () => {
                const lang = currentLang === 'pt-br' ? 'en' : 'pt-br';
                const data = await loadTranslations(lang);
                if (data) {
                    currentLang = lang;
                    applyTranslations(lang, data);
                }
            });
        }

        // Inicializa com o idioma salvo ou padrão
        const initialData = await loadTranslations(currentLang);
        if (initialData) {
            applyTranslations(currentLang, initialData);
        }
    };

    /**
     * Bootstrap
     */
    const initializeServices = () => {
        initScrollObserver();
        initSmoothScroll();
        initMobileMenu();
        setCurrentYear();
        initHeroVideo();
        initHeaderScroll();
        initI18n();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeServices);
    } else {
        initializeServices();
    }
})();
