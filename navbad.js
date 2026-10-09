/* =========================================================
   NAVBAR COMPARTIDO
   Carga navbar.html dentro de <div id="navbar-placeholder"></div>
   y activa los menús desplegables.
========================================================= */
(function(){
  "use strict";

  var placeholder = document.getElementById('navbar-placeholder');
  if(!placeholder) return;

  fetch('navbar.html')
    .then(function(response){
      if(!response.ok){ throw new Error('HTTP ' + response.status); }
      return response.text();
    })
    .then(function(html){
      placeholder.outerHTML = html;
      initNavbar();
    })
    .catch(function(error){
      console.error('No se pudo cargar navbar.html:', error);
    });

  function initNavbar(){
    var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));
    var isTouchOrNoHover = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    function closeAll(exceptItem){
      navItems.forEach(function(item){
        if(item !== exceptItem){
          item.classList.remove('open');
          var btn = item.querySelector('.nav-toggle');
          if(btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    function openItem(item){
      item.classList.add('open');
      var btn = item.querySelector('.nav-toggle');
      if(btn) btn.setAttribute('aria-expanded', 'true');
    }

    function closeItem(item){
      item.classList.remove('open');
      var btn = item.querySelector('.nav-toggle');
      if(btn) btn.setAttribute('aria-expanded', 'false');
    }

    navItems.forEach(function(item){
      var toggle = item.querySelector('.nav-toggle');

      toggle.addEventListener('click', function(e){
        e.stopPropagation();
        var willOpen = !item.classList.contains('open');
        closeAll(item);
        if(willOpen){
          openItem(item);
        } else {
          closeItem(item);
        }
      });

      if(!isTouchOrNoHover){
        item.addEventListener('mouseenter', function(){
          closeAll(item);
          openItem(item);
        });
        item.addEventListener('mouseleave', function(){
          closeItem(item);
        });
      }

      item.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
          closeItem(item);
          toggle.focus();
        }
      });
    });

    document.addEventListener('click', function(e){
      if(!e.target.closest('.nav-item')){
        closeAll(null);
      }
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        closeAll(null);
      }
    });
  }
})();