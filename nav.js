(function () {
  // Theme toggle
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = (() => { try { return localStorage.getItem('wafpp-adr-theme'); } catch (e) { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const apply = (t) => { root.setAttribute('data-theme', t); };
  apply(stored || (prefersDark ? 'dark' : 'light'));
  if (btn) {
    btn.addEventListener('click', () => {
      const c = root.getAttribute('data-theme');
      const n = !c ? (prefersDark ? 'light' : 'dark') : (c === 'dark' ? 'light' : 'dark');
      apply(n);
      try { localStorage.setItem('wafpp-adr-theme', n); } catch (e) {}
    });
  }

  // Scroll active step into view on mobile
  const stepper = document.querySelector('.progress-stepper');
  const active = stepper && stepper.querySelector('.step.active');
  if (stepper && active) {
    const scroll = () => {
      const stepperRect = stepper.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const offset = activeRect.left - stepperRect.left + activeRect.width / 2 - stepperRect.width / 2;
      stepper.scrollTo({ left: stepper.scrollLeft + offset, behavior: 'instant' });
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scroll();
            observer.disconnect();
          }
        });
      }, { root: stepper, threshold: 0 });
      observer.observe(active);
    } else {
      scroll();
    }
  }
})();
