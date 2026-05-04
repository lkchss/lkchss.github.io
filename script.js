// Book reviews
const books = [
  {
    title: "Pachinko",
    author: "Min Jin Lee",
    date: "February 2026",
    review: ""
  }
];

function populateBooks() {
  const container = document.getElementById('books-container');
  if (books.length === 0) {
    container.innerHTML = '<p>No book reviews yet.</p>';
    return;
  }
  container.innerHTML = books.map((book, idx) => `
    <div class="book-item" data-index="${idx}">
      <h3>${book.title}</h3>
      <p class="book-meta">by ${book.author} — ${book.date}</p>
    </div>
  `).join('');

  document.querySelectorAll('.book-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.index);
      openBookModal(idx);
    });
  });
}

function openBookModal(idx) {
  const book = books[idx];
  document.getElementById('book-title').textContent = book.title;
  document.getElementById('book-author').textContent = `by ${book.author} — ${book.date}`;
  document.getElementById('book-review').innerHTML = book.review;
  document.getElementById('book-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeBookModal() {
  document.getElementById('book-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Initialize books on page load
window.addEventListener('load', () => {
  populateBooks();

  const closeBtn = document.querySelector('.book-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeBookModal);

  const modal = document.getElementById('book-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'book-modal') closeBookModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const bookModal = document.getElementById('book-modal');
      if (bookModal && !bookModal.classList.contains('hidden')) {
        closeBookModal();
      }
    }
  });
});

// Photo entries with descriptions
const photoEntries = {
  1: {
    title: 'London, England',
    date: 'February 2026',
    description: 'ft. another Fiat and the king of North London',
    photos: ['IMG_0617.JPG', 'IMG_0618.JPG', 'IMG_0623.JPG', 'IMG_0613.JPG']
  },
  2: {
    title: 'Paris, France',
    date: 'February 2026',
    description: 'France through Fiats',
    photos: ['IMG_0582.JPG', 'IMG_0496.JPG', 'IMG_0586.JPG', 'IMG_0471.JPG']
  },
  3: {
    title: 'Washington, D.C.',
    date: 'January 2026',
    description: 'State of emergency?',
    photos: ['IMG_0443.JPG', 'IMG_0448.JPG']
  },
  4: {
    title: 'San Francisco, CA',
    date: 'December 2025',
    description: 'My favorite place in the world.',
    photos: ['IMG_0406.JPG', 'IMG_0409.JPG']
  },
  5: {
    title: 'Seattle, WA',
    date: 'November 2025',
    description: 'A clear view of Rainer in the winter isn\'t too common. Go Hawks!',
    photos: ['IMG_0385.JPG']
  },
  6: {
    title: 'Virginia Beach, VA',
    date: 'September 2025',
    description: 'Saw the Blue Angels perform.',
    photos: ['IMG_0348.JPG']
  },
  7: {
    title: 'Manhattan, New York City, NY',
    date: 'July 2025',
    description: 'First time in the big apple. Met expectations—its expensive for a reason.',
    photos: ['IMG_0271.JPG', 'IMG_0285.JPG', 'IMG_0291.JPG', 'IMG_0304.JPG']
  },
  8: {
    title: 'San Pancho, Nayarit, Mexico',
    date: 'March 2025',
    description: 'I love Mexico, I love tacos de camaron, I love beaches, I love the sun...',
    photos: ['IMG_0950.jpg']
  },
  9: {
    title: 'Seattle, Washington',
    date: 'January 2025',
    description: '',
    photos: ['seattle0125.jpg']
  },
  10: {
    title: 'Seattle, Washington',
    date: 'January 2024',
    description: '',
    photos: ['seattle0124.jpg']
  },
  11: {
    title: 'Seattle, Washington',
    date: 'November 2023',
    description: '',
    photos: ['seattle1123.jpg']
  },
  12: {
    title: 'Honolulu, Hawaii',
    date: 'September 2023',
    description: '',
    photos: ['honolulu,hi0923.jpg']
  }
};

let currentEntry = 1;
let currentPhotoIndex = 0;

// Navigation helper function
function navigateToSection(sectionId) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`[href="#${sectionId}"]`);
  if (activeLink) activeLink.classList.add('active');

  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const section = document.getElementById(sectionId);
  if (section) section.classList.remove('hidden');
}

// Handle initial hash on page load
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    navigateToSection(hash);
  } else {
    navigateToSection('home');
  }
});

// Handle hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    navigateToSection(hash);
  }
});

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const target = link.getAttribute('href').substring(1);
    window.location.hash = target;
    navigateToSection(target);
  });
});


// Photo item click - open lightbox
document.querySelectorAll('.photo-item').forEach(item => {
  item.addEventListener('click', () => {
    currentEntry = parseInt(item.dataset.entry);
    currentPhotoIndex = parseInt(item.dataset.index);
    openLightbox();
  });
});

// Lightbox functions
function openLightbox() {
  const entry = photoEntries[currentEntry];
  const photo = entry.photos[currentPhotoIndex];
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');

  // Preload image and show when ready
  const tempImg = new Image();
  tempImg.onload = () => {
    img.src = `images/${photo}`;
    document.getElementById('lightbox-date').textContent = `${entry.title} — ${entry.date}`;
    document.getElementById('lightbox-entry').textContent = entry.description;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  tempImg.src = `images/${photo}`;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Lightbox controls
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
});

document.getElementById('prev-btn').addEventListener('click', () => {
  const photos = photoEntries[currentEntry].photos;
  if (currentPhotoIndex > 0) {
    currentPhotoIndex--;
  } else if (currentEntry > 1) {
    currentEntry--;
    currentPhotoIndex = photoEntries[currentEntry].photos.length - 1;
  }
  openLightbox();
});

document.getElementById('next-btn').addEventListener('click', () => {
  const photos = photoEntries[currentEntry].photos;
  if (currentPhotoIndex < photos.length - 1) {
    currentPhotoIndex++;
  } else if (currentEntry < 8) {
    currentEntry++;
    currentPhotoIndex = 0;
  }
  openLightbox();
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Experience expandable items
document.querySelectorAll('.experience-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;

    // Close other open items
    document.querySelectorAll('.experience-content').forEach(c => {
      if (c !== content) {
        c.classList.add('hidden');
        c.previousElementSibling.classList.remove('open');
      }
    });

    // Toggle current item
    header.classList.toggle('open');
    content.classList.toggle('hidden');
  });
});

// Nested experience details toggle
document.querySelectorAll('.experience-details-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = toggle.closest('.experience-item');
    const detailsContent = item.querySelector('.experience-details-content');
    toggle.classList.toggle('open');
    if (detailsContent) detailsContent.classList.toggle('hidden');
  });
});

// Calculate months for experience
function calculateMonths(startStr, endStr) {
  const monthMap = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  const [startMonth, startYear] = startStr.toLowerCase().split(' ');
  let endMonth = new Date().getMonth();
  let endYear = new Date().getFullYear();

  if (endStr !== 'Present') {
    const [eMonth, eYear] = endStr.toLowerCase().split(' ');
    endMonth = monthMap[eMonth.substring(0, 3)];
    endYear = parseInt(eYear);
  }

  const sMonth = monthMap[startMonth.substring(0, 3)];
  const sYear = parseInt(startYear);

  let months = (endYear - sYear) * 12 + (endMonth - sMonth);
  return months + 1;
}

document.querySelectorAll('.experience-dates').forEach(dateEl => {
  const start = dateEl.dataset.start;
  const end = dateEl.dataset.end;
  if (start && end) {
    const months = calculateMonths(start, end);
    const durationEl = dateEl.querySelector('.experience-duration');
    durationEl.textContent = `• ${months}mo`;
  }
});
