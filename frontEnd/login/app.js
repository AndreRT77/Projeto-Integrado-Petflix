/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo java script do login
 * Data:15/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/


const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const showCadastro = document.getElementById('show-cadastro');
    const showLogin = document.getElementById('show-login');
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');

    if (showCadastro) {
        showCadastro.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            cadastroForm.classList.remove('hidden');
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            cadastroForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            try {
                console.log('Login:', { email, senha });

                const usuario = {
                    id: 1,
                    nome: 'Usuário',
                    email: email,
                    tipo: 'tutor'
                };
                localStorage.setItem('usuario', JSON.stringify(usuario));

                mostrarNotificacao('Login realizado com sucesso!', 'success');
                
                setTimeout(() => {
                    window.location.href = '../principal/index.html';
                }, 1500);

            } catch (error) {
                console.error('Erro no login:', error);
                mostrarNotificacao('Email ou senha inválidos', 'error');
            }
        });
    }

    // ===== CADASTRO =====
    if (formCadastro) {
        formCadastro.addEventListener('submit', async function(e) {
            e.preventDefault();

            const nome = document.getElementById('cadastro-nome').value;
            const email = document.getElementById('cadastro-email').value;
            const telefone = document.getElementById('cadastro-telefone').value;
            const senha = document.getElementById('cadastro-senha').value;
            const confirmar = document.getElementById('cadastro-confirmar').value;
            const tipo = document.querySelector('input[name="tipo"]:checked').value;

            // Validar senhas
            if (senha !== confirmar) {
                mostrarNotificacao('As senhas não coincidem', 'error');
                return;
            }

            try {
                // Simular cadastro
                console.log('Cadastro:', { nome, email, telefone, tipo });

                // Salvar usuário no localStorage
                const usuario = {
                    id: Date.now(),
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    tipo: tipo
                };
                localStorage.setItem('usuario', JSON.stringify(usuario));

                mostrarNotificacao('Conta criada com sucesso!', 'success');
                
                setTimeout(() => {
                    window.location.href = '../principal/index.html';
                }, 1500);

            } catch (error) {
                console.error('Erro no cadastro:', error);
                mostrarNotificacao('Erro ao criar conta. Tente novamente.', 'error');
            }
        });
    }

    // ===== MÁSCARA DE TELEFONE =====
    const inputTelefone = document.getElementById('cadastro-telefone');
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
            animation: slideIn 0.3s ease;
            max-width: 300px;
            background-color: ${tipo === 'success' ? '#4CAF50' : tipo === 'error' ? '#f44336' : '#2196F3'};
        `;

        document.body.appendChild(notificacao);
        setTimeout(() => notificacao.remove(), 3000);
    }

    // Adicionar animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // ===== VERIFICAR SE JÁ ESTÁ LOGADO =====
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
        // Redirecionar para perfil ou home
        // window.location.href = '../perfil/index.html';
    }
});
