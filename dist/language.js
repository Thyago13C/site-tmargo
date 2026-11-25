(() => {
  const languages = { pt: 'Português', en: 'English', es: 'Español' };
  const labels = { pt: 'Selecionar idioma', en: 'Select language', es: 'Seleccionar idioma' };
  const key = 'tmargo-language';
  const url = new URL(location.href);
  let saved;
  try { saved = localStorage.getItem(key); } catch {}
  const requested = url.searchParams.get('lang') || saved;
  const language = Object.hasOwn(languages, requested) ? requested : 'pt';
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;

  if (language !== 'pt') {
    const column = language === 'en' ? 0 : 1;
    const dictionary = window.tmargoTranslations;
    function translate(text) {
      const source = text.trim();
      return Object.hasOwn(dictionary, source)
        ? text.replace(source, () => dictionary[source][column])
        : text;
    }

    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement.closest('script, style')) node.data = translate(node.data);
    }
    for (const attr of ['aria-label', 'placeholder', 'alt', 'title', 'content']) {
      document.querySelectorAll('[' + attr + ']').forEach(el => {
        el.setAttribute(attr, translate(el.getAttribute(attr)));
      });
    }
  }

  // Keep the language across pages even when the browser blocks storage.
  if (url.searchParams.has('lang')) {
    document.querySelectorAll('a[href="/"], a[href="politica-de-privacidade.html"]').forEach(link => {
      const target = new URL(link.href);
      target.searchParams.set('lang', language);
      link.href = target.href;
    });
  }

  let opened;
  function close(restoreFocus = false) {
    if (!opened) return;
    const trigger = opened.querySelector('.language-trigger');
    opened.querySelector('.language-list').hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    opened = null;
    if (restoreFocus) trigger.focus();
  }

  document.querySelectorAll('.language-picker').forEach((picker, index) => {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'language-trigger';
    trigger.setAttribute('aria-label', labels[language] + ' · ' + languages[language]);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>' +
      language.toUpperCase() + '<svg class="caret" viewBox="0 0 12 12" aria-hidden="true"><path d="m2 4 4 4 4-4"/></svg>';
    const list = document.createElement('div');
    list.className = 'language-list';
    list.hidden = true;
    list.id = 'language-options-' + index;
    trigger.setAttribute('aria-controls', list.id);
    for (const [code, name] of Object.entries(languages)) {
      const option = document.createElement('button');
      option.type = 'button';
      option.lang = code;
      option.textContent = name;
      if (code === language) option.setAttribute('aria-current', 'true');
      option.addEventListener('click', () => {
        close(true);
        if (code === language) return;
        try {
          localStorage.setItem(key, code);
          url.searchParams.delete('lang');
        } catch {
          url.searchParams.set('lang', code);
        }
        history.replaceState(null, '', url);
        location.reload();
      });
      list.append(option);
    }
    trigger.addEventListener('click', () => {
      const wasOpen = opened === picker;
      close();
      if (wasOpen) return;
      opened = picker;
      list.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    });
    picker.append(trigger, list);
  });
  document.addEventListener('click', event => {
    if (opened && !opened.contains(event.target)) close();
  });
  document.addEventListener('focusin', event => {
    if (opened && !opened.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && opened) {
      event.preventDefault();
      close(true);
    }
  });
})();
