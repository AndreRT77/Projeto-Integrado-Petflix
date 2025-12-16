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
    const cardsContainer = document.querySelector('.cards') || document.querySelector('main');

    async function carregarONGs() {
        try {
            const response = await fetch(`${API_BASE_URL}/ong`);
            if (!response.ok) throw new Error('Erro ao carregar ONGs');
            
            const ongs = await response.json();
            renderizarONGs(ongs);
        } catch (error) {
            console.log('Usando dados de exemplo');
            usarONGsExemplo();
        }
    }

    function usarONGsExemplo() {
        const ongs = [
            { id: 1, nome: 'Instituto Caramelo', descricao: 'O Instituto Caramelo é uma ONG brasileira sem fins lucrativos de proteção animal e meio ambiente, que atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção.', telefone: '(11) 99999-9999', email: 'contato@institutocaramelo.org', imagem: '../img/caramelo.svg' },
            { id: 2, nome: 'Ampara Animal', descricao: 'A Ampara Animal é uma organização dedicada ao resgate e cuidado de animais abandonados, oferecendo abrigo, tratamento veterinário e programas de adoção responsável.', telefone: '(11) 98888-8888', email: 'contato@amparaanimal.org', imagem: '../img/caramelo.svg' },
            { id: 3, nome: 'Projeto Aenocyon', descricao: 'O Projeto Aenocyon trabalha na conservação de espécies ameaçadas e na educação ambiental, promovendo a convivência harmoniosa entre humanos e animais.', telefone: '(21) 97777-7777', email: 'contato@aenocyon.org', imagem: '../img/aenocyon.png' }
        ];
        renderizarONGs(ongs);
    }

    function renderizarONGs(ongs) {
        if (!cardsContainer) return;

        ongs.forEach(ong => {
            const card = document.createElement('div');
            card.className = 'cardong';
            card.innerHTML = `
                <img src="${ong.imagem || '../img/caramelo.svg'}" alt="${ong.nome}">
                <h3>${ong.nome}</h3>
                <p>${ong.descricao || ''}</p>
                <div class="contato">
                    <p><strong>Telefone:</strong> ${ong.telefone || 'Não informado'}</p>
                    <p><strong>Email:</strong> ${ong.email || 'Não informado'}</p>
                </div>
            `;
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                mostrarDetalhesONG(ong);
            });
            cardsContainer.appendChild(card);
        });
    }

    function mostrarDetalhesONG(ong) {
        const modal = document.createElement('div');
        modal.className = 'modal-ong';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${ong.imagem || '../img/caramelo.svg'}" alt="${ong.nome}">
                <h2>${ong.nome}</h2>
                <p>${ong.descricao}</p>
                <div class="contato-info">
                    <p><strong>Telefone:</strong> ${ong.telefone || 'Não informado'}</p>
                    <p><strong>Email:</strong> ${ong.email || 'Não informado'}</p>
                </div>
                <button class="btn-contato">Entrar em Contato</button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); display: flex; justify-content: center;
            align-items: center; z-index: 1000;
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            background: white; padding: 30px; border-radius: 15px;
            max-width: 500px; width: 90%; text-align: center;
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        
        modal.querySelector('.btn-contato').addEventListener('click', () => {
            if (ong.telefone) {
                window.open(`https://wa.me/55${ong.telefone.replace(/\D/g, '')}`, '_blank');
            }
        });
    }

    carregarONGs();
});
