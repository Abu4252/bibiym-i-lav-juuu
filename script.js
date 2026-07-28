// Maxfiy kalit
const SECRET_CODE = "abdulhodiy and robiya love";

function checkCode() {
    const input = document.getElementById('passCode').value.trim().toLowerCase();
    const errorMsg = document.getElementById('errorMsg');
    
    if(input === SECRET_CODE) {
        document.getElementById('lockScreen').classList.add('hidden');
        document.getElementById('mainContent').style.display = 'block';
        
        initAnimations();
        startMusic();
    } else {
        errorMsg.textContent = "Xato, jonim! 'abdulhodiy and robiya love' deb yoz.";
    }
}

// Yulduzlar generatori
const starsContainer = document.getElementById('starsContainer');
for(let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
    starsContainer.appendChild(star);
}

// Mouse ortidan yurak chiqishi
document.addEventListener('mousemove', (e) => {
    if(Math.random() > 0.3) {
        const heart = document.createElement('div');
        heart.classList.add('cursor-heart');
        heart.innerHTML = '💖';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
});

// Musiqa boshqaruvi
let isPlaying = false;
const music = document.getElementById('bgMusic');
const vinyl = document.getElementById('vinylIcon');
const playBtn = document.getElementById('playPauseBtn');

function startMusic() {
    music.volume = 0.6;
    music.play().then(() => {
        isPlaying = true;
        vinyl.classList.add('playing');
        playBtn.textContent = "Pause ⏸";
    }).catch(e => console.log("Autoplay blocked"));
}

function toggleMusic() {
    if(isPlaying) {
        music.pause();
        vinyl.classList.remove('playing');
        playBtn.textContent = "Play 🎶";
    } else {
        music.play();
        vinyl.classList.add('playing');
        playBtn.textContent = "Pause ⏸";
    }
    isPlaying = !isPlaying;
}

// Vaqt hisoblagichi (03.03.2026 dan boshlab)
setInterval(() => {
    const startDate = new Date("2026-03-03T00:00:00");
    const diff = new Date() - startDate;
    if(diff > 0) {
        document.getElementById('days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById('minutes').textContent = Math.floor((diff / 1000 / 60) % 60);
        document.getElementById('seconds').textContent = Math.floor((diff / 1000) % 60);
    }
}, 1000);

// Scroll paytida sectionlarni chiqarish
function initAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(sec => observer.observe(sec));
}

// "Yo'q" tugmasining qochishi
let noCount = 0;
function moveNo() {
    noCount++;
    const noBtn = document.getElementById('noBtn');
    const text = document.getElementById('noCounterText');
    if(noCount < 15) {
        const x = (Math.random() - 0.5) * 220;
        const y = (Math.random() - 0.5) * 150;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        text.textContent = `Buni bosolmaysan, bibiym! (${noCount}/15)`;
    } else {
        noBtn.style.display = 'none';
        text.textContent = "Baribir faqat 'HA'ni bosishing kerak! 🥰";
    }
}

// "HA" bosilganda feyerverk
function sayYes() {
    document.getElementById('finalBox').style.display = 'block';
    document.getElementById('finalBox').scrollIntoView({ behavior: 'smooth' });
    
    var duration = 4 * 1000;
    var animationEnd = Date.now() + duration;
    var interval = setInterval(function() {
        if (Date.now() > animationEnd) {
            return clearInterval(interval);
        }
        confetti({
            particleCount: 120,
            spread: 180,
            origin: { y: 0.6 }
        });
    }, 250);
}
