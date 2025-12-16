/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo java script do perfil
 * Data:15/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/


const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
        window.location.href = '../login/index.html';
        return;
    }

    const menuItems = document.querySelectorAll('.menu-item[data-section]');
    const sections = document.querySelectorAll('.section-content');
    const btnLogout = document.getElementById('btn-logout');
    const formDados = document.getElementById('form-dados');
    const btnTrocarFoto = document.getElementById('btn-trocar-foto');
    const inputFoto = document.getElementById('input-foto');
    const avatarImg = document.getElementById('avatar-img');

    function carregarDadosUsuario() {
        document.getElementById('usuario-nome').textContent = usuario.nome || 'Usuário';
        document.getElementById('usuario-tipo').textContent = usuario.tipo === 'protetor' ? 'Protetor' : 'Tutor';
        
        document.getElementById('dados-nome').value = usuario.nome || '';
        document.getElementById('dados-email').value = usuario.email || '';
        document.getElementById('dados-telefone').value = usuario.telefone || '';
        document.getElementById('dados-cpf').value = usuario.cpf || '';
        document.getElementById('dados-endereco').value = usuario.endereco || '';
        document.getElementById('dados-cidade').value = usuario.cidade || '';

        if (usuario.avatar) {
            avatarImg.src = usuario.avatar;
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;

            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`section-${sectionId}`).classList.add('active');

            if (sectionId === 'favoritos') carregarFavoritos();
            if (sectionId === 'pedidos') carregarPedidos();
            if (sectionId === 'pets') carregarMeusPets();
        });
    });

    if (formDados) {
        formDados.addEventListener('submit', function(e) {
            e.preventDefault();

            usuario.nome = document.getElementById('dados-nome').value;
            usuario.email = document.getElementById('dados-email').value;
            usuario.telefone = document.getElementById('dados-telefone').value;
            usuario.cpf = document.getElementById('dados-cpf').value;
            usuario.endereco = document.getElementById('dados-endereco').value;
            usuario.cidade = document.getElementById('dados-cidade').value;

            localStorage.setItem('usuario', JSON.stringify(usuario));
            
            document.getElementById('usuario-nome').textContent = usuario.nome;
            mostrarNotificacao('Dados salvos com sucesso!', 'success');
        });
    }

    if (btnTrocarFoto) {
        btnTrocarFoto.addEventListener('click', () => inputFoto.click());
    }

    if (inputFoto) {
        inputFoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImg.src = e.target.result;
                    usuario.avatar = e.target.result;
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    mostrarNotificacao('Foto atualizada!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('usuario');
            mostrarNotificacao('Saindo...', 'info');
            setTimeout(() => {
                window.location.href = '../principal/index.html';
            }, 1000);
        });
    }

    function carregarFavoritos() {
        const grid = document.getElementById('favoritos-grid');
        const favoritosIds = JSON.parse(localStorage.getItem('favoritos') || '[]');

        if (favoritosIds.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <img src="../img/emptyFavorite.png" alt="">
                    <p>Você ainda não tem favoritos</p>
                    <a href="../adote/index.html" style="color: #4D5B24;">Explorar pets</a>
                </div>
            `;
            return;
        }

        const petsFavoritos = [
            { id: 1, nome: 'Jimmy', raca: 'Chinchila', imagem: '../img/jimmy.svg' },
            { id: 2, nome: 'Clara', raca: 'Ouriço', imagem: '../img/clara.svg' },
            { id: 3, nome: 'Simba', raca: 'Golden Retriever', imagem: '../img/simba.png' }
        ].filter(p => favoritosIds.includes(p.id));

        grid.innerHTML = petsFavoritos.map(pet => `
            <div class="favorito-card">
                <img src="${pet.imagem}" alt="${pet.nome}">
                <h4>${pet.nome}</h4>
                <p>${pet.raca}</p>
                <button class="btn-remover" data-id="${pet.id}">Remover</button>
            </div>
        `).join('');

        grid.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
                favoritos = favoritos.filter(f => f !== id);
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                carregarFavoritos();
                mostrarNotificacao('Removido dos favoritos', 'info');
            });
        });
    }

    function carregarPedidos() {
        const lista = document.getElementById('pedidos-lista');
        const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

        if (pedidos.length === 0) {
            lista.innerHTML = `
                <div class="empty-state">
                    <p>Você ainda não fez nenhum pedido de adoção</p>
                    <a href="../adote/index.html" style="color: #4D5B24;">Ver pets disponíveis</a>
                </div>
            `;
            return;
        }

        lista.innerHTML = pedidos.map(pedido => `
            <div class="pedido-item">
                <img src="${pedido.petImagem || '../img/jimmy.svg'}" alt="${pedido.petNome}">
                <div class="pedido-info">
                    <h4>${pedido.petNome}</h4>
                    <p>Pedido em: ${new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
                </div>
                <span class="pedido-status status-${pedido.status}">${
                    pedido.status === 'analise' ? 'Em Análise' :
                    pedido.status === 'aprovado' ? 'Aprovado' : 'Negado'
                }</span>
            </div>
        `).join('');
    }

    function carregarMeusPets() {
        const grid = document.getElementById('pets-grid');
        const meusPets = JSON.parse(localStorage.getItem('meusPets') || '[]');

        if (meusPets.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <p>Você ainda não anunciou nenhum pet</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = meusPets.map(pet => `
            <div class="pet-card">
                <img src="${pet.imagem || '../img/jimmy.svg'}" alt="${pet.nome}">
                <h4>${pet.nome}</h4>
                <p>Status: ${pet.status || 'Disponível'}</p>
            </div>
        `).join('');
    }

    const inputTelefone = document.getElementById('dados-telefone');
    if (inputTelefone) {
        inputTelefone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 6) {
                value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0,2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    }

    const inputCPF = document.getElementById('dados-cpf');
    if (inputCPF) {
        inputCPF.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                value = `${value.slice(0,3)}.${value.slice(3,6)}.${value.slice(6,9)}-${value.slice(9)}`;
            } else if (value.length > 6) {
                value = `${value.slice(0,3)}.${value.slice(3,6)}.${value.slice(6)}`;
            } else if (value.length > 3) {
                value = `${value.slice(0,3)}.${value.slice(3)}`;
            }
            
            e.target.value = value;
        });
    }

    // ===== NOTIFICAÇÕES =====
    function mostrarNotificacao(mensagem, tipo = 'info') {
        const notificacaoExistente = document.querySelector('.notificacao');
        if (notificacaoExistente) notificacaoExistente.remove();

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
            background-color: ${tipo === 'success' ? '#4CAF50' : tipo === 'error' ? '#f44336' : '#2196F3'};
        `;

        document.body.appendChild(notificacao);
        setTimeout(() => notificacao.remove(), 3000);
    }

    carregarDadosUsuario();
});
