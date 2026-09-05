// ══════════════════════════════════════════════════════════════
// Kesavan G — Portfolio shared script
// Loaded on every page. Every block below guards for the element(s)
// it needs, so it's safe to include everywhere even though not
// every page has a marquee, a skills grid, a contact form, etc.
// ══════════════════════════════════════════════════════════════

const mainContent = document.getElementById('mainContent');

/* ── Cross-page "float" transition ──
   Instead of a normal instant page load, the incoming page starts
   slightly zoomed/rotated/blurred and eases into focus. When you
   click an internal link, the current page eases out the same way
   before the browser actually navigates — so moving between pages
   feels like one continuous drift rather than a hard reload. */
(function () {
    if (!mainContent) return;

    // Ease the page in on load.
    requestAnimationFrame(() => {
        mainContent.classList.remove('no-anim');
        requestAnimationFrame(() => {
            mainContent.classList.remove('is-transitioning-in');
        });
    });

    let isLeaving = false;

    function isInternalPageLink(link) {
        if (link.target === '_blank') return false;
        const href = link.getAttribute('href');
        if (!href) return false;
        if (href.startsWith('#')) return false;
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        if (/^https?:\/\//i.test(href)) return false;
        return true;
    }

    document.querySelectorAll('a[href]').forEach(link => {
        if (!isInternalPageLink(link)) return;
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            e.preventDefault();
            document.querySelector('.mobile-menu')?.classList.remove('open');

            if (isLeaving) return;
            isLeaving = true;

            mainContent.classList.add('is-transitioning-out');
            mainContent.addEventListener('transitionend', function afterOut() {
                mainContent.removeEventListener('transitionend', afterOut);
                window.location.href = href;
            }, { once: true });

            // Safety net in case transitionend never fires (e.g. reduced motion).
            setTimeout(() => { window.location.href = href; }, 700);
        });
    });
})();

/* ── Scroll reveal (fades sections in as you scroll a page) ── */
(function () {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));
})();

/* ── Active nav link (based on the current page's filename) ── */
(function () {
    const current = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === current || (current === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();

/* ── Config: image arrays & content used by specific pages ── */
const CERT_MARQUEE_IMAGES = [
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123232.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123251.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123301.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123313.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123335.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123346.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123400.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123416.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123428.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123445.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123458.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123511.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123546.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123559.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123616.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123632.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123646.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123701.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123716.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123749.png",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/Screenshot%202026-07-19%20123825.png"
];

const COLLAGE_IMAGES = [
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/1.jpg",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/2.jpg",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/3.jpg",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/4.jpg",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/5.jpg",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/6.jpg",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/7.jpg",
    "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate%20Design/8.jpg"
];

const ASI_LOGO_URL = "https://raw.githubusercontent.com/Kesugovi/Portfolio/refs/heads/main/Certificate/ASI%20logo.jpg";

const SKILL_ICONS = [
    "python", "html5", "css3", "tensorflow", "scikitlearn",
    "pandas", "numpy", "flask", "streamlit", "git",
    "googlegemini", "opencv", "mysql", "canva"
];

const BG_SYMBOLS = [
    "{ }", "[ ]", "( )", "</>", "=>", "&&", "||", "==", "!=", "++",
    "#!/usr", "0x2A", ";", ":", "@", "#", "$", "%", "^", "&", "*",
    "π", "∑", "√", "∞", "λ", "Δ", "∫", "θ",
    "function", "const", "return", "import", "async", "for(;;)", "SELECT *", "print()",
    "01", "10", "⚡", "🛡️", "⚙️", "💫", "🎯", "🧠", "🚀"
];

/* ── Render: certificate marquee (certifications.html only) ── */
(function () {
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (!marqueeTrack) return;
    const buildCards = () => CERT_MARQUEE_IMAGES.map(url => `
        <div class="marquee-card"><img src="${url}" alt="Certificate" loading="lazy"/></div>
    `).join('');
    marqueeTrack.innerHTML = buildCards() + buildCards();
})();

/* ── Render: campus collage + ASI logo (community.html only) ── */
(function () {
    const collageWrap = document.getElementById('collageWrap');
    if (collageWrap) {
        collageWrap.innerHTML = COLLAGE_IMAGES.map(url => `
            <div class="collage-item"><img src="${url}" alt="Certificate design" loading="lazy"/></div>
        `).join('');
    }
    const asiLogoImg = document.getElementById('asiLogoImg');
    if (asiLogoImg) asiLogoImg.src = ASI_LOGO_URL;
})();

/* ── Render: jumping skill icons (skills.html only) ── */
(function () {
    const skillBgIcons = document.getElementById('skillBgIcons');
    if (!skillBgIcons) return;
    skillBgIcons.innerHTML = SKILL_ICONS.map((slug, i) => {
        const top = Math.random() * 80;
        const left = (i / SKILL_ICONS.length) * 95 + (Math.random() * 5);
        const delay = (Math.random() * 3).toFixed(2);
        const duration = (2.6 + Math.random() * 1.6).toFixed(2);
        return `<img src="https://cdn.simpleicons.org/${slug}/ffffff" alt=""
            style="top:${top}%; left:${left}%; animation-delay:${delay}s; animation-duration:${duration}s;" />`;
    }).join('');
})();

/* ── Render: global floating background symbols (every page) ── */
(function () {
    const globalBgSymbols = document.getElementById('globalBgSymbols');
    if (!globalBgSymbols) return;
    const COUNT = 42;
    let html = '';
    for (let i = 0; i < COUNT; i++) {
        const symbol = BG_SYMBOLS[Math.floor(Math.random() * BG_SYMBOLS.length)];
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = 12 + Math.random() * 20;
        const duration = 6 + Math.random() * 10;
        const delay = Math.random() * 6;
        html += `<span style="top:${top}%; left:${left}%; font-size:${size}px; animation-duration:${duration}s; animation-delay:-${delay}s;">${symbol}</span>`;
    }
    globalBgSymbols.innerHTML = html;
})();

/* ── Contact form → Google Sheets (contact.html only) ── */
(function () {
    const form = document.getElementById('client-form');
    const statusDiv = document.getElementById('form-status');
    if (!form || !statusDiv) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const url = form.action;

        statusDiv.textContent = '⏳ Sending...';
        statusDiv.className = 'form-status';

        fetch(url, { method: 'POST', body: formData, mode: 'no-cors' })
            .then(() => {
                statusDiv.textContent = '✅ Inquiry sent successfully! I\'ll get back to you soon.';
                statusDiv.className = 'form-status';
                form.reset();
            })
            .catch(() => {
                statusDiv.textContent = '❌ Oops! Something went wrong. Please try again or email directly.';
                statusDiv.className = 'form-status error';
            });
    });
})();
