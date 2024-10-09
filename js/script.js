
// Código para el menú hamburguesa
document.getElementById('menu-hamburguesa').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
});

// Slider
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

function showSlide(index) {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.getElementById('slider').style.transform = `translateX(${offset}%)`;
}

prev.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

next.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

// Cambia automáticamente cada 5 segundos
setInterval(() => {
    showSlide(currentIndex + 1);
}, 5000);
