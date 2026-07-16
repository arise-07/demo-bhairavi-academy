/* ============================================
   BHAIRAVI ACADEMY — MAIN JAVASCRIPT
   Version 2.0 | Primus Tech Labs
   ============================================ */

/* ---- AOS Init
   ============================================ */
AOS.init({
    duration: 680,
    once: true,
    offset: 50,
    easing: 'ease-out-cubic'
});

/* ---- Navbar Scroll Effect
   ============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Mobile Menu
   ============================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-label', 'Close menu');
}

function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-label', 'Open menu');
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
});

/* ---- Counter Animation
   ============================================ */
var countersAnimated = false;

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = easeOutCubic(progress);
        var value = Math.floor(eased * target);
        el.textContent = value + suffix;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target + suffix;
        }
    }

    requestAnimationFrame(step);
}

var statsSection = document.querySelector('.achievements-section');

if (statsSection) {
    var counterObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !countersAnimated) {
            countersAnimated = true;
            document.querySelectorAll('.stat-num').forEach(function (el) {
                animateCounter(el);
            });
        }
    }, { threshold: 0.3 });

    counterObserver.observe(statsSection);
}

/* ---- Swiper — Testimonials
   ============================================ */
new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 18,
    loop: true,
    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 18
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
});

/* ---- Gallery Lightbox
   ============================================ */
var galleryItems = document.querySelectorAll('.gallery-item');
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    var imgSrc = galleryItems[index].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

function changeLightbox(dir) {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
}

galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
        openLightbox(index);
    });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', function () { changeLightbox(-1); });
document.getElementById('lightboxNext').addEventListener('click', function () { changeLightbox(1); });

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
});

/* ---- WhatsApp Form Submit
   ============================================ */
var submitBtn = document.getElementById('submitBtn');

function submitToWhatsApp() {
    var name = document.getElementById('formName').value.trim();
    var phone = document.getElementById('formPhone').value.trim();
    var course = document.getElementById('formCourse').value;

    if (!name) {
        alert('Please enter your name.');
        document.getElementById('formName').focus();
        return;
    }

    if (!phone) {
        alert('Please enter your phone number.');
        document.getElementById('formPhone').focus();
        return;
    }

    if (!course) {
        alert('Please select a course.');
        document.getElementById('formCourse').focus();
        return;
    }

    var message =
        'Hello Bhairavi Academy!\n\n' +
        'I am interested in enrolling.\n\n' +
        '*Name:* ' + name + '\n' +
        '*Phone:* ' + phone + '\n' +
        '*Course:* ' + course + '\n\n' +
        'Please get in touch with me. Thank you!';

    var url = 'https://wa.me/918056738833?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
}

if (submitBtn) {
    submitBtn.addEventListener('click', submitToWhatsApp);
}