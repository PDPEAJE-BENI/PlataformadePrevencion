// Animación de fade-in para los botones de redes sociales al cargar
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.social-buttons a');
    buttons.forEach(function(btn, i) {
        btn.style.opacity = '0';
        setTimeout(function() {
            btn.style.opacity = '1';
        }, 200 + i * 120);
    });
});
