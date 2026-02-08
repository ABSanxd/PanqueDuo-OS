const cartaAmor = `Holi, peque Franklin <3

Mi gorito bonito.
Espero que estés disfrutando de PanqueDuo OS. 
Quiero que sepas que eres una persona muy importante para mí. 
Cada cosita que veas fue hecha con muchísimo cariño… y con la ayuda de la poderosa IA, jejeje

Te amo mucho. Me encanta la comunicación que tenemos, la complicidad, 
y todo lo que compartimos. Estar contigo me hace pensar que eso es lo que quiero para mi vida, y me confirma que elegí al mejor de todos.

Te extraño :c
Me gustaría estar contigo a cada rato, jajaja… quizá terminarías aburriéndote de mí xd. Pero aun así, disfruto tanto de tu compañía: de solo mirarte, de saber que estás a mi lado, de sentirte cerca.

Feliz San Valentín 

Atte: Boyi`;

let indexChar = 0;
const speed = 50;

function typeWriter() {
    const container = document.getElementById('word-content');
    if (container && indexChar < cartaAmor.length) {
        container.innerHTML += cartaAmor.charAt(indexChar);
        indexChar++;
        setTimeout(typeWriter, speed);
    }
}

document.addEventListener('dblclick', function(e) {
    if (e.target.closest('[ondblclick*="win-word"]')) {
        const container = document.getElementById('word-content');
        container.innerHTML = ""; 
        indexChar = 0;
        setTimeout(typeWriter, 300);
    }
});