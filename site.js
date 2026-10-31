/**
 * Tsheaye Unique Pharmacy - Shared JavaScript & Component Loader
 * Handles dynamic header/footer inclusion, navigation state,
 * real-time Addis Ababa opening hours, and interactive micro-animations.
 */
(function() {
  // Navigation structure
  var PAGES = [
    ['index.html', 'Home'],
    ['medicines.html', 'Medicines'],
    ['services.html', 'Services'],
    ['health-tips.html', 'Health Tips'],
    ['about.html', 'About Us']
  ];

  // Detect current active page
  var curPage = document.body.dataset.page || (function() {
    var path = window.location.pathname.split('/').pop();
    return path || 'index.html';
  })();

  // Built-in fallback templates in case fetch() is blocked under file:/// protocol
  var FALLBACK_TEMPLATES = {
    'header.html':
      '<header class="nav">' +
        '<a class="brand" href="index.html" aria-label="Tsheaye Unique Pharmacy Home"><i></i>Tsheaye</a>' +
        '<nav class="links" aria-label="Main Navigation">' +
          PAGES.map(function(p) {
            return '<a href="' + p[0] + '"' + (p[0] === curPage ? ' aria-current="page"' : '') + '>' + p[1] + '</a>';
          }).join('') +
        '</nav>' +
        '<div class="nav-r">' +
          '<div class="open" id="open" title="Live Pharmacy Status"><b></b><span>Open Now · Bole Rd</span></div>' +
          '<a class="btn" href="contact.html">Contact</a>' +
        '</div>' +
      '</header>' +
      '<nav class="dock" aria-label="Mobile Navigation">' +
        PAGES.slice(0, 4).map(function(p) {
          return '<a href="' + p[0] + '"' + (p[0] === curPage ? ' aria-current="page"' : '') + '>' + p[1].replace('Health ', '') + '</a>';
        }).join('') +
        '<a href="contact.html"' + (curPage === 'contact.html' ? ' aria-current="page"' : '') + '>Contact</a>' +
      '</nav>',

    'footer.html':
      '<footer><div class="wrap">' +
        '<div class="fg">' +
          '<div>' +
            '<a class="brand" href="index.html" style="color:#fff;margin-bottom:16px" aria-label="Tsheaye Unique Pharmacy Home"><i></i>Tsheaye Unique Pharmacy</a>' +
            '<p>Your trusted neighborhood healthcare partner in Addis Ababa. Providing authentic medicines, professional clinical advice, and compassionate care for your whole family.</p>' +
            '<p style="margin-top:12px;color:#fff">Open now · Bole Road, Addis Ababa</p>' +
          '</div>' +
          '<div>' +
            '<h4>Explore</h4>' +
            '<ul>' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="medicines.html">Medicines Catalog</a></li>' +
              '<li><a href="services.html">Healthcare Services</a></li>' +
              '<li><a href="health-tips.html">Health Tips &amp; Guides</a></li>' +
              '<li><a href="about.html">About Us</a></li>' +
              '<li><a href="contact.html">Contact &amp; Location</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Opening hours</h4>' +
            '<ul>' +
              '<li>Monday – Saturday: 8:00 AM – 8:00 PM</li>' +
              '<li>Sunday: 9:00 AM – 5:00 PM</li>' +
              '<li>Holidays: On-call Pharmacist</li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Direct contact</h4>' +
            '<ul>' +
              '<li><a href="tel:+251911086624">Phone: +251 91 108 6624</a></li>' +
              '<li><a href="https://wa.me/251911086624" target="_blank" rel="noopener">WhatsApp Chat</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="disc">' +
          '<p>Educational and informational content only. It does not substitute for personalized medical advice, diagnosis, or treatment by a licensed physician or pharmacist. Always read pack leaflets and consult your healthcare team.</p>' +
          '<p>© <span id="ftr-year">' + new Date().getFullYear() + '</span> TSHEAYE UNIQUE PHARMACY · ALL RIGHTS RESERVED</p>' +
        '</div>' +
      '</div></footer>',

    'banner.html':
      '<div class="band">' +
        '<div>' +
          '<span class="tag" style="color:var(--mint);letter-spacing:0.06em">Personalized Clinical Support</span>' +
          '<h2>Have questions about your medicines or health?</h2>' +
        '</div>' +
        '<div class="acts" style="margin-top:0">' +
          '<a class="btn light" href="contact.html">Talk to our pharmacist →</a>' +
          '<a class="btn" style="background:var(--leaf);color:#fff" href="tel:+251911086624">Call +251 91 108 6624</a>' +
        '</div>' +
      '</div>'
  };

  /**
   * Component Loader: Loads external HTML files with fallback support
   */
  function loadComponent(el, filename, callback) {
    if (!el) return;
    fetch(filename)
      .then(function(res) {
        if (!res.ok) throw new Error('Network error ' + res.status);
        return res.text();
      })
      .then(function(html) {
        el.innerHTML = html;
        if (callback) callback(el);
      })
      .catch(function() {
        // Fallback for file:// CORS restriction
        if (FALLBACK_TEMPLATES[filename]) {
          el.innerHTML = FALLBACK_TEMPLATES[filename];
        }
        if (callback) callback(el);
      });
  }

  /**
   * Updates Active Navigation Links
   */
  function highlightActiveLinks(container) {
    if (!container) return;
    var links = container.querySelectorAll('a[href]');
    links.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === curPage || (curPage === 'index.html' && (href === './' || href === 'index.html'))) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Real-Time Addis Ababa Opening Hours calculation
   */
  function updatePharmacyStatus() {
    try {
      var d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' }));
      var day = d.getDay();
      var hour = d.getHours() + d.getMinutes() / 60;
      var isOpen = (day === 0) ? (hour >= 9 && hour < 17) : (hour >= 8 && hour < 20);
      var statusText = (isOpen ? 'Open Now' : 'Closed') + ' · Bole Rd';

      window.TS_OPEN = isOpen;
      window.TS_DAY = day;

      var openEl = document.getElementById('open');
      if (openEl) {
        var span = openEl.querySelector('span');
        if (span) span.textContent = statusText;
        if (isOpen) {
          openEl.classList.remove('closed');
        } else {
          openEl.classList.add('closed');
        }
      }

      var statusPill = document.getElementById('status');
      if (statusPill) {
        statusPill.textContent = statusText;
      }
    } catch (e) {
      // Fallback
    }
  }

  /**
   * Update Footer Year
   */
  function updateFooterYear(container) {
    var yearEl = (container || document).querySelector('#ftr-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /**
   * Scroll Reveal (Intersection Observer)
   */
  function initScrollReveal() {
    var rvElements = document.querySelectorAll('.rv');
    if (!rvElements.length) return;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      rvElements.forEach(function(el) { io.observe(el); });
    } else {
      rvElements.forEach(function(el) { el.classList.add('in'); });
    }
  }

  /**
   * Interactive Homepage Widgets (Stamp, Capsule, Parallax)
   */
  function initHomeInteractions() {
    // Stamp Toast
    var stamp = document.getElementById('stamp');
    var toast = document.getElementById('toast');
    if (stamp && toast) {
      var tm;
      stamp.onclick = function() {
        toast.classList.add('show');
        clearTimeout(tm);
        tm = setTimeout(function() { toast.classList.remove('show'); }, 3200);
      };
    }

    // Active ingredient capsule toggle
    var cap = document.getElementById('capsule');
    var cmsg = document.getElementById('cmsg');
    if (cap && cmsg) {
      var msgs = [
        'Tap capsule: active ingredient check',
        'Batch verified · Ingredient matches label',
        'Sealed pack · Expiry date checked',
        'Ask our pharmacist about interactions'
      ];
      var mi = 0;
      cap.onclick = function() {
        mi = (mi + 1) % msgs.length;
        cap.classList.toggle('on');
        cmsg.textContent = msgs[mi];
      };
    }

    // Hero photo parallax
    var ph = document.getElementById('photo');
    var fr = document.querySelector('.frame');
    if (ph && fr && !window.matchMedia('(prefers-reduced-motion:reduce)').matches && window.innerWidth > 860) {
      fr.addEventListener('pointermove', function(e) {
        var r = fr.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        ph.style.transform = 'translate(' + (x * -22) + 'px,' + (y * -14) + 'px) scale(1.03)';
      });
      fr.addEventListener('pointerleave', function() {
        ph.style.transform = '';
      });
      ph.style.transition = 'transform .6s ease-out';
    }
  }

  /**
   * Hero Background Slideshow Controller
   * Seamless crossfade transitions, circular arrow navigation,
   * animated countdown timer bars, keyboard & touch accessibility.
   */
  function initHeroSlideshow() {
    var slides = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.slide-dot');
    var prevBtn = document.getElementById('heroPrevBtn');
    var nextBtn = document.getElementById('heroNextBtn');
    var hero = document.getElementById('home');
    if (!slides.length || !dots.length) return;

    var curSlide = 0;
    var timer = null;
    var slideDuration = 5500; // 5.5s per slide for serene pacing

    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      curSlide = index;

      slides.forEach(function(s, i) {
        var isActive = (i === curSlide);
        s.classList.toggle('active', isActive);
      });

      dots.forEach(function(d, i) {
        var isActive = (i === curSlide);
        d.classList.toggle('active', isActive);
        d.setAttribute('aria-selected', isActive ? 'true' : 'false');

        // Reset and trigger linear countdown timer bar
        var fill = d.querySelector('.dot-timer-fill');
        if (fill) {
          fill.style.animation = 'none';
          if (isActive) {
            void fill.offsetWidth; // Force CSS reflow
            fill.style.animation = '';
          }
        }
      });
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(function() {
        showSlide(curSlide + 1);
      }, slideDuration);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Dot button click handlers
    dots.forEach(function(dot) {
      dot.addEventListener('click', function(e) {
        e.preventDefault();
        var targetIndex = parseInt(this.getAttribute('data-slide'), 10);
        if (!isNaN(targetIndex)) {
          showSlide(targetIndex);
          startTimer();
        }
      });
    });

    // Circular arrow navigation buttons (matching user reference)
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSlide(curSlide - 1);
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSlide(curSlide + 1);
        startTimer();
      });
    }

    // Pause on hover or focus for accessibility
    if (hero) {
      hero.addEventListener('mouseenter', stopTimer);
      hero.addEventListener('mouseleave', startTimer);
      hero.addEventListener('focusin', stopTimer);
      hero.addEventListener('focusout', startTimer);

      // Keyboard navigation (Left / Right Arrow keys)
      hero.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          showSlide(curSlide - 1);
          startTimer();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          showSlide(curSlide + 1);
          startTimer();
        }
      });

      // Touch swipe gestures
      var touchStartX = 0;
      var touchEndX = 0;
      hero.addEventListener('touchstart', function(e) {
        if (e.touches && e.touches.length) {
          touchStartX = e.touches[0].clientX;
        }
      }, { passive: true });
      hero.addEventListener('touchend', function(e) {
        if (e.changedTouches && e.changedTouches.length) {
          touchEndX = e.changedTouches[0].clientX;
          var diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 48) {
            if (diff > 0) {
              showSlide(curSlide + 1); // Swipe left -> next
            } else {
              showSlide(curSlide - 1); // Swipe right -> prev
            }
            startTimer();
          }
        }
      }, { passive: true });
    }

    // Initialize first slide and start auto cycle
    showSlide(0);
    startTimer();
  }

  /**
   * 3D Chrono-Health & Medication Matrix Controller (health-tips.html)
   * Handles multi-dimension tab switching, interactive 3D spatial perspective tilt,
   * accessibility ARIA state, and dynamic clinical insight drawer updates.
   */
  function initChronoMatrix() {
    var section = document.getElementById('chrono-matrix');
    if (!section) return;

    var tabs = section.querySelectorAll('.matrix-tab');
    var views = section.querySelectorAll('.matrix-view');
    var stage = document.getElementById('matrixStage');
    var viewport = section.querySelector('.matrix-stage-viewport');
    var insightTitle = document.getElementById('insightTitle');
    var insightText = document.getElementById('insightText');

    // 1. Interactive Dimension Tabs
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var targetId = this.getAttribute('data-tab');
        if (!targetId) return;

        tabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        views.forEach(function(view) {
          var isMatch = view.id === ('view-' + targetId);
          view.classList.toggle('active', isMatch);
        });

        // Trigger default card selection in the newly active view
        var activeView = section.querySelector('.matrix-view.active');
        if (activeView) {
          var firstCard = activeView.querySelector('.chrono-card-3d, .bp-pillar-3d, .bio-step-3d');
          if (firstCard) {
            selectCard(firstCard);
          }
        }
      });
    });

    // 2. Card Selection & Dynamic Insight Drawer
    function selectCard(card) {
      if (!card) return;
      var parent = card.closest('.matrix-view') || section;
      parent.querySelectorAll('.chrono-card-3d, .bp-pillar-3d, .bio-step-3d').forEach(function(c) {
        c.classList.remove('selected');
      });
      card.classList.add('selected');

      var title = card.getAttribute('data-insight-title');
      var text = card.getAttribute('data-insight-text');
      if (insightTitle && title) insightTitle.textContent = title;
      if (insightText && text) insightText.textContent = text;
    }

    var allCards = section.querySelectorAll('.chrono-card-3d, .bp-pillar-3d, .bio-step-3d');
    allCards.forEach(function(card) {
      card.addEventListener('click', function() {
        selectCard(this);
      });
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCard(this);
        }
      });
    });

    // 3. Smooth Physical 3D Perspective Tilt on Desktop
    if (viewport && stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var isHovered = false;
      var currentX = 0, currentY = 0;
      var targetX = 0, targetY = 0;
      var rafId = null;

      function renderTilt() {
        if (!isHovered && Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
          stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
          cancelAnimationFrame(rafId);
          rafId = null;
          return;
        }

        // Dampened spring easing
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        stage.style.transform = 'rotateX(' + currentX.toFixed(2) + 'deg) rotateY(' + currentY.toFixed(2) + 'deg)';
        rafId = requestAnimationFrame(renderTilt);
      }

      viewport.addEventListener('pointermove', function(e) {
        if (window.innerWidth <= 860) return;
        isHovered = true;
        var r = viewport.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;

        // Subtle realistic tilt clamp: max 6 degrees
        targetY = px * 10;
        targetX = -py * 8;

        if (!rafId) {
          rafId = requestAnimationFrame(renderTilt);
        }
      });

      viewport.addEventListener('pointerleave', function() {
        isHovered = false;
        targetX = 0;
        targetY = 0;
        if (!rafId) {
          rafId = requestAnimationFrame(renderTilt);
        }
      });
    }
  }

  /**
   * Sticky Navigation Scroll Elevation
   */
  function initStickyHeader() {
    var hdr = document.getElementById('hdr');
    if (!hdr) return;
    function updateScroll() {
      if (window.scrollY > 15) {
        hdr.classList.add('scrolled');
      } else {
        hdr.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
  }

  // Execute on DOM Ready
  function init() {
    // 1. Process custom data-include elements
    document.querySelectorAll('[data-include]').forEach(function(el) {
      var file = el.getAttribute('data-include');
      loadComponent(el, file, function(container) {
        if (file === 'header.html') {
          highlightActiveLinks(container);
          updatePharmacyStatus();
        } else if (file === 'footer.html') {
          updateFooterYear(container);
        }
      });
    });

    // 2. Process legacy #hdr if not already populated with data-include
    var hdrEl = document.getElementById('hdr');
    if (hdrEl && !hdrEl.hasAttribute('data-include') && !hdrEl.children.length) {
      loadComponent(hdrEl, 'header.html', function(container) {
        highlightActiveLinks(container);
        updatePharmacyStatus();
      });
    }

    // 3. Process legacy #ftr if not already populated with data-include
    var ftrEl = document.getElementById('ftr');
    if (ftrEl && !ftrEl.hasAttribute('data-include') && !ftrEl.children.length) {
      loadComponent(ftrEl, 'footer.html', function(container) {
        updateFooterYear(container);
      });
    }

    // 4. Update status in case header was static or pre-rendered
    updatePharmacyStatus();
    updateFooterYear();

    // 5. Initialize scroll reveal, sticky header and widgets
    initStickyHeader();
    initScrollReveal();
    initHeroSlideshow();
    initHomeInteractions();
    initChronoMatrix();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
