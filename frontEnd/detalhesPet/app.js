// ===== CONFIGURAÇÃO DA API =====
const API_BASE_URL = 'http://localhost:3001';

// ===== ELEMENTOS DO DOM =====
document.addEventListener('DOMContentLoaded', function() {
    // Menu lateral
    const menuBtn = document.getElementById('menu-btn');
    const menuLateral = document.getElementById('menu-lateral');
    const closeMenu = document.querySelector('.close-menu');

    // Galeria
    const fotoPrincipal = document.getElementById('foto-principal');
    const miniaturas = document.querySelectorAll('.miniatura');
    const setaEsquerda = document.getElementById('seta-esquerda');
    const setaDireita = document.getElementById('seta-direita');

    // Favorito
    const btnFavorito = document.getElementById('btn-favorito');
    const iconeFavorito = document.getElementById('icone-favorito');

    // Modal
    const btnAdotar = document.getElementById('btn-adotar');
    const btnContato = document.getElementById('btn-contato');
    const modalAdocao = document.getElementById('modal-adocao');
    const modalClose = document.getElementById('modal-close');
    const formAdocao = document.getElementById('form-adocao');

    // ===== ESTADO =====
    let petAtual = null;
    let isFavorito = false;
    let galeriaIndex = 0;
    let galeriaImagens = [];

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

    // ===== GALERIA DE IMAGENS =====
    function atualizarGaleria(index) {
        if (galeriaImagens.length === 0) return;
        
        galeriaIndex = index;
        if (galeriaIndex < 0) galeriaIndex = galeriaImagens.length - 1;
        if (galeriaIndex >= galeriaImagens.length) galeriaIndex = 0;

        fotoPrincipal.src = galeriaImagens[galeriaIndex];

        miniaturas.forEach((mini, i) => {
            mini.classList.toggle('active', i === galeriaIndex);
        });
    }

    if (setaEsquerda) {
        setaEsquerda.addEventListener('click', () => atualizarGaleria(galeriaIndex - 1));
    }

    if (setaDireita) {
        setaDireita.addEventListener('click', () => atualizarGaleria(galeriaIndex + 1));
    }

    miniaturas.forEach((mini, index) => {
        mini.addEventListener('click', () => atualizarGaleria(index));
    });

    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') atualizarGaleria(galeriaIndex - 1);
        if (e.key === 'ArrowRight') atualizarGaleria(galeriaIndex + 1);
    });

    // ===== FAVORITOS =====
    function toggleFavorito() {
        isFavorito = !isFavorito;
        
        if (isFavorito) {
            iconeFavorito.src = '../img/Favorite.png';
            salvarFavorito(petAtual.id);
            mostrarNotificacao('Pet adicionado aos favoritos!', 'success');
        } else {
            iconeFavorito.src = '../img/emptyFavorite.png';
            removerFavorito(petAtual.id);
            mostrarNotificacao('Pet removido dos favoritos!', 'info');
        }
    }

    if (btnFavorito) {
        btnFavorito.addEventListener('click', toggleFavorito);
    }

    function salvarFavorito(petId) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        if (!favoritos.includes(petId)) {
            favoritos.push(petId);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
    }

    function removerFavorito(petId) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        favoritos = favoritos.filter(id => id !== petId);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    function verificarFavorito(petId) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        return favoritos.includes(petId);
    }

    // ===== MODAL DE ADOÇÃO =====
    if (btnAdotar) {
        btnAdotar.addEventListener('click', function() {
            modalAdocao.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modalAdocao.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Fechar modal ao clicar fora
    if (modalAdocao) {
        modalAdocao.addEventListener('click', function(e) {
            if (e.target === modalAdocao) {
                modalAdocao.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== FORMULÁRIO DE ADOÇÃO =====
    if (formAdocao) {
        formAdocao.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                nome: document.getElementById('adotante-nome').value,
                email: document.getElementById('adotante-email').value,
                telefone: document.getElementById('adotante-telefone').value,
                mensagem: document.getElementById('adotante-mensagem').value,
                petId: petAtual ? petAtual.id : null,
                petNome: petAtual ? petAtual.nome : null
            };

            try {
                // Simular envio para API
                console.log('Enviando solicitação de adoção:', formData);
                
                // Aqui você pode fazer a chamada real para a API
                // const response = await fetch(`${API_BASE_URL}/adocao`, {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });

                mostrarNotificacao('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                modalAdocao.classList.remove('active');
                document.body.style.overflow = '';
                formAdocao.reset();

            } catch (error) {
                console.error('Erro ao enviar solicitação:', error);
                mostrarNotificacao('Erro ao enviar solicitação. Tente novamente.', 'error');
            }
        });
    }

    // ===== BOTÃO DE CONTATO =====
    if (btnContato) {
        btnContato.addEventListener('click', function() {
            const telefone = document.getElementById('responsavel-contato').textContent;
            const mensagem = `Olá! Tenho interesse em adotar o pet ${petAtual ? petAtual.nome : 'disponível'}.`;
            const whatsappUrl = `https://wa.me/55${telefone.replace(/\D/g, '')}?text=${encodeURIComponent(mensagem)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // ===== CARREGAR DADOS DO PET =====
    async function carregarPet() {
        // Pegar ID do pet da URL
        const urlParams = new URLSearchParams(window.location.search);
        const petId = urlParams.get('id');

        if (!petId) {
            // Usar dados de exemplo se não houver ID
            usarDadosExemplo();
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/pet/${petId}`);
            if (!response.ok) throw new Error('Pet não encontrado');
            
            petAtual = await response.json();
            preencherDadosPet(petAtual);

        } catch (error) {
            console.error('Erro ao carregar pet:', error);
            usarDadosExemplo();
        }
    }

    function usarDadosExemplo() {
        petAtual = {
            id: 1,
            nome: 'Jimmy',
            especie: 'Chinchila',
            raca: 'Chinchila Lanigera',
            idade: '1 ano',
            sexo: 'Masculino',
            tamanho: '10 cm',
            localizacao: 'Rio de Janeiro, RJ',
            personalidade: 'Dócil, brincalhão e tímido',
            necessidades: 'Dieta rica em fibras, banhos de pó e ambiente fresco e seguro.',
            descricao: 'Jimmy é um chinchila muito carinhoso que está procurando um lar amoroso. Ele adora brincar durante a noite e é muito curioso. Precisa de um ambiente tranquilo e uma família que possa dedicar tempo e atenção a ele.',
            status: 'disponivel',
            vacinado: true,
            castrado: true,
            vermifugado: true,
            responsavel: {
                nome: 'Instituto Caramelo',
                contato: '(11) 99999-9999',
                email: 'contato@institutocaramelo.org'
            },
            imagens: ['../img/jimmy.svg', '../img/jimmy.png', '../img/jimmy.svg']
        };

        preencherDadosPet(petAtual);
    }

    function preencherDadosPet(pet) {
        // Informações básicas
        document.getElementById('pet-nome').textContent = pet.nome;
        document.getElementById('pet-especie').textContent = pet.especie;
        document.getElementById('pet-raca').textContent = pet.raca;
        document.getElementById('pet-idade').textContent = pet.idade;
        document.getElementById('pet-sexo').textContent = pet.sexo;
        document.getElementById('pet-tamanho').textContent = pet.tamanho;
        document.getElementById('pet-localizacao').textContent = pet.localizacao;
        document.getElementById('pet-personalidade').textContent = pet.personalidade;
        document.getElementById('pet-necessidades').textContent = pet.necessidades;
        document.getElementById('pet-descricao').textContent = pet.descricao;

        // Status
        const statusBadge = document.querySelector('.status-badge');
        statusBadge.textContent = formatarStatus(pet.status);
        statusBadge.className = `status-badge ${pet.status}`;

        // Saúde
        const badgeVacinado = document.getElementById('badge-vacinado');
        const badgeCastrado = document.getElementById('badge-castrado');
        const badgeVermifugado = document.getElementById('badge-vermifugado');

        if (badgeVacinado) badgeVacinado.style.display = pet.vacinado ? 'inline-block' : 'none';
        if (badgeCastrado) badgeCastrado.style.display = pet.castrado ? 'inline-block' : 'none';
        if (badgeVermifugado) badgeVermifugado.style.display = pet.vermifugado ? 'inline-block' : 'none';

        // Responsável
        if (pet.responsavel) {
            document.getElementById('responsavel-nome').textContent = pet.responsavel.nome;
            document.getElementById('responsavel-contato').textContent = pet.responsavel.contato;
            document.getElementById('responsavel-email').textContent = pet.responsavel.email;
        }

        // Modal
        document.getElementById('modal-pet-nome').textContent = pet.nome;

        // Galeria
        if (pet.imagens && pet.imagens.length > 0) {
            galeriaImagens = pet.imagens;
            fotoPrincipal.src = galeriaImagens[0];
        }

        // Verificar favorito
        isFavorito = verificarFavorito(pet.id);
        iconeFavorito.src = isFavorito ? '../img/Favorite.png' : '../img/emptyFavorite.png';
    }

    function formatarStatus(status) {
        const statusMap = {
            'disponivel': 'Disponível',
            'em-adocao': 'Em processo de adoção',
            'adotado': 'Adotado'
        };
        return statusMap[status] || status;
    }

    // ===== NOTIFICAÇÕES =====
    function mostrarNotificacao(mensagem, tipo = 'info') {
        // Remover notificação existente
        const notificacaoExistente = document.querySelector('.notificacao');
        if (notificacaoExistente) {
            notificacaoExistente.remove();
        }

        const notificacao = document.createElement('div');
        notificacao.className = `notificacao notificacao-${tipo}`;
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
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        const cores = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3'
        };
        notificacao.style.backgroundColor = cores[tipo] || cores.info;

        document.body.appendChild(notificacao);

        setTimeout(() => {
            notificacao.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notificacao.remove(), 300);
        }, 3000);
    }

    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ===== INICIALIZAÇÃO =====
    carregarPet();
});
