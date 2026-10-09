const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => observer.observe(el));

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.getElementById('shareButton').addEventListener('click', async () => {
  const shareData = {
    title: 'सस्नेह निमंत्रण — डोहाळे जेवण व ओटी भरण',
    text: 'डोहाळे जेवण आणि ओटी भरण सोहळ्यास आपले आग्रहाचे निमंत्रण! १८ ऑक्टोबर २०२६, दुपारी ३ वाजता, के. के. लॉन्स अँड हॉल, लाखनी.',
    url: window.location.href
  };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareData.text + '\n' + window.location.href);
      showToast('निमंत्रणाची लिंक कॉपी झाली.');
    } else {
      showToast('ही लिंक कॉपी करून WhatsApp वर पाठवा.');
    }
  } catch (err) {
    if (err.name !== 'AbortError') showToast('लिंक कॉपी करून WhatsApp वर शेअर करा.');
  }
});


const musicBtn = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');

const music = new Audio('assets/music.mp3');
music.loop = true;
music.preload = 'auto';
music.volume = 0.65;

musicBtn.addEventListener('click', async () => {
    try {
        if (music.paused) {
            await music.play();

            musicBtn.classList.add('playing');
            musicBtn.setAttribute('aria-pressed', 'true');
            musicLabel.textContent = 'संगीत बंद करा';
        } else {
            music.pause();

            musicBtn.classList.remove('playing');
            musicBtn.setAttribute('aria-pressed', 'false');
            musicLabel.textContent = 'संगीत सुरू करा';
        }
    } catch (error) {
        showToast('संगीत सुरू झाले नाही. पुन्हा प्रयत्न करा.');
        console.error('Music playback error:', error);
    }
});

music.addEventListener('ended', () => {
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-pressed', 'false');
    musicLabel.textContent = 'संगीत सुरू करा';
});
