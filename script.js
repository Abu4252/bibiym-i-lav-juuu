// --- 1. MAXFIY KODNI TEKSHIRISH ---
const SECRET_CODE = "0303"; // Bibiym bilan bog'liq maxfiy kod

function checkCode() {
    const input = document.getElementById('passCode').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (input === SECRET_CODE) {
        document.getElementById('lockScreen').classList.remove('active');
        document.getElementById('introScreen').classList.add('active');
    } else {
        errorMsg.textContent = "Noto'g'ri kalit, jonim! E'tibor bilan qaytadan urinib ko'r. 🥺";
        // Xato bo'lganda qizil nur tarqatish effekti
        document.getElementById('passCode').style.borderColor = "#ff4757";
        setTimeout(() => {
            document.getElementById('passCode').style.borderColor = "rgba(255, 255, 255, 0.2)";
        }, 1500);
    }
}

// --- 2. SYURPRIZNI BOSHLASH VA MUSIQA ---
function startSurprise() {
    document.getElementById('introScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
    
    // Romantik fon musiqasini yoqish
    const music = document.getElementById('bgMusic');
    music.volume = 0.6; // Ovoz balandligini sozlash
    music.play().catch(error => {
        console.log("Brauzer avtomatik musiqani blokladi, foydalanuvchi harakati talab etiladi:", error);
    });

    // Orqa fonda neon yuraklar yomg'irini boshlash
    startHeartRain();
}

// --- 3. VAQT HISOBLAGICHI (03.03.2026 DAN BOSHLAB) ---
setInterval(() => {
    const startDate = new Date("2026-03-03T00:00:00");
    const now = new Date();
    const diff = now - startDate;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerHTML = `${days} kun • ${hours} soat • ${minutes} daqiqa • ${seconds} soniya`;
        }
    } else {
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerHTML = "Sevgimiz boshlanishiga oz qoldi... 💖";
        }
    }
}, 1000);

// --- 4. XOTIRALAR SLAYD-SHOUSI ---
let currentImg = 0;
const images = document.querySelectorAll('.photo-slider img');

if (images.length > 0) {
    setInterval(() => {
        images[currentImg].classList.remove('active-photo');
        currentImg = (currentImg + 1) % images.length;
        images[currentImg].classList.add('active-photo');
    }, 3500); // Har 3.5 sekundda rasm almashadi
}

// --- 5. "YO'Q" TUGMASINING QOCHISH MANTIQI (20 MARTA) ---
let noClickCount = 0;

function moveNo() {
    noClickCount++;
    const noBtn = document.getElementById('noBtn');
    const counterText = document.getElementById('noCounterText');

    if (noClickCount < 20) {
        // Tasodifiy koordinatalar bo'ylab qochish
        const x = (Math.random() - 0.5) * 260;
        const y = (Math.random() - 0.5) * 260;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        counterText.textContent = `Buni bosolmaysan, bibiym! (${noClickCount}/20)`;
    } else {
        // 20 martadan keyin "Yo'q" tugmasi butunlay yo'qoladi
        noBtn.style.display = 'none';
        counterText.textContent = "Baribir faqat 'HA'ni tanlashing shart edi, chunki sen menikisan! 🥰";
    }
}

// --- 6. "HA" TUGMASI BOSILGANDA (FINAL VA KONFETTI) ---
function sayYes() {
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('finalScreen').classList.add('active');
    
    // Ajoyib mushakbozlik va rang-barang konfettilar
    confetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#ff416c', '#ff4b2b', '#ffffff', '#ffd700', '#ff69b4']
    });

    // Ikkinchi marta konfetti (efektni kuchaytirish uchun)
    setTimeout(() => {
        confetti({
            particleCount: 150,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 150,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });
    }, 400);
}

// --- 7. ORQA FONDAGI DOIMIY YURAKLAR YOG'ILISHI ---
function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Tushish tezligi
        heart.style.fontSize = (Math.random() * 18 + 14) + 'px'; // Har xil o'lchamda
        document.body.appendChild(heart);

        // Xotirani band qilmasligi uchun 5 sekunddan keyin o'chirish
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 250);
}
