document.addEventListener('DOMContentLoaded', () => {
    // Lógica do Modal de Pedidos
    const verPedidosBtn = document.getElementById('ver-pedidos');
    const fecharPedidosBtn = document.getElementById('fechar-pedidos');
    const requestsOverlay = document.querySelector('.requests-overlay');

    if (verPedidosBtn && fecharPedidosBtn && requestsOverlay) {
        // Abrir o modal
        verPedidosBtn.addEventListener('click', () => {
            requestsOverlay.classList.add('active');
        });

        // Fechar o modal
        const closeModal = () => {
            requestsOverlay.classList.remove('active');
        };

        fecharPedidosBtn.addEventListener('click', closeModal);
        requestsOverlay.addEventListener('click', (event) => {
            // Fecha somente se clicar no fundo (overlay), não no conteúdo do modal
            if (event.target === requestsOverlay) {
                closeModal();
            }
        });
    }

    // Lógica do Menu Hambúrguer
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const menu = document.querySelector('.menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuBtn && closeMenuBtn && menu && menuOverlay) {
        const openMenu = () => {
            menu.classList.add('active');
            menuOverlay.classList.add('active');
        };

        const closeMenu = () => {
            menu.classList.remove('active');
            menuOverlay.classList.remove('active');
        };

        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });

        closeMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });

        menuOverlay.addEventListener('click', closeMenu);
    }
    const menuBt = document.getElementById('menu-bt');
    const menuLateral = document.getElementById('menu-lateral');
    const closeMenu = document.querySelector('.close-menu');
    // ===== MENU LATERAL =====
    if (menuBt) {
        menuBt.addEventListener('click', function(e) {
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
            if (!menuLateral.contains(e.target) && !menuBt.contains(e.target)) {
                menuLateral.classList.remove('active');
            }
        }
    });

    // Lógica para mudar a cor do select de status (opcional, mas melhora a UI)
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            select.className = 'status-select'; // Reseta as classes
            select.classList.add(selectedValue);
        });
    });
});