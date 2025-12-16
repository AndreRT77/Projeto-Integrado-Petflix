document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const menuLateral = document.getElementById('menu-lateral');
    const closeMenu = document.querySelector('.close-menu');
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
    // Lógica para favoritar o pet
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Impede que outros eventos de clique sejam acionados
            event.preventDefault();
            event.stopPropagation();

            const petName = button.dataset.petName;
            alert(`${petName} foi adicionado à sua lista de interesses!`);

            // Futuramente, aqui você pode adicionar a lógica para salvar o pet
        });
    });
});