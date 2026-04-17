// ====================================================================
// NumLuck Landing Page — Premium Interactions
// ====================================================================

(function () {
    'use strict';

    // ----------------------------------------------------------------
    // Smooth scrolling for anchor links
    // ----------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----------------------------------------------------------------
    // Phone screen rotation — cycles through app screenshots
    // ----------------------------------------------------------------
    const phoneScreens = document.querySelectorAll('.phone-screen');
    if (phoneScreens.length > 1) {
        let currentIndex = 0;
        const rotateScreens = () => {
            phoneScreens[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % phoneScreens.length;
            phoneScreens[currentIndex].classList.add('active');
        };
        setInterval(rotateScreens, 3000);
    }

    // ----------------------------------------------------------------
    // Scroll reveal — adds .visible when sections enter viewport
    // ----------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
        );
        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback — show everything if IO is unavailable
        revealElements.forEach((el) => el.classList.add('visible'));
    }

    // ----------------------------------------------------------------
    // Staggered reveal for cards / steps / benefits inside a section
    // ----------------------------------------------------------------
    const staggerTargets = document.querySelectorAll(
        '.feature-card, .benefit, .step'
    );
    if ('IntersectionObserver' in window && staggerTargets.length) {
        const staggerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        const delay = (i % 6) * 80;
                        entry.target.style.transitionDelay = `${delay}ms`;
                        entry.target.classList.add('in-view');
                        staggerObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        staggerTargets.forEach((el) => staggerObserver.observe(el));
    }

    // ----------------------------------------------------------------
    // Navbar scroll effect — compact/blur when scrolled
    // ----------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ----------------------------------------------------------------
    // Parallax drift on hero glow / stars (subtle)
    // ----------------------------------------------------------------
    const heroGlow = document.querySelector('.hero-glow');
    const phoneWrapper = document.querySelector('.phone-wrapper');
    if (heroGlow || phoneWrapper) {
        let ticking = false;
        window.addEventListener(
            'mousemove',
            (e) => {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 20;
                    const y = (e.clientY / window.innerHeight - 0.5) * 20;
                    if (heroGlow) {
                        heroGlow.style.transform = `translate(${x}px, ${y}px)`;
                    }
                    if (phoneWrapper) {
                        phoneWrapper.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                    }
                    ticking = false;
                });
            },
            { passive: true }
        );
    }

    // ----------------------------------------------------------------
    // Carousel — pause on hover (CSS handles animation, JS helps a11y)
    // ----------------------------------------------------------------
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }

    // ----------------------------------------------------------------
    // Mobile menu toggle (future-proof)
    // ----------------------------------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.querySelector('.nav-links')?.classList.toggle('active');
        });
    }

    console.log('%c🔮 NumLuck', 'color:#D4AF37;font-size:16px;font-weight:700;', 'landing page loaded');
})();
