// Unified menu toggle: toggles 'visible' class on #menu-contenido for small screens
window.toggleMenu = function () {
    var menu = document.getElementById('menu-contenido');
    if (!menu) return;
    if (window.innerWidth <= 600) {
        menu.classList.toggle('visible');
    }
};

// Close menu when clicking outside (only on small screens)
window.addEventListener('click', function (event) {
    var menu = document.getElementById('menu-contenido');
    var boton = document.getElementById('menu-boton');
    if (window.innerWidth <= 600 && menu && boton) {
        if (!menu.contains(event.target) && !boton.contains(event.target)) {
            menu.classList.remove('visible');
        }
    }
});
