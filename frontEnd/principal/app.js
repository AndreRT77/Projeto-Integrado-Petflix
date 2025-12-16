document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu');
    const closeIcon = document.getElementById('close-menu');
    const menuDropdown = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');

    const openMenu = () => {
        menuDropdown.classList.add('active');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        menuDropdown.classList.remove('active');
        overlay.classList.remove('active');
    };

    if (menuIcon && menuDropdown && overlay && closeIcon) {
        menuIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Impede que o link <a> recarregue a página
            openMenu();
        });
        closeIcon.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); });
        overlay.addEventListener('click', closeMenu);
    }

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