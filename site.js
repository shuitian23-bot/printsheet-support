// 仅切换显示语言，不使用 Cookie、浏览器存储或远程统计。
(() => {
  const query = new URLSearchParams(location.search);
  const requested = query.get('lang');
  let language = requested === 'zh' || requested === 'en' ? requested : (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');
  const apply = (next, updateURL) => {
    language = next;
    document.documentElement.lang = next === 'zh' ? 'zh-Hans' : 'en';
    document.querySelectorAll('[data-language]').forEach(section => { section.hidden = section.dataset.language !== next; });
    document.querySelectorAll('[data-select-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.selectLanguage === next)); });
    document.querySelectorAll('[data-local-link]').forEach(link => {
      const address = new URL(link.getAttribute('href'), location.href);
      address.searchParams.set('lang', next);
      link.setAttribute('href', address.pathname.split('/').pop() + address.search);
    });
    const title = document.querySelector('main [data-language="' + next + '"] h1');
    if (title) document.title = 'PrintSheet · ' + title.textContent;
    if (updateURL) {
      const address = new URL(location.href);
      address.searchParams.set('lang', next);
      history.replaceState(null, '', address);
    }
  };
  document.querySelectorAll('[data-select-language]').forEach(button => { button.addEventListener('click', () => apply(button.dataset.selectLanguage, true)); });
  apply(language, false);
})();
