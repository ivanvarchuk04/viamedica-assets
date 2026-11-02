/* Via Medica — identify additional option groups in dynamically opened Tilda products */
(function () {
  'use strict';
  if (window.__vmExtraOptionsInstalled) return;
  window.__vmExtraOptionsInstalled = true;

  const CLASS_NAME = 'vm-extra-product-option';
  const NAMES = new Set(['Брюки', 'Добавить лонгслив']);

  function updateOptions() {
    document.querySelectorAll('.t-product__option-variants_buttons').forEach(form => {
      const matches = Array.from(form.querySelectorAll('input[name]'))
        .some(input => NAMES.has(input.name.trim()));
      form.classList.toggle(CLASS_NAME, matches);
    });
  }

  function init() {
    updateOptions();
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        updateOptions();
      });
    });
    observer.observe(document.body, {childList: true, subtree: true});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once: true});
  } else {
    init();
  }
})();
