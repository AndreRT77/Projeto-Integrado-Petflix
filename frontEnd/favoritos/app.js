/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo java script do favoritos
 * Data:15/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function() {
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
    const mainContainer = document.querySelector('main');

    async function carregarFavoritos() {
        const favoritosIds = JSON.parse(localStorage.getItem('favoritos') || '[]');
        
        if (favoritosIds.length === 0) {
            mostrarMensagemVazia();
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/pet`);
            if (!response.ok) throw new Error('Erro ao carregar pets');
            
            const todosPets = await response.json();
            const petsFavoritos = todosPets.filter(pet => favoritosIds.includes(pet.id));
            
            if (petsFavoritos.length === 0) {
                usarDadosExemplo(favoritosIds);
            } else {
                renderizarFavoritos(petsFavoritos);
            }
        } catch (error) {
            console.log('Usando dados de exemplo');
            usarDadosExemplo(favoritosIds);
        }
    }

    function usarDadosExemplo(favoritosIds) {
        const petsExemplo = [
            { id: 1, nome: 'Jimmy', raca: 'Chinchila Lanigera', idade: '1 ano', personalidade: 'Dócil, brincalhão e tímido', status: 'Disponivel', imagem: '../img/jimmy.svg' },
            { id: 2, nome: 'Clara', raca: 'Ouriço Pigmeu Africano', idade: '5 meses', personalidade: 'Tímida e Inteligente', status: 'Disponivel', imagem: '../img/clara.svg' },
            { id: 3, nome: 'Simba', raca: 'Golden Retriever', idade: '2 anos', personalidade: 'Brincalhão e carinhoso', status: 'Disponivel', imagem: '../img/simba.png' }
        ];

        const petsFavoritos = petsExemplo.filter(pet => favoritosIds.includes(pet.id));
        
        if (petsFavoritos.length === 0) {
            mostrarMensagemVazia();
        } else {
            renderizarFavoritos(petsFavoritos);
        }
    }

    function mostrarMensagemVazia() {
        const cardsExistentes = mainContainer.querySelectorAll('.card');
        cardsExistentes.forEach(card => card.remove());

        const mensagemVazia = document.createElement('div');
        mensagemVazia.className = 'mensagem-vazia';
        mensagemVazia.innerHTML = `
            <img src="../img/emptyFavorite.png" alt="Sem favoritos" style="width: 80px; opacity: 0.5;">
            <h3>Nenhum pet favorito</h3>
            <p>Você ainda não adicionou nenhum pet aos seus favoritos.</p>
            <a href="../adote/index.html" class="btn-explorar">Explorar pets disponíveis</a>
        `;
        mensagemVazia.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            text-align: center;
            gap: 15px;
        `;

        const btnExplorar = mensagemVazia.querySelector('.btn-explorar');
        btnExplorar.style.cssText = `
            background-color: #4D5B24;
            color: white;
            padding: 12px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 10px;
        `;

        mainContainer.appendChild(mensagemVazia);
    }

    function renderizarFavoritos(pets) {
        const cardsExistentes = mainContainer.querySelectorAll('.card');
        cardsExistentes.forEach(card => card.remove());

        const mensagemVazia = mainContainer.querySelector('.mensagem-vazia');
        if (mensagemVazia) mensagemVazia.remove();

        pets.forEach(pet => {
            const card = criarCardFavorito(pet);
            mainContainer.insertBefore(card, mainContainer.querySelector('footer'));
        });
    }

    function criarCardFavorito(pet) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.petId = pet.id;
        card.innerHTML = `
            <img src="${pet.imagem || '../img/clara.png'}" id="pet">
            <div class="informação">
                <h3>${pet.nome}</h3>
                <p>${pet.raca || 'Raça não informada'}</p>
                <p>${pet.idade || ''} de idade</p>
                <p>${pet.personalidade || ''}</p>
                <div class="status">
                    <p>Status: ${pet.status || 'Disponivel'}</p>
                    <div class="remover" data-id="${pet.id}">
                        <p>Remover</p>
                        <img src="../img/Remove.png" alt="Remover">
                    </div>
                </div>
            </div>
            <img src="../img/Favorite.png" id="favorite">
        `;

        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.remover')) {
                window.location.href = `../detalhesPet/index.html?id=${pet.id}`;
            }
        });

        const btnRemover = card.querySelector('.remover');
        btnRemover.addEventListener('click', function(e) {
            e.stopPropagation();
            removerFavorito(pet.id, card);
        });

        return card;
    }

    function removerFavorito(petId, cardElement) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        favoritos = favoritos.filter(id => id !== petId);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));

        cardElement.style.transition = 'all 0.3s ease';
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            cardElement.remove();
            if (favoritos.length === 0) {
                mostrarMensagemVazia();
            }
        }, 300);

        mostrarNotificacao('Pet removido dos favoritos', 'info');
    }

    function mostrarNotificacao(mensagem, tipo = 'info') {
        const notificacaoExistente = document.querySelector('.notificacao');
        if (notificacaoExistente) notificacaoExistente.remove();

        const notificacao = document.createElement('div');
        notificacao.textContent = mensagem;
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            background-color: ${tipo === 'success' ? '#4CAF50' : tipo === 'error' ? '#f44336' : '#2196F3'};
        `;

        document.body.appendChild(notificacao);
        setTimeout(() => notificacao.remove(), 3000);
    }

    carregarFavoritos();
});
