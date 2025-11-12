(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobil menü
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', isOpen);
    });
    // Menüden tıklandığında kapat
    nav.addEventListener('click', function(event) {
      const target = event.target;
      if (target && target.tagName === 'A') {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-open');
        }
      }
    });
    window.addEventListener('resize', function() {
      if (window.matchMedia('(min-width: 721px)').matches) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }

  // Alt menü dropdown'ları (mobil uyumlu)
  const dropdowns = document.querySelectorAll('.dropdown');
  if (dropdowns.length) {
    const closeAllDropdowns = () => dropdowns.forEach(dd => dd.classList.remove('open'));

    dropdowns.forEach(function(dropdown) {
      const trigger = dropdown.querySelector('a');
      if (!trigger) return;

      trigger.addEventListener('click', function(e) {
        const isTouchLayout = window.matchMedia('(max-width: 900px)').matches || window.matchMedia('(hover: none)').matches;
        if (!isTouchLayout) return;

        if (!dropdown.classList.contains('open')) {
          e.preventDefault();
          closeAllDropdowns();
          dropdown.classList.add('open');
        }
      });

      dropdown.addEventListener('mouseleave', function() {
        if (window.matchMedia('(min-width: 901px)').matches) {
          dropdown.classList.remove('open');
        }
      });
    });

    document.addEventListener('click', function(e) {
      const isDropdownClick = Array.from(dropdowns).some(dd => dd.contains(e.target));
      if (!isDropdownClick) {
        closeAllDropdowns();
      }
    });
  }

  // Yumuşak kaydırma
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Basit lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-image') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.gallery-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;
        lightboxImg.setAttribute('src', href);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.removeAttribute('src');
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  // i18n: basit dil çevirisi
  const translations = {
    tr: {
      brand: 'KRKT',
      'nav.home': 'Ana Sayfa',
      'nav.features': 'Özellikler',
      'nav.gallery': 'Galeri',
      'nav.contact': 'İletişim',
      'hero.title': 'Hurma Temizleme Makinesi',
      'hero.desc': 'Hijyenik, hızlı ve verimli hurma temizliği için profesyonel çözüm.',
      'hero.ctaPrimary': 'Teklif Al',
      'hero.ctaGallery': 'Galeriyi Gör',
      'hero.imageAlt': 'Hurma temizleme makinesi',
      'hero.specs': '150 kg hurma • 20 dakikada temizlik • 3 aşamalı sistem • Sıfır su kullanımı',
      'features.title': 'Öne Çıkan Özellikler',
      'features.fast.title': 'Hızlı ve Verimli',
      'features.fast.desc': 'Yüksek kapasiteyle kısa sürede maksimum temizlik performansı.',
      'features.durable.title': 'Dayanıklı Tasarım',
      'features.durable.desc': 'Paslanmaz çelik gövde ve endüstriyel bileşenlerle uzun ömür.',
      'features.maintain.title': 'Kolay Bakım',
      'features.maintain.desc': 'Modüler yapı sayesinde hızlı temizlik ve servis kolaylığı.',
      'gallery.title': 'Galeri',
      'gallery.hint': 'Fotoğraflarınızı assets/images klasörüne ekleyin; otomatik galeri için isimleri güncelleyebilirsiniz.',
      'gallery.img1': 'Makine fotoğrafı 1',
      'gallery.img2': 'Makine fotoğrafı 2',
      'gallery.img3': 'Makine fotoğrafı 3',
      'gallery.img4': 'Makine fotoğrafı 4',
      'gallery.img5': 'Makine fotoğrafı 5',
      'gallery.img6': 'Makine fotoğrafı 6',
      'contact.title': 'İletişim',
      'contact.desc': 'Makine hakkında bilgi almak veya teklif talep etmek için iletişime geçin.',
      'contact.labels.phone': 'Telefon:',
      'contact.labels.email': 'E-posta:',
      'contact.labels.address': 'Adres:',
      'contact.quick': 'Hızlı İletişim',
      'contact.buttons.whatsapp': 'WhatsApp',
      'contact.buttons.email': 'E-posta Gönder',
      'contact.buttons.phone': 'Telefon Et',
      'footer.toTop': 'Yukarı dön',
      'lightbox.close': 'Kapat',
      'featureFeeding.title': 'Besleme ve Konveyör',
      'featureFeeding.desc': '150 kg hurma kapasiteli geniş besleme haznesi ile başlayan sistemimiz, paletlerle kolay yükleme imkanı sunar. 20 saniye bekleme sonrası otomatik olarak çalışmaya başlar.',
      'featureFeeding.point1': '150 kg kapasiteli hazne',
      'featureFeeding.point2': 'Otomatik başlatma sistemi',
      'featureFeeding.point3': 'Sürekli ürün akışı',
      'featureFeeding.point4': 'Paslanmaz çelik yapı',
      'featureVibration.title': 'Vibrasyonlu Eleme',
      'featureVibration.desc': 'Elek sistemi ile kaba pisliklerin ayrıştırılması sağlanır. Vibrasyonlu platform sayesinde etkili temizleme gerçekleşir. Güçlü hava üfleme (blower) sistemi ile ince tozlar uzaklaştırılır.',
      'featureVibration.point1': 'Vibrasyonlu elek sistemi',
      'featureVibration.point2': 'Kaba pislik ayırma',
      'featureVibration.point3': 'Güçlü hava üfleme',
      'featureVibration.point4': 'İnce toz temizleme',
      'featureBrushing.title': 'Fırçalama ve UV',
      'featureBrushing.desc': 'Döner fırçalar üzerinden geçen hurmalar parlatılır ve cilalanır. Aynı anda UV ışık teknolojisi ile %99.9 oranında bakteri öldürme işlemi gerçekleştirilir. Su kullanmadan hijyenik temizlik sağlanır.',
      'featureBrushing.point1': 'Döner fırçalama sistemi',
      'featureBrushing.point2': 'Parlatma ve cilalama',
      'featureBrushing.point3': 'UV ışık sterilizasyon',
      'featureBrushing.point4': '%99.9 bakteri öldürme'
    },
    en: {
      brand: 'KRKT',
      'nav.home': 'Home',
      'nav.features': 'Features',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      'hero.title': 'Date Cleaning Machine',
      'hero.desc': 'A professional solution for hygienic, fast and efficient date cleaning.',
      'hero.ctaPrimary': 'Get a Quote',
      'hero.ctaGallery': 'View Gallery',
      'hero.imageAlt': 'Date cleaning machine',
      'hero.specs': '150 kg dates • 20 minutes cleaning • 3-stage system • Zero water usage',
      'features.title': 'Key Features',
      'features.fast.title': 'Fast and Efficient',
      'features.fast.desc': 'High capacity for maximum cleaning performance in a short time.',
      'features.durable.title': 'Durable Design',
      'features.durable.desc': 'Stainless steel body and industrial components for long life.',
      'features.maintain.title': 'Easy Maintenance',
      'features.maintain.desc': 'Modular structure for easy cleaning and service.',
      'gallery.title': 'Gallery',
      'gallery.hint': 'Add your photos to the assets/images folder; update names for the auto gallery if needed.',
      'gallery.img1': 'Machine photo 1',
      'gallery.img2': 'Machine photo 2',
      'gallery.img3': 'Machine photo 3',
      'gallery.img4': 'Machine photo 4',
      'gallery.img5': 'Machine photo 5',
      'gallery.img6': 'Machine photo 6',
      'contact.title': 'Contact',
      'contact.desc': 'Contact us for more info or a quote.',
      'contact.labels.phone': 'Phone:',
      'contact.labels.email': 'Email:',
      'contact.labels.address': 'Address:',
      'contact.quick': 'Quick Contact',
      'contact.buttons.whatsapp': 'WhatsApp',
      'contact.buttons.email': 'Send Email',
      'contact.buttons.phone': 'Call Now',
      'footer.toTop': 'Back to top',
      'lightbox.close': 'Close',
      'featureFeeding.title': 'Feeding & Conveyor',
      'featureFeeding.desc': 'Starting with a 150 kg capacity hopper, our system allows easy loading with pallets. Automatically starts after 20 seconds delay.',
      'featureFeeding.point1': '150 kg capacity hopper',
      'featureFeeding.point2': 'Auto start system',
      'featureFeeding.point3': 'Continuous product flow',
      'featureFeeding.point4': 'Stainless steel construction',
      'featureVibration.title': 'Vibration Screening',
      'featureVibration.desc': 'Separates coarse debris through screen system. Effective cleaning via vibrating platform. Powerful air blower removes fine dust.',
      'featureVibration.point1': 'Vibrating screen system',
      'featureVibration.point2': 'Coarse debris separation',
      'featureVibration.point3': 'Powerful air blower',
      'featureVibration.point4': 'Fine dust removal',
      'featureBrushing.title': 'Brushing & UV',
      'featureBrushing.desc': 'Dates passing through rotating brushes are polished and waxed. UV light technology kills 99.9% of bacteria simultaneously. Hygienic cleaning without water.',
      'featureBrushing.point1': 'Rotating brush system',
      'featureBrushing.point2': 'Polishing and waxing',
      'featureBrushing.point3': 'UV light sterilization',
      'featureBrushing.point4': '99.9% bacteria elimination'
    }
  };

  const langToggleBtn = document.getElementById('lang-toggle');
  const defaultLang = 'tr';
  const storedLang = localStorage.getItem('lang') || defaultLang;

  function applyI18n(lang) {
    const dict = translations[lang] || translations[defaultLang];
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function(el) {
      const mappings = el.getAttribute('data-i18n-attr');
      if (!mappings) return;
      mappings.split(',').forEach(function(mapStr) {
        const parts = mapStr.split(':');
        if (parts.length !== 2) return;
        const attr = parts[0].trim();
        const key = parts[1].trim();
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });
    document.documentElement.setAttribute('lang', lang);
    if (langToggleBtn) langToggleBtn.textContent = lang.toUpperCase();
  }

  applyI18n(storedLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('lang') || defaultLang;
      const next = current === 'tr' ? 'en' : 'tr';
      localStorage.setItem('lang', next);
      applyI18n(next);
    });
  }
})();


