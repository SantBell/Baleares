// Función para el botón del Hero
function verMas() {
    window.scrollTo({
        top: document.getElementById('servicios').offsetTop - 70,
        behavior: 'smooth'
    });
}

// Lógica para el Mini Carrusel del Hero
let indexFoto = 0;
const fotos = document.querySelectorAll('.foto-item');
const dots = document.querySelectorAll('.dot');

function cambiarFoto() {
    // Quitar clase active de la foto y dot actual
    fotos[indexFoto].classList.remove('active');
    dots[indexFoto].classList.remove('active');

    // Incrementar índice
    indexFoto++;

    // Reiniciar si llega al final
    if (indexFoto >= fotos.length) {
        indexFoto = 0;
    }

    // Añadir clase active a la nueva foto y dot
    fotos[indexFoto].classList.add('active');
    dots[indexFoto].classList.add('active');
}

// Cambiar foto cada 2 segundos
setInterval(cambiarFoto, 3000);

//Para la Galería
// Lógica para el Modal de Galería (Lightbox)
const modalGaleria = document.getElementById('modalGaleria');
const imagenModal = document.getElementById('imagenModal');
const tituloModal = document.getElementById('tituloImagenModal');
const btnCerrarGaleria = document.querySelector('.cerrar-galeria');

// Seleccionamos todas las imágenes dentro de la clase .contenedor-galeria
const imagenesGaleria = document.querySelectorAll('.contenedor-galeria .foto img');

// Añadir evento clic a cada imagen
imagenesGaleria.forEach(img => {
    img.addEventListener('click', function() {
        // 1. Obtener los datos de la imagen clicada
        const rutaImagen = this.getAttribute('src');
        const tituloImagen = this.getAttribute('data-titulo'); // Obtenemos el título del data-attribute

        // 2. Colocar los datos en el modal
        imagenModal.setAttribute('src', rutaImagen);
        imagenModal.setAttribute('alt', this.getAttribute('alt')); // Copiamos el alt por accesibilidad
        tituloModal.innerText = tituloImagen; // Ponemos el título correspondiente

        // 3. Mostrar el modal con la clase CSS
        modalGaleria.classList.add('mostrar');
        // Bloquear el scroll de la página de fondo
        document.body.style.overflow = 'hidden'; 
    });
});

// Función para cerrar el modal
function cerrarModalGaleria() {
    modalGaleria.classList.remove('mostrar');
    // Reactivar el scroll de la página
    document.body.style.overflow = ''; 
}

// Cerrar al hacer clic en la X
btnCerrarGaleria.addEventListener('click', cerrarModalGaleria);

// Cerrar al hacer clic en el fondo oscuro
modalGaleria.addEventListener('click', function(e) {
    // Si el clic es en el overlay (fondo), no en la imagen o el título, cerrar.
    if (e.target === this) {
        cerrarModalGaleria();
    }
});

// Cerrar al presionar la tecla Esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalGaleria.classList.contains('mostrar')) {
        cerrarModalGaleria();
    }
});

//Para los Testimonios
const track = document.querySelector('.carrusel-track');
const tarjetas = document.querySelectorAll('.testimonio-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let indiceActual = 0;

function actualizarCarrusel() {
    // Calculamos el ancho de una tarjeta en el momento del click
    const anchoTarjeta = tarjetas[0].clientWidth;
    // Movemos el track hacia la izquierda multiplicando el ancho por el índice
    track.style.transform = `translateX(-${indiceActual * anchoTarjeta}px)`;
}

nextBtn.addEventListener('click', () => {
    indiceActual++;
    // Si llegamos al final, volvemos al principio
    if (indiceActual >= tarjetas.length) {
        indiceActual = 0;
    }
    actualizarCarrusel();
});

prevBtn.addEventListener('click', () => {
    indiceActual--;
    // Si estamos al inicio y damos atrás, vamos a la última
    if (indiceActual < 0) {
        indiceActual = tarjetas.length - 1;
    }
    actualizarCarrusel();
});

// Ajustar carrusel si se cambia el tamaño de la ventana
window.addEventListener('resize', actualizarCarrusel);

// Para las preguntas y respuestas
document.querySelectorAll('.faq-pregunta').forEach(boton => {
    boton.addEventListener('click', () => {
        const item = boton.parentElement;
        
        // Cerrar otros items abiertos (opcional)
        document.querySelectorAll('.faq-item').forEach(otroItem => {
            if (otroItem !== item) {
                otroItem.classList.remove('active');
            }
        });

        // Alternar el estado del item actual
        item.classList.toggle('active');
    });
});

// Manejo del formulario
document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores para procesar (puedes enviarlos a una API)
    const datos = {
        padre: document.getElementById('nombrePadre').value,
        hijo: document.getElementById('nombreHijo').value,
        mensaje: document.getElementById('mensaje').value
    };

    console.log("Enviando datos...", datos);

    // Animación de éxito
    const boton = document.querySelector('.btn-enviar');
    boton.innerText = "¡Enviado con éxito! ❤️";
    boton.style.background = "#4CAF50";

    alert(`¡Gracias ${datos.padre}! Hemos recibido tu mensaje sobre ${datos.hijo}. Te contactaremos muy pronto.`);

    // Limpiar formulario después de 2 segundos
    setTimeout(() => {
        this.reset();
        boton.innerText = "Enviar Solicitud ✨";
        boton.style.background = "var(--rosa)";
    }, 3000);
});

//Para whattsapp
setInterval(() => {
    const btn = document.querySelector('.whatsapp-float');
    if (btn) {
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 300);
    }
}, 10000); // Se repite cada 10 segundos

// Lógica del Pop-up Promocional
const modal = document.getElementById('modalPromo');
const btnCerrar = document.querySelector('.cerrar-modal');

// Función para mostrar el modal
function mostrarModal() {
    // Solo mostrar si no se ha cerrado en esta sesión
    if (!sessionStorage.getItem('promoCerrada')) {
        modal.style.display = 'flex';
    }
}

// Ejecutar a los 5 segundos (5000ms)
setTimeout(mostrarModal, 5000);

// Cerrar al hacer clic en la X
btnCerrar.onclick = function() {
    modal.style.display = 'none';
    sessionStorage.setItem('promoCerrada', 'true');
}

// Cerrar al hacer clic fuera del cuadro blanco
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        sessionStorage.setItem('promoCerrada', 'true');
    }
}

// Manejo del formulario de la promo
document.getElementById('formPromo').onsubmit = function(e) {
    e.preventDefault();
    alert('¡Felicidades! Tu código de descuento ha sido enviado a tu correo.');
    modal.style.display = 'none';
    sessionStorage.setItem('promoCerrada', 'true');
};

//Función para la hamburguesa
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-list');

// Función para abrir/cerrar el menú
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active'); // Anima las rayitas a una X
    menuLinks.classList.toggle('active'); // Muestra/Oculta la lista
});

// Opcional: Cerrar el menú automáticamente al hacer clic en un enlace
document.querySelectorAll('.nav-list li a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    });
});