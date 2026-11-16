/* ===== Clients marquee: touch pause ===== */
/* ==========================================================
   Touch / pointer pause helper.
   Hover + keyboard pause are handled entirely in CSS.
   ========================================================== */
(() => {
  'use strict';

  const init = () => {
    document
      .querySelectorAll('[data-dg-clients-marquee]')
      .forEach((marquee) => {
        if (marquee.dataset.dgClientsReady === '1') return;
        marquee.dataset.dgClientsReady = '1';

        const pause = () => marquee.classList.add('is-paused');
        const resume = () => marquee.classList.remove('is-paused');

        marquee.addEventListener('pointerdown', pause, { passive: true });
        marquee.addEventListener('pointerup', resume, { passive: true });
        marquee.addEventListener('pointercancel', resume, { passive: true });
        marquee.addEventListener('pointerleave', (event) => {
          if (event.pointerType !== 'mouse') resume();
        }, { passive: true });
      });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('elementor/frontend/init', () => {
    window.setTimeout(init, 60);
  });
})();
