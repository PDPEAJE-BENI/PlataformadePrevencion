// floating-menu.js
class FloatingMenu {
  constructor() {
    this.menu = document.getElementById('floatingMenu');
    this.menuToggle = document.getElementById('menuToggle');
    this.menuItems = document.getElementById('menuItems');
    this.scrollTop = document.getElementById('scrollTop');
    this.scrollProgress = document.createElement('div');
    
    this.init();
  }
  
  init() {
    this.setupScrollProgress();
    this.setupMenuToggle();
    this.setupScrollTop();
    this.highlightCurrentPage();
    this.setupResponsive();
    
    // Inicialmente colapsado en desktop
    if (window.innerWidth > 768) {
      this.collapseMenu();
    }
  }
  
  setupScrollProgress() {
    this.scrollProgress.className = 'scroll-progress';
    document.body.appendChild(this.scrollProgress);
    
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      this.scrollProgress.style.width = `${scrolled}%`;
    });
  }
  
  setupMenuToggle() {
    this.menuToggle.addEventListener('click', () => {
      this.toggleMenu();
    });
    
    // Cerrar menú al hacer clic fuera (solo en móvil)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          !this.menu.contains(e.target) && 
          !this.menuItems.classList.contains('hidden')) {
        this.collapseMenu();
      }
    });
  }
  
  setupScrollTop() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.scrollTop.classList.add('visible');
      } else {
        this.scrollTop.classList.remove('visible');
      }
    });
    
    this.scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
      }
    });
  }
  
  setupResponsive() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        // Desktop: menú colapsado por defecto
        this.collapseMenu();
      } else {
        // Mobile: expandido por defecto
        this.expandMenu();
      }
    });
  }
  
  toggleMenu() {
    if (this.menu.classList.contains('collapsed')) {
      this.expandMenu();
    } else {
      this.collapseMenu();
    }
  }
  
  expandMenu() {
    this.menu.classList.remove('collapsed');
    this.menuToggle.setAttribute('aria-label', 'Cerrar menú');
  }
  
  collapseMenu() {
    this.menu.classList.add('collapsed');
    this.menuToggle.setAttribute('aria-label', 'Abrir menú');
  }
  
  // Método público para abrir/cerrar desde fuera
  open() {
    this.expandMenu();
  }
  
  close() {
    this.collapseMenu();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new FloatingMenu();
});

// Exponer al global scope si es necesario
window.FloatingMenu = FloatingMenu;