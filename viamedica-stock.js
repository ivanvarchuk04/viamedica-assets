
/* Via Medica — stock notification close button */
(() => {
  function installCloseButton() {
    const popup = document.querySelector('.t-popup:has(#form5415009701)');
    const container = popup?.querySelector('.t-popup__container');

    if (!popup || !container) return false;
    if (container.querySelector('.vm-stock-close-custom')) return true;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'vm-stock-close-custom';
    button.setAttribute('aria-label', 'Закрыть окно');

    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      // Закрываем попап без возврата на предыдущую страницу
      popup.classList.remove('t-popup_show');
      popup.style.display = 'none';

      // Возвращаем обычное состояние страницы
      if (!document.querySelector('.t-popup.t-popup_show')) {
        document.body.classList.remove('t-body_popupshowed');
        document.body.classList.remove('t1122__body_popupshowed');
      }
    });

    container.appendChild(button);
    return true;
  }

  function init() {
    installCloseButton();

    window.vmStockFinalObserver?.disconnect();

    window.vmStockFinalObserver = new MutationObserver(() => {
      installCloseButton();
    });

    window.vmStockFinalObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {
      once: true
    });
  } else {
    init();
  }
})();
