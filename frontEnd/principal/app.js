document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu');
    const menuDropdown = document.querySelector('.menu');

    if (menuIcon && menuDropdown) {
        menuIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Impede que o link <a> recarregue a página
            menuDropdown.classList.toggle('active');
        });
    }
});