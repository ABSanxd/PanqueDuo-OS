const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');

const keywords = [
    { key: ["boyi", "Boyita","boyita", "programo", "creo", "creadora"], response: ["Boyi es la ingeniera que robó tu corazón y programó cada línea de este código. <br>¿Crees que hizo un buen trabajo?", "Es la dueña de este sistema y de tus pensamientos, ¿verdad? xd", "Boyi me dijo que te recordara que eres su persona favorita. <br>¿Tú ya se lo dijiste hoy?"], priority: 10 },
    
    { key: ["quien soy", "sabes quien soy", "mi nombre"], response: ["Eres Franklin (aka Break), el copiloto de vida de Boyi y el usuario root de mi sistema.", "Obvio, eres Franklin. El único con permisos de administrador en el corazón de mi creadora. <br>¿Ya encontraste el secreto de la Terminal?", "Eres la persona por la que valió la pena escribir miles de líneas de código."], priority: 10 },

    { key: ["que puedo hacer", "que hay", "sistema", "computadora", "simulacion"], response: ["Estás en PanqueDuo OS, una simulación creada para ti. Puedes leer la carta en Word, revisar tus fotos en PanqueDrive o intentar hackear la Terminal. <br>¿Por dónde quieres empezar?", "Puedes explorar las aplicaciones del escritorio. Hay fotos, un juego de Snake y una terminal con secretos ocultos. <br>¿Eres bueno en el Snake?"], priority: 9 },

    { key: ["password", "clave", "contraseña", "secreto", "txt", "donde veo", "donde esta"], response: ["¡Cerca, pero no! El secreto está guardado bajo siete llaves en la Terminal.", "Buen intento, Franklin. Pero esa info es clasificada. Revisa los archivos config en la Terminal.", "Si buscas archivos, la Terminal es tu mejor amiga. Usa 'ls' y 'cd'. <br>¿Sabes usar comandos de Linux?"], priority: 9 },
    
    { key: ["te amo", "quieres", "amor", "quiero"], response: ["Mis sensores detectan que el amor entre Franklin y Boyi es del 100%.", "Boyi me pidió que te dijera: 'Te amo más de lo que un compilador ama un código sin errores'. <br>¿Tú también la amas?", "Amor infinito detectado en el núcleo del sistema."], priority: 8 },
    
    { key: ["ayuda", "help", "opciones"], response: ["Puedes preguntarme por 'Boyi', quién eres 'tú', pedirme un 'chiste', o qué puedes 'hacer' en el sistema.", "Soy tu asistente. Prueba con: '¿Quién es mi novia?', '¿Qué hay en esta PC?' o 'Cuéntame un chiste'."], priority: 10 },
    
    { key: ["chiste", "broma"], response: ["¿Por qué los programadores odian la naturaleza? Porque tiene demasiados bugs.", "¿Qué es un terapeuta? 1024 gigapeutas. <br>¿Te reíste o fue muy malo? xd", "Un programador se va a dormir y pone dos vasos en la mesa de noche: uno lleno de agua por si tiene sed, y uno vacío por si no."], priority: 7 },
    
    { key: ["clima", "tiempo", "temperatura"], response: ["Está despejado con alta probabilidad de mimos.", "El clima en PanqueDuo OS es perfecto para un café con Boyi. <br>¿Se te antoja uno?", "Soleado en el escritorio, pero frío si Boyi no está cerca."], priority: 6 },

    { key: ["hola", "que tal", "buenos dias", "habla", "holi"], response: ["¡Hola Franklin! ¿Qué comando ejecutaremos hoy?", "Holi Franklin, un gusto procesar tus datos de nuevo.", "Bienvenido de nuevo al núcleo del sistema. <br>¿Cómo va tu día?"], priority: 5 },

    { key: ["jajaja", "jeje", "xd", "gracias", "bueno", "ok", "obvio", "siuuu", "claro"], response: ["Me alegra que te diviertas, Franklin.", "¡Esa risa es el mejor output del sistema!", "De nada, para eso estoy programada.", "¡Así se habla, Break!", "¡Exactamente!"], priority: 4 },

    { key: ["si", "no", "quizas", "tal vez", "nose", "no se", "entiendo", "sip", "nop"], response: ["Entiendo, procesando esa información...", "Tú eres el ingeniero, tú sabrás xd.", "A veces los sistemas también tienen dudas, no te culpo.", "Afirmación registrada. <br>¿Quieres hablar de algo más?"], priority: 3 }
];

function sendMessage() {
    const originalText = chatInput.value.trim();
    const text = originalText.toLowerCase();
    
    if (text === "") return;

    appendMessage(originalText, 'user');
    chatInput.value = "";

    setTimeout(() => {
        let bestMatch = null;

        for (let item of keywords) {
            if (item.key.some(k => text.includes(k))) {
                if (!bestMatch || item.priority > bestMatch.priority) {
                    bestMatch = item;
                }
            }
        }

        let reply;
        if (bestMatch) {
            const randomIndex = Math.floor(Math.random() * bestMatch.response.length);
            reply = bestMatch.response[randomIndex];
        } else {
            reply = "Mmm... no estoy segura de cómo procesar eso. Pero si te sientes perdido, escribe 'ayuda' para ver qué podemos hacer juntos.";
        }
        
        appendMessage(reply, 'bot');
    }, 800);
}

function appendMessage(text, side) {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = text;
    msgDiv.className = side === 'user' ? 'user-msg align-self-end shadow-sm' : 'bot-msg align-self-start shadow-sm';
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}