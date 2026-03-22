// Configuración
const NUM_FLOWERS = 18; // Aumenta para un campo más denso
const NUM_PETALS_PER_FLOWER = 16;
const NUM_PARTICLES = 30;
const NUM_STARS = 130; // Cantidad de estrellas en el fondo
const NUM_FIREFLIES = 40;

function createDetailedFlower(xPos, yPos, scale, zIndex) {
    const template = document.getElementById('flower-template');
    const flowerClone = template.querySelector('.flower').cloneNode(true);
    
    // 1. Configurar la posición y escala (profundidad)
    flowerClone.style.left = xPos + '%';
    flowerClone.style.bottom = yPos + 'px';
    flowerClone.style.transform = `scale(${scale})`;
    flowerClone.style.zIndex = zIndex;
    
    // Ajustar altura del tallo aleatoriamente
    const stemHeight = Math.random() * 100 + 150; // Entre 150 y 250px
    flowerClone.querySelector('.flower__stem').style.height = stemHeight + 'px';
    
    // 2. Generar pétalos detallados
    const petalsContainer = flowerClone.querySelector('.flower__head');
    for (let i = 0; i < NUM_PETALS_PER_FLOWER; i++) {
        const petal = document.createElement('div');
        petal.className = 'flower__petal';
        
        // Rotar pétalos en círculo
        const angle = (360 / NUM_PETALS_PER_FLOWER) * i;
        petal.style.transform = `rotate(${angle}deg)`;
        
        // Variar ligeramente el color para naturalidad
        if (i % 2 === 0) {
            petal.style.backgroundColor = '#fdd835'; // Un amarillo ligeramente diferente
        }
        
        petalsContainer.appendChild(petal);
    }
    
    // 3. Añadir retardo de animación aleatorio para que no crezcan todas a la vez
    const animationDelay = Math.random() * 3;
    flowerClone.style.animationDelay = animationDelay + 's';
    
    document.getElementById('garden').appendChild(flowerClone);
}

function createField() {
    // Generar flores con profundidad
    for (let i = 0; i < NUM_FLOWERS; i++) {
        const x = Math.random() * 90 + 5; // Entre 5% y 95% del ancho
        
        // Crear capas de profundidad
        let y, scale, zIndex;
        if (i < NUM_FLOWERS * 0.3) { // Capa delantera (más grandes, más abajo)
            y = Math.random() * 20 - 10;
            scale = Math.random() * 0.2 + 0.9; // 0.9 a 1.1
            zIndex = 10;
        } else if (i < NUM_FLOWERS * 0.7) { // Capa media
            y = Math.random() * 30 + 10;
            scale = Math.random() * 0.2 + 0.7; // 0.7 a 0.9
            zIndex = 8;
        } else { // Capa trasera (más pequeñas, más arriba)
            y = Math.random() * 40 + 40;
            scale = Math.random() * 0.2 + 0.5; // 0.5 a 0.7
            zIndex = 6;
        }
        
        createDetailedFlower(x, y, scale, zIndex);
    }
}

// --- Funciones de Fondo (Estrellas y Partículas) ---

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * window.innerHeight / 2 + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    document.getElementById('shooting-stars-container').appendChild(star);
    setTimeout(() => { star.remove(); }, 1500);
}

function createMagicParticle() {
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    
    // Posición aleatoria sobre el jardín
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = Math.random() * 200 + 'px';
    
    // Tamaño y retardo aleatorios
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    document.getElementById('particles-container').appendChild(particle);
}

// Ciclos de generación
function loopStars() {
    setTimeout(() => {
        createShootingStar();
        loopStars();
    }, Math.random() * 3000 + 1000);
}

function createBackgroundStars() {
    // Creamos el contenedor de estrellas y lo añadimos al body
    const starsContainer = document.createElement('div');
    starsContainer.id = 'stars-container';
    document.body.prepend(starsContainer);

    for (let i = 0; i < NUM_STARS; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posición aleatoria en toda la pantalla
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%'; 
        
        // Tamaño aleatorio entre 1px y 2.5px
        const size = Math.random() * 1.5 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Tiempo de parpadeo y retardo aleatorios
        const duration = Math.random() * 3 + 2; // Entre 2 y 5 segundos
        star.style.setProperty('--twinkle-duration', duration + 's');
        star.style.animationDelay = (Math.random() * 5) + 's';
        
        starsContainer.appendChild(star);
    }
}

function createFireflies() {
    const garden = document.getElementById('garden');
    
    for (let i = 0; i < NUM_FIREFLIES; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Posición inicial aleatoria cerca del pasto
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.bottom = (Math.random() * 30) + 'px'; // Solo en la parte baja
        
        // Desfases para que no se muevan ni brillen al mismo tiempo
        const flyDelay = Math.random() * 5;
        const blinkDelay = Math.random() * 3;
        firefly.style.animationDelay = `${flyDelay}s, ${blinkDelay}s`;
        
        garden.appendChild(firefly);
    }
}

// --- CONTROL PRINCIPAL DE LA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const startBtn = document.getElementById('start-btn');
    const bgMusic = document.getElementById('bg-music');
    const closeBtn = document.getElementById('close-letter-btn');
    const loveLetter = document.querySelector('.love-letter');
    const readAgainBtn = document.getElementById('read-again-btn'); // NUEVO BOTÓN

    // 1. Ocultamos la carta al principio
    if (loveLetter) loveLetter.style.display = 'none';

    // 2. Botón de la pantalla de inicio ("Abrir sorpresa")
    if (startBtn && introScreen) {
        startBtn.addEventListener('click', () => {
            
            if (bgMusic) {
                bgMusic.volume = 0.4; 
                bgMusic.play();
            }
            
            introScreen.classList.add('hidden');
            
            // Crear el jardín
            if (typeof createBackgroundStars === 'function') createBackgroundStars();
            createField();
            loopStars();
            if (typeof createFireflies === 'function') createFireflies();
            for (let i = 0; i < NUM_PARTICLES; i++) {
                createMagicParticle();
            }

            if (loveLetter) loveLetter.style.display = 'block';
            
            setTimeout(() => { introScreen.remove(); }, 1500);
        });
    }

    // 3. Botón para CERRAR la carta ("Ver el jardín")
    if (closeBtn && loveLetter) {
        closeBtn.addEventListener('click', () => {
            loveLetter.classList.remove('show-again');
            loveLetter.classList.add('hide-letter');
            
            // Mostrar el botón de "Volver a leer" un segundo después de cerrar la carta
            setTimeout(() => {
                if (readAgainBtn) readAgainBtn.style.display = 'block';
            }, 1000);
        });
    }

    // 4. NUEVO: Botón para VOLVER A LEER la carta
    if (readAgainBtn && loveLetter) {
        readAgainBtn.addEventListener('click', () => {
            // Ocultar el botoncito
            readAgainBtn.style.display = 'none';
            
            // Quitar la clase que oculta la carta
            loveLetter.classList.remove('hide-letter');
            
            // Pequeño truco para reiniciar la animación CSS
            void loveLetter.offsetWidth; 
            
            // Añadir la clase para que aparezca de nuevo
            loveLetter.classList.add('show-again');
        });
    }
});
