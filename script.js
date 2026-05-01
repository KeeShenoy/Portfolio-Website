let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['MERN Stack Developer', 'ML Enthusiast', 'Blockchain Developer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
});

/* ── Skill Bar Animation (triggers when section scrolls into view) ── */
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width') + '%';
            });
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, { threshold: 0.3 });
const skillsSection = document.querySelector('.skills');
if (skillsSection) skillsObserver.observe(skillsSection);

/* ── Contact Form via Formspree (AJAX, no page reload) ── */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                const data = await response.json();
                const errorMsg = data?.errors?.map(e => e.message).join(', ') || 'Something went wrong.';
                formStatus.textContent = '❌ ' + errorMsg;
                formStatus.classList.add('error');
            }
        } catch {
            formStatus.textContent = '❌ Network error. Please try again.';
            formStatus.classList.add('error');
        }

        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    });
}