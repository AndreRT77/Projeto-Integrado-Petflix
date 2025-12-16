document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const menuLateral = document.getElementById('menu-lateral');
    const closeMenu = document.querySelector('.close-menu');
    const filtroBtn = document.getElementById('filtro-btn');
    const maisFiltros = document.getElementById('maisFiltros');

    // ===== MENU LATERAL =====
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            menuLateral.classList.add('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            menuLateral.classList.remove('active');
        });
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (menuLateral && menuLateral.classList.contains('active')) {
            if (!menuLateral.contains(e.target) && !menuBtn.contains(e.target)) {
                menuLateral.classList.remove('active');
            }
        }
    });

    // ===== mais filtros =====
    if (filtroBtn) {
        filtroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            maisFiltros.classList.add('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            maisFiltros.classList.remove('active');
        });
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (maisFiltros && maisFiltros.classList.contains('active')) {
            if (!maisFiltros.contains(e.target) && !filtroBtn.contains(e.target)) {
                maisFiltros.classList.remove('active');
            }
        }
    });
});