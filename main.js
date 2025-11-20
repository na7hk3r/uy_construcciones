
document.addEventListener('DOMContentLoaded', function() {
    // Loader: ocultar apenas cargue el sitio
    const contenedorLoader = document.querySelector('.container--loader');
    if (contenedorLoader) {
        window.addEventListener('load', () => {
            contenedorLoader.style.opacity = 0;
            contenedorLoader.style.visibility = 'hidden';
        });
    }

    // Header animación al hacer scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (header) header.classList.toggle('abajo', window.scrollY > 50);
        // Botón ir arriba
        const goTop = document.querySelector('.go-top-container');
        if (goTop) {
            if (document.documentElement.scrollTop > 100) {
                goTop.classList.add('show');
            } else {
                goTop.classList.remove('show');
            }
        }
        // Sección activa en menú
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 200;
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const bars = menuToggle.querySelectorAll('.bar');
            menuToggle.classList.toggle('open');
            if (menuToggle.classList.contains('open')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (menuToggle.classList.contains('open')) {
                    menuToggle.classList.remove('open');
                    const bars = menuToggle.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Botón ir arriba
    const goTop = document.querySelector('.go-top-container');
    if (goTop) {
        goTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Carruseles
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const items = carousel.querySelectorAll('.carousel-item');
            const indicators = carousel.querySelectorAll('.indicator');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            let currentIndex = 0;
            items[currentIndex].classList.add('active');
            if (indicators.length > 0) indicators[currentIndex].classList.add('active');
            function showSlide(index) {
                items[currentIndex].classList.remove('active');
                if (indicators.length > 0) indicators[currentIndex].classList.remove('active');
                currentIndex = index;
                if (currentIndex < 0) currentIndex = items.length - 1;
                if (currentIndex >= items.length) currentIndex = 0;
                items[currentIndex].classList.add('active');
                if (indicators.length > 0) indicators[currentIndex].classList.add('active');
            }
            if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
            if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
            if (indicators.length > 0) {
                indicators.forEach((indicator, idx) => {
                    indicator.addEventListener('click', () => showSlide(idx));
                });
            }
            setInterval(() => showSlide(currentIndex + 1), 5000);
        });
    }
    initCarousels();

    // Cambio de tema claro/oscuro
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('light-theme', savedTheme === 'light');
    } else {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('light-theme', !prefersDarkScheme);
    }
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            this.classList.add('rotate-toggle');
            setTimeout(() => {
                this.classList.remove('rotate-toggle');
            }, 500);
        });
    }

    // Contadores para estadísticas con símbolo "+"
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let count = 0;
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    const updateCount = () => {
                        if (count < target) {
                            count++;
                            counter.textContent = count + "+";
                            requestAnimationFrame(updateCount);
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            }, { threshold: 0.5 });
            observer.observe(counter);
        });
    }
    initCounters();

    // Animación en scroll con AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: false, mirror: true, offset: 100, easing: 'ease-in-out' });
    }

    // Scroll suave para enlaces internos y footer
    document.querySelectorAll('a[href^="#"], .footer-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Interactividad en formulario de contacto
    const inputs = document.querySelectorAll('.form-contact input, .form-contact textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-5px)';
            const parentGroup = this.closest('.input-group');
            if (parentGroup) {
                const icon = parentGroup.querySelector('.input-icon');
                if (icon) icon.style.color = '#93BAFD';
            }
        });
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.transform = 'translateY(0)';
            }
            const parentGroup = this.closest('.input-group');
            if (parentGroup) {
                const icon = parentGroup.querySelector('.input-icon');
                if (icon) icon.style.color = '#212121';
            }
        });
    });
    // Feedback visual al enviar el formulario
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const button = document.getElementById('btn-enviar');
            if (button) {
                const originalText = button.innerHTML;
                button.innerHTML = 'Enviando <i class="fas fa-spinner fa-spin"></i>';
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 2000);
            }
        });
    }

    // Actualizar año del footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});