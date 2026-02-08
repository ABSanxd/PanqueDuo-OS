document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    const bootBar = document.getElementById('boot-bar');
    const bootLog = document.getElementById('boot-log');

    const messages = [
        "Initializing PanqueDuo Kernel...",
        "Checking Heartbeat integrity: OK",
        "Loading Boyi's secret modules...",
        "Connecting to WiFi: 'Amor_Infinito'...",
        "Optimizing Snake Game logic...",
        "Encrypting Terminal secrets...",
        "Setting up neón atmosphere...",
        "Franklin detected. System access: GRANTED."
    ];

    let msgIndex = 0;
    let progress = 0;

    const logInterval = setInterval(() => {
        if (msgIndex < messages.length) {
            const div = document.createElement('div');
            div.textContent = `> ${messages[msgIndex]}`;
            bootLog.appendChild(div);
            msgIndex++;
        }
    }, 400);

    const barInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        bootBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(barInterval);
            clearInterval(logInterval);
            setTimeout(() => {
                bootScreen.style.transition = "opacity 1s ease";
                bootScreen.style.opacity = "0";
                setTimeout(() => bootScreen.remove(), 1000);
            }, 500);
        }
    }, 300);
});

function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    win.style.display = 'block';
    win.style.zIndex = 100;

    const rect = win.getBoundingClientRect();
    win.style.top = (window.innerHeight / 2 - rect.height / 2) + "px";
    win.style.left = (window.innerWidth / 2 - rect.width / 2) + "px";

    if (id === 'win-terminal') {
        setTimeout(() => {
            document.getElementById('terminalInput')?.focus();
        }, 50);
    }
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.style.display = 'none';
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');
    document.getElementById('date').textContent = now.toLocaleDateString('es-ES');
}

function toggleUserMenu() {
    const menu = document.getElementById('user-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

document.getElementById('desktop').addEventListener('click', () => {
    document.getElementById('user-menu').style.display = 'none';
});

setInterval(updateClock, 1000);
updateClock();