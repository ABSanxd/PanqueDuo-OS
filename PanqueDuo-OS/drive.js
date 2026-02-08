const driveContent = document.getElementById('drive-content');
const pathLabel = document.getElementById('drive-path');

const securityModal = new bootstrap.Modal(document.getElementById('securityModal'));
const successModal = new bootstrap.Modal(document.getElementById('successModal'));
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));

const folderImages = [
    { name: 'Ayuda.jpg', url: 'assets/ayuda.jpg' },
    { name: 'Programita.jpg', url: 'assets/programita.jpg' },
    { name: 'Super_pro.jpg', url: 'assets/super_pro.jpg' },
    { name: 'Primera_foto.jpg', url: 'assets/primera_foto.jpg' },
    { name: 'Feli.jpeg', url: 'assets/feli.jpeg' },
    { name: 'Incredibolck.jpeg', url: 'assets/incredibolck.jpeg' },
    { name: 'Hodi.jpg', url: 'assets/hodi.jpg' },
    { name: 'Playita.jpeg', url: 'assets/playita.jpeg' }
];

const folderVideos = [
    { name: 'TikToker.mp4', url: 'assets/tiktoker.mp4' },
    { name: 'Kardashain.mp4', url: 'assets/kardashian.mp4' },
    { name: 'Patitas.mp4', url: 'assets/patitas.mp4' }
];

function showHome() {
    pathLabel.textContent = "Mi Unidad /";
    driveContent.innerHTML = `
        <div class="col-4 drive-item" onclick="openFolder('imagenes')">
            <i class="bi bi-images text-info" style="font-size: 3rem;"></i>
            <p class="mt-2 small">Imágenes</p>
        </div>
        <div class="col-4 drive-item" onclick="openFolder('videos')">
            <i class="bi bi-camera-reels-fill text-warning" style="font-size: 3rem;"></i>
            <p class="mt-2 small">Videos</p>
        </div>
        <div class="col-4 drive-item" onclick="openSecret()">
            <i class="bi bi-file-earmark-lock-fill text-danger" style="font-size: 3rem;"></i>
            <p class="mt-2 small">Secretos.txt</p>
        </div>`;
}

function openFolder(type) {
    driveContent.innerHTML = "";
    if (type === 'imagenes') {
        pathLabel.textContent = "Mi Unidad / Imágenes";
        folderImages.forEach(img => {
            driveContent.innerHTML += `
                <div class="col-6 col-md-4 drive-item">
                    <img src="${img.url}" class="img-fluid rounded mb-2 shadow" onerror="this.src='https://placehold.co/150?text=Error'" onclick="openPhoto('${img.url}', '${img.name}')">
                    <p class="x-small" style="font-size:10px">${img.name}</p>
                </div>`;
        });
    } else if (type === 'videos') {
        pathLabel.textContent = "Mi Unidad / Videos";
        folderVideos.forEach(vid => {
            driveContent.innerHTML += `
                <div class="col-6 col-md-4 drive-item" onclick="playVideo('${vid.url}', '${vid.name}')">
                    <i class="bi bi-play-circle-fill text-purple" style="font-size: 3rem;"></i>
                    <p class="mt-2 x-small" style="font-size:10px">${vid.name}</p>
                </div>`;
        });
    }
}

function openPhoto(url, name) {
    document.getElementById('imageViewer').src = url;
    document.getElementById('imageTitle').textContent = name;
    imageModal.show();
}

function playVideo(url, title) {
    const player = document.getElementById('videoPlayer');
    document.getElementById('videoTitleDisplay').textContent = title;
    player.src = url;
    player.load();
    videoModal.show();
    document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => { player.pause(); player.src = ""; }, { once: true });
}

function openSecret() {
    const passInput = document.getElementById('secretPass');
    passInput.value = "";
    passInput.type = "password";
    document.getElementById('toggleIcon').className = "bi bi-eye";
    securityModal.show();
    setTimeout(() => passInput.focus(), 500);
}

function togglePassVisibility() {
    const passInput = document.getElementById('secretPass');
    const icon = document.getElementById('toggleIcon');
    if (passInput.type === "password") {
        passInput.type = "text";
        icon.className = "bi bi-eye-slash";
    } else {
        passInput.type = "password";
        icon.className = "bi bi-eye";
    }
}

function checkSecretPass() {
    const passInput = document.getElementById('secretPass').value;
    if (passInput.toLowerCase() === "panquesito") {
        securityModal.hide();
        document.getElementById('successMessage').textContent = '"Hodi, soy Boyi ... y mi mayor secreto es que debo admitir que me gusta el rosado casi igual que el amarillo :,D ... pero tup me gustas más"';
        successModal.show();
    } else {
        const inputField = document.getElementById('secretPass');
        inputField.classList.add('is-invalid');
        setTimeout(() => inputField.classList.remove('is-invalid'), 1000);
    }
}

showHome();