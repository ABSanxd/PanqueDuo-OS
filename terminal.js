document.addEventListener('DOMContentLoaded', () => {
    const terminalHistory = document.getElementById('terminal-history');
    const terminalInput = document.getElementById('terminalInput');
    const currentPromptPath = document.getElementById('current-prompt-path');

    const filesSystem = {
        'home': {
            'franklin': {
                'documentos': {
                    'leeme.txt': 'Holi Franklin. Si buscas la clave secreta, aca no está xd, está oculta en los archivos de configuración del sistema.',
                    'proyectos': {}
                },
                'config': {
                    '.pass_key.sh': 'Contraseña: panquesito'
                }
            }
        }
    };

    let currentPath = ['home', 'franklin'];

    function getPathString() {
        if (currentPath[0] === 'home' && currentPath[1] === 'franklin') {
            return currentPath.length === 2 ? '' : '/' + currentPath.slice(2).join('/');
        }
        return '/' + currentPath.join('/');
    }

    function printToHistory(text, type = '') {
        const div = document.createElement('div');
        div.classList.add('mb-1');
        
        if (type === 'cmd') {
            div.innerHTML = `<span class="text-purple fw-bold">franklin@break:~${getPathString()}$</span> <span class="text-white">${text}</span>`;
        } else if (type === 'error') {
            div.innerHTML = `<span class="text-danger">bash: ${text}</span>`;
        } else if (type === 'success') {
            div.innerHTML = `<span style="color: #36f9f6;">${text}</span>`;
        } else if (type === 'hack') {
            div.innerHTML = `<span class="text-success" style="font-family: monospace;">${text}</span>`;
        } else {
            div.innerHTML = `<span class="text-secondary">${text}</span>`;
        }
        
        terminalHistory.appendChild(div);
        const container = document.getElementById('terminalContainer');
        container.scrollTop = container.scrollHeight;
        return div;
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function runFakeHack() {
        terminalInput.disabled = true;
        
        const hackSteps = [
            "Iniciando protocolo de intrusión...",
            "Conectando con el servidor central de PanqueDuo...",
            "Bypass de firewall nivel 4: [SUCCESS]",
            "Extrayendo paquetes de datos confidenciales...",
            "Analizando logs de 'Boyi'...",
            "CRITICAL ERROR: Detección de exceso de amor detectado.",
            "Intentando forzar entrada en puerto 1402 (San Valentín)...",
            "...................................... 100%",
            "¡SISTEMA HACKEADO CON ÉXITO!"
        ];

        for (const step of hackSteps) {
            printToHistory(step, 'hack');
            await sleep(600);
        }

        await sleep(1000);
        printToHistory("------------------------------------------");
        printToHistory("BROMITA JAJAJA xd", "success");
        printToHistory("------------------------------------------");
        
        terminalInput.disabled = false;
        terminalInput.focus();
    }

    terminalInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const inputVal = terminalInput.value.trim();
            const args = inputVal.split(/\s+/);
            const cmd = args[0].toLowerCase();

            printToHistory(inputVal, 'cmd');
            terminalInput.value = '';

            if (cmd !== '') {
                const currentDir = getCurrentDir();
                const target = args[1];

                switch (cmd) {
                    case 'help':
                        printToHistory('Comandos: ls, cd [dir], cat [file], clear, whoami, hack', 'success');
                        break;
                    case 'ls':
                        const items = Object.keys(currentDir);
                        printToHistory(items.length === 0 ? 'total 0' : items.join('   '), 'success');
                        break;
                    case 'cd':
                        if (!target || target === '~') {
                            currentPath = ['home', 'franklin'];
                        } else if (target === '..') {
                            if (currentPath.length > 2) currentPath.pop();
                            else printToHistory('Permiso denegado: No puedes salir de /home/franklin', 'error');
                        } else if (currentDir[target] && typeof currentDir[target] === 'object') {
                            currentPath.push(target);
                        } else {
                            printToHistory(`cd: ${target}: No es un directorio`, 'error');
                        }
                        break;
                    case 'cat':
                        if (currentDir[target] && typeof currentDir[target] === 'string') {
                            printToHistory(currentDir[target], 'success');
                        } else {
                            printToHistory(`cat: ${target}: No es un archivo`, 'error');
                        }
                        break;
                    case 'clear':
                        terminalHistory.innerHTML = '';
                        break;
                    case 'whoami':
                        printToHistory('franklin (break-user)');
                        break;
                    case 'hack':
                        await runFakeHack();
                        break;
                    default:
                        printToHistory(`${cmd}: comando no encontrado`, 'error');
                }
            }
            currentPromptPath.textContent = `franklin@break:~${getPathString()}$`;
        }
    });

    function getCurrentDir() {
        let dir = filesSystem;
        for (const p of currentPath) { dir = dir[p]; }
        return dir;
    }

    document.getElementById('terminalContainer').addEventListener('click', () => {
        if(!terminalInput.disabled) terminalInput.focus();
    });
});