document.addEventListener('DOMContentLoaded', () => {
  const mq = window.matchMedia('(max-width: 480px)');

  function initMobileSidebar() {
    if (document.querySelector('.mobile-menu-button')) return;

    const btn = document.createElement('button');
    btn.className = 'mobile-menu-button';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    btn.innerHTML = '&#9776;';

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';

    const nav = document.querySelector('nav');
    if (nav) {
      const navClone = nav.cloneNode(true);
      // klon içindeki mobil butonu veya ID'leri temizle
      navClone.querySelectorAll('.mobile-menu-button').forEach(el => el.remove());
      navClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      sidebar.appendChild(navClone);
    } else {
      sidebar.innerHTML = '<nav><ul><li><a href="#about">About</a></li><li><a href="#features">Features</a></li></ul></nav>';
    }

    document.body.appendChild(overlay);
    document.body.appendChild(sidebar);

    const header = document.querySelector('header') || document.body;
    header.appendChild(btn);

    function toggle() {
      const open = sidebar.classList.toggle('open');
      overlay.classList.toggle('show', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.innerHTML = open ? '&#10005;' : '&#9776;';
    }

    btn.addEventListener('click', toggle);
    overlay.addEventListener('click', toggle);

    sidebar.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.closest('.top-buttons')) toggle();
    });
  }

  function destroyMobileSidebar() {
    document.querySelectorAll('.mobile-menu-button, .overlay, .sidebar').forEach(el => el.remove());
  }

  if (mq.matches) initMobileSidebar(); else destroyMobileSidebar();
  if (mq.addEventListener) {
    mq.addEventListener('change', e => e.matches ? initMobileSidebar() : destroyMobileSidebar());
  } else {
    mq.addListener(e => e.matches ? initMobileSidebar() : destroyMobileSidebar());
  }
});