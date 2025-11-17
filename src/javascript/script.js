$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    // Use requestAnimationFrame to avoid heavy work on every scroll event
    let lastKnownScrollY = $(window).scrollTop();
    let ticking = false;

    function updateActiveSection() {
        const header = $('header');
        const headerHeight = header.outerHeight();
        // use the last known scroll position plus header height so the active state
        // triggers when the section top reaches the bottom of the header
        const scrollPosition = lastKnownScrollY + headerHeight + 10;

        let activeSectionIndex = 0;

        if (lastKnownScrollY <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');

        ticking = false;
    }

    $(window).on('scroll', function () {
        lastKnownScrollY = $(window).scrollTop();
        if (!ticking) {
            window.requestAnimationFrame(updateActiveSection);
            ticking = true;
        }
    });

    // run once to set initial state
    updateActiveSection();

    // quando clicar em um item do menu, rola até o topo da section
    $('.nav-item a').on('click', function (e) {
        e.preventDefault();
        const href = $(this).attr('href');
        if (!href || href.charAt(0) !== '#') return;

        const target = $(href);
        if (!target.length) return;

        const headerHeight = $('header').outerHeight();
        const scrollTo = target.offset().top - headerHeight;

        // animação suave nativa até o topo da section (logo abaixo do header)
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        } else {
            // fallback para navegadores antigos
            $('html, body').animate({ scrollTop: scrollTo }, 300);
        }

        // se o menu móvel estiver aberto, fecha-o
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn').find('i').removeClass('fa-x');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 900,
        distance: '10%'
    });

    ScrollReveal().reveal('#banner', {
        origin: 'rigth',
        duration: 900,
        distance: '10%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
    });
    // animar o título da seção 'menu'
    ScrollReveal().reveal('#menu .section-title', {
        origin: 'top',
        duration: 800,
        distance: '20%'
    });
    const feedbacks = $('.feedback');


    if (!feedbacks.filter('.active').length) {
        $(feedbacks[0]).addClass('active');
    }

    feedbacks.on('click', function() {
        feedbacks.removeClass('active');
        $(this).addClass('active');
    });

     ScrollReveal().reveal('#about .title1', {
        origin: 'top',
        duration: 900,
        distance: '20%'
    });

     ScrollReveal().reveal('#about .title2', {
        origin: 'left',
        duration: 900,
        distance: '20%'
    });

     ScrollReveal().reveal('#about .description2', {
        origin: 'right',
        duration: 900,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonials', {
        origin: 'bottom',
        duration: 1000,
        distance: '30%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1200,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonials_content', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'bottom',
        duration: 800,
        distance: '20%',
        interval: 150
    });
});

