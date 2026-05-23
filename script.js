/* ============================================================
   Rosa's Birthday — script.js
   ============================================================ */

/* ── 1. FALLING PETALS ── */
(function spawnPetals() {
  const container = document.getElementById('petals');
  const emojis = ['🌸', '🌹', '🌺', '✨', '💖', '🌷', '💕', '🎀'];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const left     = Math.random() * 100;
    const delay    = Math.random() * 12;
    const duration = 8 + Math.random() * 10;
    const size     = 0.8 + Math.random() * 1.4;

    el.style.cssText = `
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      font-size: ${size}rem;
    `;
    container.appendChild(el);
  }
})();

/* ── 2. BACKGROUND STARS ── */
(function spawnStars() {
  const container = document.getElementById('stars');
  const count = 60;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'star';

    const x        = Math.random() * 100;
    const y        = Math.random() * 100;
    const delay    = Math.random() * 5;
    const duration = 2 + Math.random() * 4;
    const size     = 2 + Math.random() * 4;

    el.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(el);
  }
})();

/* ── 3. SCROLL REVEAL ── */
(function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger children inside a group
          const delay = (entry.target.dataset.revealIndex || 0) * 120;
          setTimeout(() => entry.target.classList.add('visible'), delay);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  // Assign stagger indices within each parent
  document.querySelectorAll('.gallery, .love-grid').forEach((group) => {
    Array.from(group.querySelectorAll('.reveal')).forEach((el, idx) => {
      el.dataset.revealIndex = idx;
    });
  });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ── 4. LOVE CARD SPARKLE ── */
(function loveCardSparkle() {
  document.querySelectorAll('.love-card').forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        spark.textContent = ['✨', '💖', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)];
        spark.style.cssText = `
          position: fixed;
          left: ${rect.left + Math.random() * rect.width}px;
          top:  ${rect.top  + Math.random() * rect.height}px;
          font-size: ${0.8 + Math.random() * 0.6}rem;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.8s ease, opacity 0.8s ease;
          transform: translateY(0) scale(1);
          opacity: 1;
        `;
        document.body.appendChild(spark);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            spark.style.transform = `translateY(-${40 + Math.random() * 40}px) scale(0.4) rotate(${Math.random() * 60 - 30}deg)`;
            spark.style.opacity = '0';
          });
        });
        setTimeout(() => spark.remove(), 900);
      }
    });
  });
})();

/* ── 5. CONFETTI ── */
function launchConfetti() {
  const colors = [
    '#e8637a', '#f4c542', '#c0385a', '#f7b8c6',
    '#fdeea3', '#3d1a2a', '#ffffff', '#ff6b8a', '#ffd700'
  ];

  function burst(originX, originY) {
    const count = 80;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';

      const color    = colors[Math.floor(Math.random() * colors.length)];
      const x        = originX + (Math.random() - 0.5) * window.innerWidth * 0.9;
      const duration = 1.5 + Math.random() * 2;
      const delay    = Math.random() * 0.5;
      const size     = 6 + Math.random() * 12;

      el.style.cssText = `
        left: ${x}px;
        top: ${originY}px;
        width: ${size}px;
        height: ${size * 0.6}px;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (duration + delay + 0.2) * 1000);
    }
  }

  // Multiple bursts
  burst(window.innerWidth * 0.5, window.innerHeight * 0.3);
  setTimeout(() => burst(window.innerWidth * 0.2, window.innerHeight * 0.4), 300);
  setTimeout(() => burst(window.innerWidth * 0.8, window.innerHeight * 0.4), 500);
  setTimeout(() => burst(window.innerWidth * 0.5, window.innerHeight * 0.5), 800);

  // Emoji burst
  const emojis = ['🎉','🎊','🌹','💖','✨','🥳','🎂','💕'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position: fixed;
        left: ${10 + Math.random() * 80}%;
        top: -40px;
        font-size: ${1.5 + Math.random()}rem;
        pointer-events: none;
        z-index: 9999;
        animation: petalFall ${2 + Math.random() * 2}s linear forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 80);
  }
}

/* ── 6. CURSOR TRAIL ── */
(function cursorTrail() {
  const sparks = ['🌸', '✨', '💕', '🌹'];
  let lastTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 120) return;
    lastTime = now;

    if (Math.random() > 0.5) return; // sparse

    const el = document.createElement('div');
    el.textContent = sparks[Math.floor(Math.random() * sparks.length)];
    el.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top:  ${e.clientY - 10}px;
      font-size: 1rem;
      pointer-events: none;
      z-index: 8888;
      transition: opacity 0.6s ease, transform 0.6s ease;
      transform: translateY(0) scale(1);
      opacity: 0.8;
    `;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = `translateY(-30px) scale(0.3)`;
        el.style.opacity   = '0';
      });
    });
    setTimeout(() => el.remove(), 700);
  });
})();

/* ── 7. TITLE LETTER ANIMATION ── */
(function titleWiggle() {
  const titleName = document.querySelector('.title-name');
  if (!titleName) return;
  const text = titleName.textContent;
  titleName.innerHTML = text.split('').map(
    (ch, i) => `<span style="display:inline-block;animation:letterWiggle 2.5s ${i * 0.15}s ease-in-out infinite">${ch}</span>`
  ).join('');

  const style = document.createElement('style');
  style.textContent = `
    @keyframes letterWiggle {
      0%,100% { transform: translateY(0) rotate(0deg); }
      25%      { transform: translateY(-8px) rotate(-3deg); }
      75%      { transform: translateY(4px) rotate(2deg); }
    }
  `;
  document.head.appendChild(style);
})();
