/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo java script dos pedidos
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

    const pedidosContainer = document.getElementById('pedidos-container');
    const emptyState = document.getElementById('empty-state');
    const filtrosBtns = document.querySelectorAll('.filtro-btn');

    let todosPedidos = [];
    let filtroAtual = 'todos';

    async function carregarPedidos() {
        try {
            const response = await fetch(`${API_BASE_URL}/adocao?tutorId=${usuario.id}`);
            if (!response.ok) throw new Error('Erro ao carregar pedidos');
            
            todosPedidos = await response.json();
            renderizarPedidos(todosPedidos);
        } catch (error) {
            console.log('Usando dados de exemplo');
            usarPedidosExemplo();
        }
    }
// SÓ EXEMPLO, CASO NÃO TIVER CARDS
    function usarPedidosExemplo() {
        todosPedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        
        if (todosPedidos.length === 0) {
            todosPedidos = [
                {
                    id: 1,
                    petId: 1,
                    petNome: 'Jimmy',
                    petRaca: 'Chinchila Lanigera',
                    petImagem: '../img/jimmy.svg',
                    status: 'analise',
                    data: new Date().toISOString(),
                    responsavel: 'Instituto Caramelo',
                    telefone: '(11) 99999-9999',
                    historico: [
                        { status: 'Pedido enviado', data: new Date().toISOString(), completo: true },
                        { status: 'Em análise', data: new Date().toISOString(), completo: true },
                        { status: 'Aguardando aprovação', data: null, completo: false }
                    ]
                },
                {
                    id: 2,
                    petId: 3,
                    petNome: 'Simba',
                    petRaca: 'Golden Retriever',
                    petImagem: '../img/simba.png',
                    status: 'aprovado',
                    data: new Date(Date.now() - 7*24*60*60*1000).toISOString(),
                    responsavel: 'Abrigo Esperança',
                    telefone: '(21) 98888-8888',
                    historico: [
                        { status: 'Pedido enviado', data: new Date(Date.now() - 7*24*60*60*1000).toISOString(), completo: true },
                        { status: 'Em análise', data: new Date(Date.now() - 5*24*60*60*1000).toISOString(), completo: true },
                        { status: 'Aprovado', data: new Date(Date.now() - 2*24*60*60*1000).toISOString(), completo: true }
                    ]
                }
            ];
            localStorage.setItem('pedidos', JSON.stringify(todosPedidos));
        }
        
        renderizarPedidos(todosPedidos);
    }

    function renderizarPedidos(pedidos) {
        let pedidosFiltrados = pedidos;
        if (filtroAtual !== 'todos') {
            pedidosFiltrados = pedidos.filter(p => p.status === filtroAtual);
        }

        if (pedidosFiltrados.length === 0) {
            pedidosContainer.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        pedidosContainer.style.display = 'flex';
        emptyState.style.display = 'none';

        pedidosContainer.innerHTML = pedidosFiltrados.map(pedido => `
            <div class="pedido-card" data-id="${pedido.id}">
                <div class="pedido-header">
                    <div class="pet-info">
                        <img src="${pedido.petImagem || '../img/jimmy.svg'}" alt="${pedido.petNome}">
                        <div class="pet-details">
                            <h3>${pedido.petNome}</h3>
                            <p>${pedido.petRaca || 'Raça não informada'}</p>
                            <p>Responsável: ${pedido.responsavel || 'Não informado'}</p>
                        </div>
                    </div>
                    <span class="status-badge status-${pedido.status}">
                        ${pedido.status === 'analise' ? 'Em Análise' : 
                          pedido.status === 'aprovado' ? 'Aprovado' : 'Negado'}
                    </span>
                </div>
                
                <div class="pedido-body">
                    <p><strong>Data do pedido:</strong> ${new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
                    
                    <div class="timeline">
                        ${(pedido.historico || []).map(h => `
                            <div class="timeline-item ${h.completo ? 'completed' : ''}">
                                <p>${h.status}</p>
                                <span>${h.data ? new Date(h.data).toLocaleDateString('pt-BR') : 'Pendente'}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="pedido-actions">
                        ${pedido.status === 'aprovado' ? `
                            <a href="https://wa.me/55${(pedido.telefone || '').replace(/\D/g, '')}" 
                               target="_blank" class="btn-action btn-contato">
                                Entrar em Contato
                            </a>
                        ` : ''}
                        ${pedido.status === 'analise' ? `
                            <button class="btn-action btn-cancelar" data-id="${pedido.id}">
                                Cancelar Pedido
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        pedidosContainer.querySelectorAll('.btn-cancelar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                cancelarPedido(id);
            });
        });
    }

    filtrosBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filtrosBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroAtual = this.dataset.status;
            renderizarPedidos(todosPedidos);
        });
    });

    function cancelarPedido(id) {
        if (!confirm('Tem certeza que deseja cancelar este pedido?')) return;

        todosPedidos = todosPedidos.filter(p => p.id !== id);
        localStorage.setItem('pedidos', JSON.stringify(todosPedidos));
        
        renderizarPedidos(todosPedidos);
        mostrarNotificacao('Pedido cancelado', 'info');
    }

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

    carregarPedidos();
});
