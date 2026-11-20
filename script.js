
(function () {
  var target = new Date(2027, 3, 17, 10, 0, 0).getTime();
  var box = document.getElementById('count');

  function tick() {
    var remaining = target - Date.now();

    if (remaining <= 0) {
      box.innerHTML = '<div><b>♥</b><span>Evviva!</span></div>';
      return;
    }

    var seconds = Math.floor(remaining / 1000);
    var values = [
      ['giorni', Math.floor(seconds / 86400)],
      ['ore', Math.floor((seconds % 86400) / 3600)],
      ['min', Math.floor((seconds % 3600) / 60)],
      ['sec', seconds % 60],
    ];

    box.innerHTML = values
      .map(function (value) {
        return '<div><b>' + value[1] + '</b><span>' + value[0] + '</span></div>';
      })
      .join('');
  }

  tick();
  setInterval(tick, 1000);

  var message = encodeURIComponent(
    'Ciao! Confermo la presenza al vostro matrimonio del 17 aprile 2027.\n' +
      'Numero di persone (adulti/bambini): \n' +
      'Allergie o intolleranze: \n' +
      'Interessati al pernottamento: '
  );
  var rsvpEmanuele = document.getElementById('rsvpE');
  var rsvpVanessa = document.getElementById('rsvpV');
  rsvpEmanuele.href = 'https://wa.me/393661879071?text=' + message;
  rsvpVanessa.href = 'https://wa.me/393454228276?text=' + message;
  rsvpEmanuele.target = rsvpVanessa.target = '_blank';
  rsvpEmanuele.rel = rsvpVanessa.rel = 'noopener';

  var copyButton = document.getElementById('copy');
  copyButton.addEventListener('click', function () {
    var iban = document.getElementById('iban').textContent;

    function showCopied() {
      copyButton.textContent = 'Copiato ✓';
      setTimeout(function () {
        copyButton.textContent = 'Copia';
      }, 2000);
    }

    function fallbackCopy() {
      var range = document.createRange();
      range.selectNodeContents(document.getElementById('iban'));
      var selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      if (document.execCommand('copy')) {
        showCopied();
      } else {
        copyButton.textContent = 'Copia manualmente';
        setTimeout(function () {
          copyButton.textContent = 'Copia';
        }, 3000);
      }
    }

    try {
      navigator.clipboard.writeText(iban).then(showCopied, fallbackCopy);
    } catch (error) {
      fallbackCopy();
    }
  });

  var photos = {
    arun: {
      src: 'assets/photos/arun.jpg',
      p: 'Bangkok',
      t: 'Wat Arun, il tempio dell’alba',
      pos: '50% 15%',
    },
    float: {
      src: 'assets/photos/float.jpg',
      p: 'Bangkok',
      t: 'il mercato galleggiante',
      pos: '50% 50%',
    },
    rail: {
      src: 'assets/photos/rail.jpg',
      p: 'Bangkok',
      t: 'il mercato sui binari',
      pos: '50% 62%',
    },
    ayu: {
      src: 'assets/photos/ayu.jpg',
      p: 'Ayutthaya',
      t: 'le antiche rovine dei templi',
      pos: '50% 45%',
    },
    white: {
      src: 'assets/photos/white.jpg',
      p: 'Chiang Rai',
      t: 'il Tempio Bianco',
      pos: '50% 40%',
    },
    blue: {
      src: 'assets/photos/blue.jpg',
      p: 'Chiang Rai',
      t: 'il Tempio Blu',
      pos: '50% 55%',
    },
    tea: {
      src: 'assets/photos/tea.jpg',
      p: 'Chiang Rai',
      t: 'le piantagioni di tè',
      pos: '50% 55%',
    },
    eleph: {
      src: 'assets/photos/eleph.jpg',
      p: 'Chiang Mai',
      t: 'spa di fango con gli elefanti',
      pos: '50% 50%',
    },
    lake: {
      src: 'assets/photos/lake.jpg',
      p: 'Khao Sok',
      t: 'il lago tra le rocce calcaree',
      pos: '50% 55%',
    },
    phuket: {
      src: 'assets/photos/phuket.jpg',
      p: 'Phuket',
      t: 'spiagge e acque cristalline',
      pos: '50% 55%',
    },
  };
  var photoSets = {
    bkk: ['arun', 'float', 'rail', 'ayu'],
    rai: ['white', 'blue', 'tea'],
    mai: ['eleph'],
    kao: ['lake'],
    phu: ['phuket'],
  };

  var dialog = document.getElementById('photo-dialog');
  var dialogImage = document.getElementById('photo-dialog-image');
  var dialogCaption = document.getElementById('photo-dialog-caption');
  var polaroid = document.getElementById('polaroid');
  var photoNav = document.getElementById('photo-nav');
  var photoCount = document.getElementById('ph-count');
  var currentPhotos = [];
  var currentPhotoIndex = 0;

  function showPhoto() {
    var photo = photos[currentPhotos[currentPhotoIndex]];
    var place = document.createElement('strong');
    var caption = document.createElement('span');

    dialogImage.src = photo.src;
    dialogImage.alt = 'Foto: ' + photo.p + ', ' + photo.t;
    dialogImage.style.objectPosition = photo.pos;
    place.textContent = photo.p;
    caption.textContent = photo.t;
    dialogCaption.textContent = '';
    dialogCaption.appendChild(place);
    dialogCaption.appendChild(caption);
    photoNav.hidden = currentPhotos.length < 2;
    photoCount.textContent = currentPhotoIndex + 1 + ' / ' + currentPhotos.length;
    polaroid.style.setProperty('--tilt', currentPhotoIndex % 2 ? '1.5deg' : '-1.6deg');
    polaroid.style.animation = 'none';
    void polaroid.offsetWidth;
    polaroid.style.animation = '';
  }

  function stepPhoto(direction) {
    currentPhotoIndex =
      (currentPhotoIndex + direction + currentPhotos.length) % currentPhotos.length;
    showPhoto();
  }

  var mapObject = document.getElementById('itinerary-map');
  var mapInitialized = false;

  function fitLabels(mapDocument) {
    mapDocument.querySelectorAll('.lbl').forEach(function (label) {
      var text = label.querySelector('text');
      var rect = label.querySelector('rect');
      var width = text.getComputedTextLength() + 34;
      rect.setAttribute('width', width);
      rect.setAttribute('x', -width / 2);
    });
  }

  function setupMap() {
    var mapDocument = mapObject.contentDocument;

    if (!mapDocument || mapInitialized) {
      return;
    }
    if (mapDocument.documentElement.namespaceURI !== 'http://www.w3.org/2000/svg') {
      console.error('The itinerary map could not be loaded as SVG.');
      return;
    }

    mapInitialized = true;
    mapDocument.querySelectorAll('.stop[data-set]').forEach(function (stop) {
      function openStop() {
        currentPhotos = photoSets[stop.getAttribute('data-set')];
        currentPhotoIndex = 0;
        showPhoto();
        dialog.showModal();
      }

      stop.addEventListener('click', openStop);
      stop.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openStop();
        }
      });
    });

    fitLabels(mapDocument);
    if (mapDocument.fonts && mapDocument.fonts.ready) {
      mapDocument.fonts.ready.then(function () {
        fitLabels(mapDocument);
      });
    }
  }

  mapObject.addEventListener('load', setupMap);
  mapObject.addEventListener('error', function () {
    console.error('The itinerary map failed to load.');
  });
  if (
    mapObject.contentDocument &&
    mapObject.contentDocument.documentElement.namespaceURI === 'http://www.w3.org/2000/svg'
  ) {
    setupMap();
  }

  document.getElementById('photo-close').addEventListener('click', function (event) {
    event.stopPropagation();
    dialog.close();
  });
  document.getElementById('ph-prev').addEventListener('click', function () {
    stepPhoto(-1);
  });
  document.getElementById('ph-next').addEventListener('click', function () {
    stepPhoto(1);
  });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      stepPhoto(-1);
    }
    if (event.key === 'ArrowRight') {
      stepPhoto(1);
    }
  });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  var touchStartX = null;
  polaroid.addEventListener(
    'touchstart',
    function (event) {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );
  polaroid.addEventListener('touchend', function (event) {
    if (touchStartX === null || currentPhotos.length < 2) {
      return;
    }

    var distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 45) {
      stepPhoto(distance < 0 ? 1 : -1);
    }
  });

  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('in');
    });
  }
})();
