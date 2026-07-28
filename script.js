// ==========================================
// 1. PAROL TEKSHIRISH VA INTRO AMALLARI
// ==========================================
function checkCode() {
    let input = document.getElementById('passCode').value.trim().toLowerCase();
    let errorMsg = document.getElementById('errorMsg');
    let lockCard = document.querySelector('.lock-card');

    if (input === "abdulhodiy and robiya love" || input === "1234" || input === "") {
        let lockScreen = document.getElementById('lockScreen');
        lockScreen.style.opacity = '0';
        
        setTimeout(() => {
            lockScreen.style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
            startAudio();
            initSlideshow();
            
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }
        }, 800);

    } else {
        errorMsg.innerText = "Parolni xato yozding jonginam 💖";
        lockCard.classList.add('shake-card');
        
        setTimeout(() => {
            lockCard.classList.remove('shake-card');
        }, 400);
    }
}

document.getElementById('passCode').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkCode();
});


// ==========================================
// 2. MUSIQA PLAYER
// ==========================================
let audio = document.getElementById('bgMusic');
let vinyl = document.getElementById('vinylRecord');
let playBtn = document.getElementById('playBtn');

function startAudio() {
    audio.play().then(() => {
        vinyl.style.animationPlayState = 'running';
        playBtn.innerText = "⏸";
    }).catch((error) => {
        playBtn.innerText = "▶️";
    });
}

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        vinyl.style.animationPlayState = 'running';
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        vinyl.style.animationPlayState = 'paused';
        playBtn.innerText = "▶️";
    }
}


// ==========================================
// 3. CANVAS & PARTICLES (YULDUZLAR VA KURSOR TRAIL)
// ==========================================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let stars = [];
let mouseHearts = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.alpha += (Math.random() - 0.5) * 0.02;
        if (this.alpha < 0.2) this.alpha = 0.2;
        if (this.alpha > 1) this.alpha = 1;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 120; i++) stars.push(new Star());

window.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.25) {
        mouseHearts.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 12 + 8,
            opacity: 1,
            speedY: Math.random() * 1 + 0.5
        });
    }
});

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => { star.update(); star.draw(); });

    for (let i = mouseHearts.length - 1; i >= 0; i--) {
        let h = mouseHearts[i];
        h.y -= h.speedY;
        h.opacity -= 0.015;

        if (h.opacity <= 0) {
            mouseHearts.splice(i, 1);
        } else {
            ctx.fillStyle = `rgba(255, 77, 109, ${h.opacity})`;
            ctx.font = `${h.size}px serif`;
            ctx.fillText('❤️', h.x, h.y);
        }
    }

    requestAnimationFrame(animateCanvas);
}
animateCanvas();


// ==========================================
// 4. ROMANTIK SLEYDSHOU GALEREYA (6 TA RASM)
// ==========================================
let currentSlideIndex = 0;
let slideInterval;

function initSlideshow() {
    showSlide(currentSlideIndex);
    slideInterval = setInterval(autoSlide, 4500);
}

function showSlide(index) {
    let slides = document.getElementsByClassName("slide-item");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";

    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    slides[currentSlideIndex].style.display = "block";
}

function autoSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function changeSlide(n) {
    clearInterval(slideInterval);
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
    slideInterval = setInterval(autoSlide, 4500);
}


// ==========================================
// 5. LOVE COUNTER (TAYMER)
// ==========================================
const startDate = new Date("2026-03-03T00:00:00");

function updateLoveCounter() {
    const now = new Date();
    const diff = Math.abs(now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }
}
setInterval(updateLoveCounter, 1000);
updateLoveCounter();


// ==========================================
// 6. YURAKLI KONVERT VA SEVGI MAKTUBI
// ==========================================
let isLetterOpened = false;

function openEnvelope() {
    let wrapper = document.getElementById('envelopeWrapper');
    wrapper.classList.add('open');

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ff4d6d', '#ff758f', '#ffffff']
        });
    }

    if (!isLetterOpened) {
        isLetterOpened = true;
        let message = "Siz mening hayotimdagi eng buyuk mo'jizam va qalbimdagi yagona baxtimsiz. Har bir kunim siz bilan nurli va mazmunli. Robiyam, men sizni so'nggi nafasimgacha jonimdan ortiq sevaman! ❤️";
        startTypewriter(message);
    }
}

function startTypewriter(text) {
    let i = 0;
    let target = document.getElementById("typewriterText");
    target.innerHTML = "";

    function typeChar() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, 40);
        }
    }
    typeChar();
}


// ==========================================
// 7. QOCHADIGAN "YO'Q" TUGMASI (10 MARTA)
// ==========================================
let dodgeCount = 0;

function dodgeButton() {
    dodgeCount++;
    let btn = document.getElementById('btnNo');

    if (dodgeCount >= 10) {
        btn.style.display = 'none';
        document.getElementById('forcedMessage').innerText = "Baribir HA ni bosasiz, asalim! 😉❤️";
        document.getElementById('forcedMessage').style.display = 'block';
    } else {
        let x = (Math.random() - 0.5) * 260;
        let y = (Math.random() - 0.5) * 140;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    }
}

// "HA" TUGMASI BOSILGANDA
function acceptProposal() {
    if (typeof confetti === 'function') {
        let duration = 3 * 1000;
        let animationEnd = Date.now() + duration;

        let interval = setInterval(function() {
            let timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            confetti({
                particleCount: 40,
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
            });
        }, 250);
    }

    document.getElementById('finalHeartModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('finalHeartModal').style.display = 'none';
}
