/* ===== Loader =====*/
window.addEventListener('load', () => {
    setTimeout(() => {
        const contenedorLoader = document.querySelector('.container--loader');
        contenedorLoader.style.opacity = 0;
        contenedorLoader.style.visibility = 'hidden';
    }, 1500); // Tiempo suficiente para ver la animación del loader
});

/*===== Header Animation on Scroll =====*/
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('abajo', window.scrollY > 50);
});

/*===== Menu móvil mejorado =====*/
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animación para el icono hamburguesa
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
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                
                // Restaurar icono hamburguesa
                if (menuToggle.classList.contains('open')) {
                    menuToggle.classList.remove('open');
                    const bars = menuToggle.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
                
                // Actualizar link activo
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
    
    // Detectar sección activa al hacer scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && 
                section.offsetTop + section.offsetHeight > scrollPosition) {
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
});

/*===== Carruseles mejorados =====*/
document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar los carruseles
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(carousel => {
            const items = carousel.querySelectorAll('.carousel-item');
            const indicators = carousel.querySelectorAll('.indicator');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            let currentIndex = 0;
            
            // Mostrar el primer elemento
            items[currentIndex].classList.add('active');
            if (indicators.length > 0) {
                indicators[currentIndex].classList.add('active');
            }
            
            // Función para mostrar un slide específico
            function showSlide(index) {
                // Ocultar slide actual
                items[currentIndex].classList.remove('active');
                if (indicators.length > 0) {
                    indicators[currentIndex].classList.remove('active');
                }
                
                // Actualizar índice
                currentIndex = index;
                if (currentIndex < 0) currentIndex = items.length - 1;
                if (currentIndex >= items.length) currentIndex = 0;
                
                // Mostrar nuevo slide
                items[currentIndex].classList.add('active');
                if (indicators.length > 0) {
                    indicators[currentIndex].classList.add('active');
                }
            }
            
            // Botones de navegación
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    showSlide(currentIndex - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    showSlide(currentIndex + 1);
                });
            }
            
            // Indicadores
            if (indicators.length > 0) {
                indicators.forEach((indicator, idx) => {
                    indicator.addEventListener('click', () => {
                        showSlide(idx);
                    });
                });
            }
            
            // Rotación automática cada 5 segundos
            setInterval(() => {
                showSlide(currentIndex + 1);
            }, 5000);
        });
    }
    
    // Inicializar los carruseles
    initCarousels();
});

/*===== Cambio de tema claro/oscuro =====*/
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Verificar si hay una preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema guardado o tema según preferencia del sistema
    if (savedTheme) {
        document.body.classList.toggle('light-theme', savedTheme === 'light');
    } else {
        // Verificar preferencia del sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('light-theme', !prefersDarkScheme);
    }
    
    // Añadir evento para cambiar de tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            // Guardar preferencia en localStorage
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            
            // Pequeña animación al cambiar
            this.classList.add('rotate-toggle');
            setTimeout(() => {
                this.classList.remove('rotate-toggle');
            }, 500);
        });
    }
});

/*===== Boton y función ir arriba =====*/
window.addEventListener('scroll', function() {
    // Función de ir arriba
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');
    } else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.go-top-container').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

/*===== Contadores para estadísticas con símbolos "+" =====*/
document.addEventListener('DOMContentLoaded', function() {
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(counter => {
            // Valor objetivo desde data-count
            const target = parseInt(counter.getAttribute('data-count'));
            let count = 0;
            const speed = 2000 / target; // Velocidad ajustada al valor objetivo
            
            // Usar IntersectionObserver para activar cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    const updateCount = () => {
                        if (count < target) {
                            count++;
                            // Añadimos el símbolo "+" al final del número
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
    
    // Inicializar contadores al cargar
    initCounters();
});

/*===== Animación en scroll con AOS =====*/
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS con configuración
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }
    
    // Enlaces con scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hacer que los enlaces del footer funcionen correctamente
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            const targetElement = document.querySelector(target);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* Interactividad en formulario de contacto */
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-contact input, .form-contact textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-5px)';
            
            // Cambiar color del icono
            const parentGroup = this.closest('.input-group');
            if (parentGroup) {
                const icon = parentGroup.querySelector('.input-icon');
                if (icon) {
                    icon.style.color = '#93BAFD';
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.transform = 'translateY(0)';
            }
            
            // Restaurar color del icono
            const parentGroup = this.closest('.input-group');
            if (parentGroup) {
                const icon = parentGroup.querySelector('.input-icon');
                if (icon) {
                    icon.style.color = '#212121';
                }
            }
        });
    });
    
    // Feedback visual al enviar el formulario
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Cambiar el texto del botón temporalmente
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
});

/* Actualizar año del footer */
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});