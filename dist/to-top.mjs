const toTop = document.createElement('button');
toTop.type = 'button';
toTop.className = 'to-top';
toTop.textContent = '↑ To top';
toTop.setAttribute('aria-label', 'To top');
toTop.hidden = true;
document.body.append(toTop);

function update() {
  if (document.activeElement === toTop) return;
  toTop.hidden = window.scrollY < 400;
  if (toTop.hidden) return;
  // Try both bottom corners, and leave controls unobscured if neither is clear.
  const controls = [...document.querySelectorAll('input,textarea,select,button,a,label,summary,[tabindex]')]
    .filter((element) => element !== toTop && element.getClientRects().length);
  for (const left of [false, true]) {
    toTop.classList.toggle('to-top-left', left);
    const box = toTop.getBoundingClientRect();
    const blocked = controls.some((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left < box.right + 8 && rect.right > box.left - 8 &&
        rect.top < box.bottom + 8 && rect.bottom > box.top - 8;
    });
    if (!blocked) return;
  }
  toTop.hidden = true;
}

let queued = false;
function scheduleUpdate() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; update(); });
}
window.addEventListener('scroll', scheduleUpdate, {passive: true});
window.addEventListener('resize', scheduleUpdate);
document.addEventListener('focusin', scheduleUpdate);
document.addEventListener('focusout', scheduleUpdate);
document.addEventListener('input', scheduleUpdate);
toTop.addEventListener('click', () => {
  const heading = document.querySelector('main h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({preventScroll: true});
  }
  window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
});
update();
