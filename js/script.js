/**
 * @fileoverview Lógica client-side para o Portfólio de Andrei Roberto da Costa.
 * O código foi mantido de forma performática e purista através de Vanilla JS.
 */

(() => {
    'use strict';

    /**
     * Inicializa o Intersection Observer para animações de fade-in contínuo e bonito.
     */
    const initScrollObserver = () => {
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

        const fadeElements = document.querySelectorAll('.fade-element');
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
                        behavior: "smooth"
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

        if (!menuToggle || !navLinks) return;

        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);

            // Bloqueia scroll apenas se o menu estiver ativo
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Corrigir bug de resize: se o usuário abrir o menu e aumentar a tela, o scroll volta ao normal
        window.addEventListener('resize', () => {
            if (window.innerWidth > 850) {
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
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        // Sempre garante que o overflow volte ao normal ao fechar ou redimensionar
        document.body.style.overflow = '';
    };

    /**
     * Gerencia o lazy loading do background do Hero e dispara as animações.
     */
    const initHeroVideo = () => {
        const video = document.getElementById('hero-video');
        const heroContent = document.querySelector('#hero .hero-content');

        if (!video) return;

        // Ajusta a velocidade do vídeo (0.8 = 20% mais lento)
        video.playbackRate = 0.925;

        const handleVideoReady = () => {
            // Adiciona classe para transição de opacidade no CSS
            video.classList.add('loaded');

            // Inicia o autoplay (mutado)
            video.play().catch(error => {
                console.warn("Autoplay impedido:", error);
            });

            // Dispara a animação de entrada do conteúdo do Hero
            if (heroContent) {
                setTimeout(() => {
                    heroContent.classList.add('is-visible');
                }, 300);
            }
        };

        // Suavização do loop
        video.addEventListener('waiting', () => {
            video.style.opacity = '0.6';
        });

        video.addEventListener('playing', () => {
            video.style.opacity = '0.75';
        });

        // Verifica se o vídeo já carregou
        if (video.readyState >= 3) {
            handleVideoReady();
        } else {
            video.addEventListener('canplaythrough', handleVideoReady, { once: true });
        }
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
        const langBtns = document.querySelectorAll('.lang-btn');
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

            // Atualiza o atributo lang do HTML
            document.documentElement.lang = lang === 'pt-br' ? 'pt-BR' : 'en';

            // Atualiza o estado dos botões
            langBtns.forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
            });

            // Salva a preferência
            localStorage.setItem('preferred-lang', lang);
        };

        // Event Listeners para os botões de troca de idioma
        langBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const lang = btn.getAttribute('data-lang');
                if (lang === currentLang) return;

                const data = await loadTranslations(lang);
                if (data) {
                    currentLang = lang;
                    applyTranslations(lang, data);
                }
            });
        });

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
