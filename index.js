// ---- GLOBALS ----
const THEME_KEY = "portfolio_theme";

// ---- Loading Animation (Home) ----
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loading-screen')) {
    runLoadingScreen();
  }
  runTransitions();
  runTimelineAnimations();
  runEducationCardsAnim();
  runSkillBarsAnim();
  runProjectCardsAnim();
  runProjectModal();
  runContactForm();
  setupThemeToggle();
  setupNavLinks();
  runTypedTagline();
});

// Loading screen with typing name and particle burst
function runLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingTyping = document.getElementById('loading-typing');
  const burst = document.getElementById('particle-burst');
  const displayName = "Your Name";
  let idx = 0, typingInterval;

  function typeNext() {
    loadingTyping.textContent = displayName.slice(0, idx);
    idx++;
    if (idx <= displayName.length) {
      setTimeout(typeNext, 120);
    } else {
      setTimeout(showBurst, 500);
    }
  }
  typeNext();

  function showBurst() {
    burst.innerHTML = '';
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.position = 'absolute';
      p.style.left = '0'; p.style.top = '0';
      p.style.width = '14px'; p.style.height = '14px';
      p.style.borderRadius = '50%';
      p.style.background = `linear-gradient(90deg, #3b82f6, #a855f7)`;
      p.style.opacity = 1;
      burst.appendChild(p);

      // Animate burst
      const angle = (i / 22) * Math.PI * 2;
      const x = Math.cos(angle) * 100 + 40;
      const y = Math.sin(angle) * 100 + 0;
      setTimeout(() => {
        p.style.transition = 'all 0.7s cubic-bezier(.37,.57,.56,.97)';
        p.style.transform = `translate(${x}px,${y}px) scale(1.2)`;
        p.style.opacity = 0;
      }, 20);
    }
    setTimeout(() => {
      loadingScreen.style.opacity = 0;
      setTimeout(() => loadingScreen.style.display = "none", 600);
    }, 700);
  }
}

// ---- Typed Tagline Animation ----
function runTypedTagline() {
  const taglineElem = document.querySelector('.typed-tagline');
  if (!taglineElem) return;
  const words = ["Student", "Learner", "Innovator"];
  let wordIdx = 0, charIdx = 0, forward = true, delay = 0;

  function typeLoop() {
    let word = words[wordIdx];
    if (forward) {
      charIdx++;
      if (charIdx > word.length) {
        forward = false;
        delay = 20;
      }
    } else {
      charIdx--;
      if (charIdx < 0) {
        forward = true;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 5;
      }
    }
    taglineElem.textContent = "I am a " + word.slice(0, charIdx);
    setTimeout(typeLoop, delay ? delay * 30 : 90);
    delay = 0;
  }
  typeLoop();
}

// ---- Smooth Page Navigation ----
function setupNavLinks() {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      if (link.href && link.target != "_blank") {
        e.preventDefault();
        fadeOutPage(() => {
          window.location.href = link.href;
        });
      }
    });
  });
}

// ---- Fade Page Transition ----
function runTransitions() {
  document.body.style.opacity = 0;
  setTimeout(() => {document.body.style.opacity = 1;}, 80);
}

function fadeOutPage(cb) {
  document.body.style.transition = "opacity 0.5s";
  document.body.style.opacity = 0;
  setTimeout(cb, 500);
}

// ---- Timeline Animation ----
function runTimelineAnimations() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;
  function check() {
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) item.classList.add('visible');
    });
  }
  window.addEventListener('scroll', check);
  check();
}

// ---- Education Cards Anim ----
function runEducationCardsAnim() {
  const cards = document.querySelectorAll('.edu-card');
  if (!cards.length) return;
  function check() {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) card.style.opacity = 1, card.style.transform = 'translateY(0)';
    });
  }
  window.addEventListener('scroll', check);
  check();
}

// ---- Skills Progress Bar Anim ----
function runSkillBarsAnim() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    if (bar.querySelector('.bar-fill')) return;
    let label = bar.getAttribute('data-label');
    let value = bar.getAttribute('data-value');
    let bf = document.createElement('div');
    bf.className = 'bar-fill';
    bf.style.width = '0';
    bar.appendChild(bf);

    let tooltip = document.createElement('span');
    tooltip.className = 'bar-tooltip';
    tooltip.textContent = value+"%";
    bar.appendChild(tooltip);

    setTimeout(() => {
      bf.style.width = value + "%";
    }, 250);

    bar.addEventListener('mousemove', () => {
      tooltip.style.opacity = 1;
    });
    bar.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
    });
  });
}

// ---- Project Cards Animation & Modal ----
function runProjectCardsAnim() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  cards.forEach(card => {
    setTimeout(() => card.classList.add('visible'), 400);
    // Card content
    let title = card.getAttribute('data-title');
    let tools = card.getAttribute('data-tools');
    let desc = card.getAttribute('data-desc');
    let demo = card.getAttribute('data-demo');
    let github = card.getAttribute('data-github');

    let front = document.createElement('div');
    front.className = 'card-face front';
    front.innerHTML = `
      <div class="card-title">${title}</div>
      <div class="card-tools">${tools}</div>
      <div class="card-desc">${desc}</div>
      <div class="card-btns">
        <a href="${demo}" target="_blank" class="card-btn">Live Demo</a>
        <a href="${github}" target="_blank" class="card-btn">GitHub</a>
        <button class="card-btn show-modal-btn">Details</button>
      </div>
    `;
    let back = document.createElement('div');
    back.className = 'card-face back';
    back.innerHTML = `<div class="card-title">${title}</div><div class="card-desc">${desc}</div>`;
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('mouseenter', () => card.classList.add('flipped'));
    card.addEventListener('mouseleave', () => card.classList.remove('flipped'));

    front.querySelector('.show-modal-btn').onclick = () => showProjectModal(title, desc, tools, demo, github);
  });
}

// ---- Modal Popup ----
function runProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };
}

function showProjectModal(title, desc, tools, demo, github) {
  const modal = document.getElementById('project-modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal-tools').textContent = tools;
  document.getElementById('modal-demo').href = demo;
  document.getElementById('modal-github').href = github;
  modal.style.display = "flex";
}

// ---- Contact Form ----
function runContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const msg = document.getElementById('form-msg');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let name = form.name.value.trim();
    let email = form.email.value.trim();
    let message = form.message.value.trim();
    if (!name || !email || !message) {
      msg.textContent = "Please fill all fields!";
      msg.style.color = "#d32f2f";
      return;
    }
    if (!validateEmail(email)) {
      msg.textContent = "Please enter a valid email!";
      msg.style.color = "#d32f2f";
      return;
    }
    msg.textContent = "Message sent! Thank you 🙌";
    msg.style.color = "#32d24f";
    form.reset();
    setTimeout(() => msg.textContent = "", 2800);
  });
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// ---- Dark/Light Mode ----
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }
  btn.onclick = () => {
    let current = document.documentElement.getAttribute('data-theme') || "light";
    setTheme(current === "light" ? "dark" : "light");
  };
  let theme = localStorage.getItem(THEME_KEY) || "light";
  setTheme(theme);
                   }
