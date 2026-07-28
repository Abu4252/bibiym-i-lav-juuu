// PAROLNI TEKSHIRISH VA MUSIQANI YOQISH
function checkCode() {
    let input = document.getElementById('passCode').value.trim().toLowerCase();
    let errorMsg = document.getElementById('errorMsg');
    let audio = document.getElementById('bgMusic');
    let vinyl = document.getElementById('vinylIcon');
    let playBtn = document.getElementById('playBtn');

    // To'g'ri parol (Kichik va katta harflarga sezgir emas)
    if (input === "abdulhodiy and robiya love" || input === "1234" || input === "") { 
        
        // Parol to'g'ri bo'lsa ekranlarni almashtirish
        document.getElementById('lockScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';

        // MUSIQANI CHALISH (Brauzer blokini yengish)
        audio.play().then(() => {
            vinyl.style.animationPlayState = 'running';
            playBtn.innerHTML = "⏸";
        }).catch(error => {
            console.log("Autoplay cheklovi:", error);
            playBtn.innerHTML = "▶️";
        });

        // Confetti (Gullar sharsharasi) effekti
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Sleydshouni boshlash
        showSlides();

    } else {
        errorMsg.innerText = "Kodni xato kiritdingiz, qaytadan urinib ko'ring! ❤️";
    }
}

// MUSIQANI PAUSA / PLAY QILISH
function toggleAudio() {
    let audio = document.getElementById('bgMusic');
    let vinyl = document.getElementById('vinylIcon');
    let playBtn = document.getElementById('playBtn');

    if (audio.paused) {
        audio.play();
        vinyl.style.animationPlayState = 'running';
        playBtn.innerHTML = "⏸";
    } else {
        audio.pause();
        vinyl.style.animationPlayState = 'paused';
        playBtn.innerHTML = "▶️";
    }
}

// AUTOMATIK SLEYDSHOU
let slideIndex = 0;
let slideTimer;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }    
    
    slides[slideIndex - 1].style.display = "block";  
    
    // Har 4 soniyada avtomatik almashtirish
    clearTimeout(slideTimer);
    slideTimer = setTimeout(showSlides, 4000); 
}

// QO'LDA SLEYDNI ALMASHTIRISH (Tugmalar uchun)
function changeSlide(n) {
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;

    slideIndex += n - 1;
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    if (slideIndex >= slides.length) { slideIndex = 0; }
    
    showSlides();
}

// SEVGI TAYMERI (LOVE COUNTER)
const startDate = new Date("2026-03-03T00:00:00");

function updateCounter() {
    const now = new Date();
    const diff = Math.abs(now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }
}

setInterval(updateCounter, 1000);
updateCounter();
