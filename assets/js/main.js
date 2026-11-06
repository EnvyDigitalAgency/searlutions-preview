(function () {
  'use strict';

  // Mobile menu
  var menu = document.querySelector('.bar__menu');
  var nav = document.getElementById('nav');
  if (menu && nav) {
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.lastChild.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('is-open')) menu.click();
    });
  }

  // Tell the form handler which page the enquiry came from
  document.querySelectorAll('input[name="page"]').forEach(function (el) { el.value = location.pathname; });

  var params = new URLSearchParams(location.search);

  // Links like contact.html?need=Trade%20printing preselect the topic
  var need = document.getElementById('need');
  if (need && params.get('need')) {
    var want = params.get('need').toLowerCase();
    Array.prototype.forEach.call(need.options, function (o) {
      if (o.text.toLowerCase() === want) need.value = o.value || o.text;
    });
  }

  // send.php redirects back with ?error= when validation or sending fails
  if (params.has('error')) {
    var err = document.querySelector('.form__error');
    if (err) { err.hidden = false; err.scrollIntoView({ block: 'center' }); }
  }
})();
